from flask import Flask, jsonify, request
# import bcrypt
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/register", methods=["POST"])
def register_user():
    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']

    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO Users (username, password, email) VALUES (%s, %s, %s)",
                (username, password, email),  # Storing plain text password
            )
            connection.commit()
            return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        connection.close()



@app.route("/login", methods=["POST"])
def login_user():
    data = request.json
    username = data['username']
    password = data['password']

    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT password FROM Users WHERE username = %s", (username,))
            result = cursor.fetchone()
            if result and password == result[0]:  # Directly comparing plain text passwords
                return jsonify({"message": "Login successful"}), 200
            else:
                return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        connection.close()


@app.route("/users", methods=["GET"])
def get_users():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT username, email FROM users")
            users = cursor.fetchall()
            return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        connection.close()



if __name__ == "__main__":
    app.run(debug=True)