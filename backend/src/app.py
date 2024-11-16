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
    cursor.execute("SELECT 1 FROM users WHERE username = ? AND password = ?", (username, password))
    found = cursor.fetchone() is not None
    db.close()
    return jsonify({'found': found})

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

        pizzas_data[pizza_name] = {
            "crust": crust,
            "sauce": sauce,
            "ingredients": ingredients_list,
            "price": f"{price:.2f}"
        }

    db.close()
    
    try:
        response = jsonify(pizzas_data)
        print(f"JSON Response: {response.get_data(as_text=True)}")  # Debugging
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


if __name__ == "__main__":
    app.run(debug=True)
