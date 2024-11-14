import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
print('flask started')

@app.route("/users", methods=['GET'] )
def get_users():
    found = False
    username = request.args['username']
    password = request.args['password']
    if not username or not password:
        return jsonify({'found': False, 'error': 'Missing username or password'}), 400
    print(username, password)
    db = sqlite3.connect('pizza_rat.db')
    cursor = db.cursor()
    cursor.execute("select username, password from users where username = ? and password = ?", (username, password))
    row = cursor.fetchone()
    if row:
        found = True
    db.close()
    return jsonify({'found': found})

@app.route("/pizzas", methods=["GET"])
def get_pizzas():
    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()
    
    pizza_tables = [
        "cheese_pizza", "pepperoni_pizza", "margherita_pizza", 
        "meat_rat_pizza", "veggie_rat_pizza", "beach_rat_pizza"
    ]
    
    pizzas = {}
    
    for table in pizza_tables:
        cursor.execute(f"SELECT item, type FROM {table}")
        ingredients = cursor.fetchall()
        print(f"Ingredients for {table}: {ingredients}")  # Debugging statement
        pizzas[table] = [{"item": item, "type": type} for item, type in ingredients]
    
    db.close()

    # Check that the pizzas dictionary is valid
    print(f"Returning pizzas: {pizzas}")  # Debugging statement

    # Ensure the response is valid JSON
    try:
        response = jsonify(pizzas)
        print(f"JSON Response: {response.get_data(as_text=True)}")  # Debugging the actual response
        return response
    except Exception as e:
        print(f"Error creating JSON response: {e}")
        return jsonify({"error": "Failed to generate valid JSON"}), 500


if __name__ == "__main__":
    app.run(debug=True)