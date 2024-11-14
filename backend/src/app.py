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

if __name__ == "__main__":
    app.run(debug=True)