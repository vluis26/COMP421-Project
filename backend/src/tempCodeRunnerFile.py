@app.route("/ingredient_price", methods=["GET"])
def get_ingredient_price():
    ingredient_name = request.args.get("ingredient")
    if not ingredient_name:
        return jsonify({"error": "Missing ingredient name"}), 400

    db = sqlite3.connect("pizza_rat.db")
    cursor = db.cursor()
    
    cursor.execute("SELECT price FROM prices WHERE type = (SELECT type FROM inventory WHERE item = ?)", (ingredient_name,))
    result = cursor.fetchone()
    db.close()
    
    if result:
        return jsonify({"price": result[0]})
    else:
        return jsonify({"error": "Ingredient not found"}), 404