import sqlite3
import random
import string
from datetime import datetime
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

        available_quantity = result[0] if result else 0
        print(f"Checking {item} ({item_type}): Needed {count}, Found {available_quantity}")

        if available_quantity < count:
            insufficient_items.append({
                "item": item,
                "type": item_type,
                "needed": count,
                "available": available_quantity
            })

    if insufficient_items:
        db.close()
        print("Insufficient items:", insufficient_items)
        return jsonify({
            "success": False,
            "message": "Some ingredients are insufficient",
            "insufficient_items": insufficient_items
        }), 400
    
    try:
        for key, count in ingredient_counts.items():
            item, item_type = key.split("-")
            cursor.execute(
                "UPDATE inventory SET quantity = quantity - ? WHERE item = ? AND type = ?",
                (count, item, item_type),
            )

        print("All ingredients are sufficient, inventory updated.")
        return jsonify({"success": True})

    except Exception as e:
        db.rollback()
        print("Error in /check_inventory:", str(e))
        return jsonify({"success": False, "message": str(e)}), 500
    
    finally:
        db.commit()
        db.close()
    

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
    data = request.json
    item = data.get("item")
    type_ = data.get("type")
    quantity_to_add = int(data.get("quantity"))

    if not item or not type_ or quantity_to_add <= 0:
        return jsonify({"success": False, "message": "Invalid input"}), 400

    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()

    try:
        cursor.execute(
            "UPDATE inventory SET quantity = quantity + ? WHERE item = ? AND type = ?",
            (quantity_to_add, item, type_),
        )
        return jsonify({"success": True, "message": "Inventory updated successfully"})

    except Exception as e:
        db.rollback()
        print(f"Error in /update_inventory: {e}")
        return jsonify({"success": False, "message": str(e)}), 500
    
    finally:
        db.commit()
        db.close()


@app.route("/active_orders", methods=["GET"])
def get_active_orders():
    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM active_orders")
    orders = [
        {
            "oid": row[0],
            "customer_id": row[1],
            "quantity": row[2],
            "price": row[3],
            "status": row[4],
        } for row in cursor.fetchall()
    ]
    db.close()
    return jsonify(orders)




@app.route("/active_orders", methods=["POST"])
def add_active_order():
    data = request.json
    required_fields = ["customer_id", "quantity", "price", "status"]

    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    # Generate a unique order ID
    current_time = datetime.now().strftime("%Y%m%d%H%M%S")  # Format: YYYYMMDDHHMMSS
    random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    unique_oid = f"{current_time}-{random_suffix}"

    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()

    try:
        cursor.execute(
            "INSERT INTO active_orders (oid, customer_id, quantity, price, status) "
            "VALUES (?, ?, ?, ?, ?)",
            (unique_oid, data["customer_id"], data["quantity"], data["price"], data["status"]),
        )
        db.commit()
        return jsonify({"success": True, "message": "Order added successfully", "oid": unique_oid})

    except Exception as e:
        db.rollback()
        return jsonify({"success": False, "message": str(e)}), 500

    finally:
        db.close()



@app.route("/active_orders/<oid>/status", methods=["PUT"])
def update_active_order_status(oid):
    data = request.json
    new_status = data.get("status")

    if not new_status:
        return jsonify({"success": False, "message": "Status is required"}), 400

    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()

    try:
        cursor.execute("UPDATE active_orders SET status = ? WHERE oid = ?", (new_status, oid))
        db.commit()
        return jsonify({"success": True, "message": "Order status updated successfully"})

    except Exception as e:
        db.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    
    finally:
        db.close()


@app.route("/archive_order/<oid>", methods=["POST"])
def archive_order(oid):
    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()

    try:
        cursor.execute("SELECT * FROM active_orders WHERE oid = ?", (oid,))
        order = cursor.fetchone()

        if not order:
            return jsonify({"success": False, "message": "Order not found"}), 404

        cursor.execute(
            "INSERT INTO order_archive (oid, customer_id, price) VALUES (?, ?, ?)",
            (order[0], order[1], order[3]),
        )

        cursor.execute("DELETE FROM active_orders WHERE oid = ?", (oid,))
        db.commit()
        return jsonify({"success": True, "message": "Order archived successfully"})

    except Exception as e:
        db.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    
    finally:
        db.close()




if __name__ == "__main__":
    app.run(debug=True)
