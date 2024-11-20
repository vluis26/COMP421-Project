import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
print('Flask server started')

@app.route("/users", methods=['GET'])
def get_users():
    username = request.args.get('username')
    password = request.args.get('password')
    if not username or not password:
        return jsonify({'found': False, 'error': 'Missing username or password'}), 400

    print(f"Username: {username}, Password: {password}")
    
    db = sqlite3.connect('pizza_rat.db')
    cursor = db.cursor()
    cursor.execute("SELECT status FROM users WHERE username = ? AND password = ?", (username, password))
    status = cursor.fetchone()
    found = status is not None
    
    db.close()
    return jsonify({'found': found, 'status': status})

@app.route("/create-account", methods=['POST'])
def create_account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    db = sqlite3.connect('pizza_rat.db')
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    if cursor.fetchone():
        db.close()
        return jsonify({'error': 'Username already exists'}), 409

    try:
        cursor.execute("INSERT INTO users (username, password, status) VALUES (?, ?, ?)", 
                       (username, password, 'customer'))
        db.commit()
    except Exception as e:
        db.rollback()
        db.close()
        return jsonify({'error': f"Failed to create account: {str(e)}"}), 500

    db.close()
    return jsonify({'message': 'Account created successfully'}), 201

@app.route("/pizzas", methods=["GET"])
def get_pizzas():
    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()

    cursor.execute("SELECT type, price FROM prices")
    price_map = {row[0]: row[1] for row in cursor.fetchall()}

    cursor.execute("SELECT DISTINCT pizza_name FROM pizzas")
    pizza_names = [row[0] for row in cursor.fetchall()]
    pizzas_data = {}

    for pizza_name in pizza_names:
        base_price = 10.00
        price = base_price
        crust = None
        sauce = None
        ingredients_list = []

        cursor.execute("SELECT item_id FROM pizzas WHERE pizza_name = ?", (pizza_name,))
        item_ids = [item[0] for item in cursor.fetchall()]

        for item_id in item_ids:
            cursor.execute("SELECT item, type, quantity FROM inventory WHERE item_id = ?", (item_id,))
            item, item_type, quantity = cursor.fetchone()

            if item_type == "crust":
                crust = item
            elif item_type == "sauce":
                sauce = item
            else:
                ingredients_list.append({"item": item, "type": item_type})
            
            item_price = price_map.get(item_type, 0)
            if quantity != 0:
                price += item_price

            base_price += item_price

        pizzas_data[pizza_name] = {
            "crust": crust,
            "sauce": sauce,
            "ingredients": ingredients_list,
            "price": f"{price:.2f}",
            "base_price": f"{base_price:.2f}"
        }

    db.close()
    
    try:
        response = jsonify(pizzas_data)
        return response
    except Exception as e:
        print(f"Error creating JSON response: {e}")
        return jsonify({"error": "Failed to generate valid JSON"}), 500


@app.route("/crusts_and_sauces", methods=["GET"])
def get_inventory():
    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()
    
    cursor.execute("SELECT item FROM inventory WHERE type = 'crust'")
    crusts = [row[0] for row in cursor.fetchall()]
    
    cursor.execute("SELECT item FROM inventory WHERE type = 'sauce'")
    sauces = [row[0] for row in cursor.fetchall()]
    
    db.close()
    
    return jsonify({"crusts": crusts, "sauces": sauces})


@app.route("/ingredient_price", methods=["GET"])
def get_ingredient_price():
    ing_type = request.args.get("ingredientType")
    if not ing_type:
        return jsonify({"error": "Missing ingredient name"}), 400

    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()
    
    cursor.execute("SELECT price FROM prices WHERE type = ?", (ing_type,))
    result = cursor.fetchone()
    db.close()
    
    if result:
        return jsonify({"price": result[0]})
    else:
        return jsonify({"price": 0})


@app.route("/validate_item", methods=["GET"])
def is_ingredient_stocked():
    item = request.args.get("ingred_item")
    type = request.args.get("ingred_type")
    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()
    cursor.execute("SELECT quantity FROM inventory WHERE item = ? and type = ?", (item, type))
    quant = cursor.fetchone()
    if quant and quant[0] > 0:
        return jsonify({"available": True})
    return jsonify({"available": False})


@app.route("/check_inventory", methods=["POST"])
def check_inventory():
    try:
        data = request.json
        print("Received ingredient counts:", data)

        if not data or "ingredientCounts" not in data:
            print("Error: Missing ingredient counts in request")
            return jsonify({
                "success": False,
                "message": "Missing ingredient counts",
                "insufficient_items": []
            }), 400

        ingredient_counts = data["ingredientCounts"]
        print("Processing ingredient counts:", ingredient_counts)

        db = sqlite3.connect("pizza_rat.db")
        cursor = db.cursor()
        insufficient_items = []

        for key, count in ingredient_counts.items():
            item, item_type = key.split("-")
            cursor.execute(
                "SELECT quantity FROM inventory WHERE item = ? AND type = ?",
                (item, item_type),
            )
            result = cursor.fetchone()

            # Unpack result tuple and handle missing data
            available_quantity = result[0] if result else 0
            print(f"Checking {item} ({item_type}): Needed {count}, Found {available_quantity}")

            if available_quantity < count:
                insufficient_items.append({
                    "item": item,
                    "type": item_type,
                    "needed": count,
                    "available": available_quantity
                })

        # If any items are insufficient, return the error response
        if insufficient_items:
            db.close()
            print("Insufficient items:", insufficient_items)
            return jsonify({
                "success": False,
                "message": "Some ingredients are insufficient",
                "insufficient_items": insufficient_items
            }), 400

        for key, count in ingredient_counts.items():
            item, item_type = key.split("-")
            cursor.execute(
                "UPDATE inventory SET quantity = quantity - ? WHERE item = ? AND type = ?",
                (count, item, item_type),
            )

        db.commit()
        db.close()

        print("All ingredients are sufficient, inventory updated.")
        return jsonify({"success": True})

    except Exception as e:
        print("Error in /check_inventory:", str(e))
        return jsonify({"success": False, "message": str(e)}), 500
    

@app.route("/inventory", methods=["GET"])
def get_full_inventory():
    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()
    cursor.execute("SELECT item, type, quantity FROM inventory")
    rows = cursor.fetchall()
    db.close()

    inventory = [
        {"item": row[0], "type": row[1], "quantity": row[2]} for row in rows
    ]

    return jsonify(inventory)


@app.route("/update_inventory", methods=["POST"])
def update_inventory():
    try:
        # Parse the incoming data
        data = request.json
        item = data.get("item")
        type_ = data.get("type")
        quantity_to_add = int(data.get("quantity"))

        # Validate input
        if not item or not type_ or quantity_to_add <= 0:
            return jsonify({"success": False, "message": "Invalid input"}), 400

        # Connect to the database
        db = sqlite3.connect("pizza_rat.db")
        cursor = db.cursor()

        # Update the inventory
        cursor.execute(
            "UPDATE inventory SET quantity = quantity + ? WHERE item = ? AND type = ?",
            (quantity_to_add, item, type_),
        )

        # Commit the changes and close the connection
        db.commit()
        db.close()

        return jsonify({"success": True, "message": "Inventory updated successfully"})

    except Exception as e:
        print(f"Error in /update_inventory: {e}")
        return jsonify({"success": False, "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
