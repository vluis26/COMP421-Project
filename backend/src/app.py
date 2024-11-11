from flask import Flask, jsonify, request

app = Flask(__name__)

users = [
    {"id": 1, "name": "Alice", "age": 25},
    {"id": 2, "name": "Lucas", "age": 21}
]

@app.route("/users", methods={"GET"})
def get_users():
    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True)