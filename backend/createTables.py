import pymysql
from db import get_connection


def create_tables():
    db = get_connection(create_db=False)

    try:
        with db.cursor() as cursor:
            # create tables
            q1 = """
                CREATE TABLE IF NOT EXISTS Customers ( 
                    cid INTEGER PRIMARY KEY AUTO_INCREMENT, 
                    name VARCHAR(40) NOT NULL, 
                    email VARCHAR(40) UNIQUE NOT NULL,
                    phoneNumber VARCHAR(15)
                    username VARCHAR(20) UNIQUE,
                    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE SET NULL
                );"""

            q2 = """
                CREATE TABLE IF NOT EXISTS Employees (
                    eid INTEGER PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(40) NOT NULL,
                    position VARCHAR(30),
                    hireDate DATE
                );"""

            q3 = """
                CREATE TABLE IF NOT EXISTS Managers (
                    mid INTEGER PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(40) NOT NULL,
                    hireDate DATE
                );"""

            q4 = """
                CREATE TABLE IF NOT EXISTS Inventory (
                    iid INTEGER PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(40) NOT NULL,
                    quantity INT NOT NULL,
                    type ARCHAR(20) NOT NULL,
                    price DECIMAL(10, 2)
                );"""

            q5 = """
                CREATE TABLE IF NOT EXISTS Orders (
                    oid INTEGER PRIMARY KEY AUTO_INCREMENT,
                    order_date DATE,
                    customer_id INT,
                    employee_id INTEGER,
                    status VARCHAR(20),
                    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
                    FOREIGN KEY (customer_id) REFERENCES Customers(cid) ON DELETE CASCADE,
                    FOREIGN KEY (employee_id) REFERENCES Employees(eid) ON DELETE SET NULL
                );"""

            q6 = """
                CREATE TABLE IF NOT EXISTS Users (
                    username VARCHAR(20) PRIMARY KEY,
                    password VARCHAR(20) NOT NULL,
                    email VARCHAR(100),
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );"""

            q7 = """
                CREATE TABLE IF NOT EXISTS Pizzas (
                    pid INTEGER PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL,
                    description TEXT,
                    price DECIMAL(10, 2),
                    size VARCHAR(20)
                );"""

            q8 = """
                CREATE TABLE IF NOT EXISTS PizzaIngredients (
                    pizza_id INTEGER,
                    ingredient_id INTEGER,
                    quantity INT,
                    PRIMARY KEY (pizza_id, ingredient_id),
                    FOREIGN KEY (pizza_id) REFERENCES Pizzas(pid) ON DELETE CASCADE,
                    FOREIGN KEY (ingredient_id) REFERENCES Inventory(iid) ON DELETE CASCADE
                );"""

            cursor.execute(q1)
            cursor.execute(q2)
            cursor.execute(q3)
            cursor.execute(q4)
            cursor.execute(q5)
            cursor.execute(q6)
            cursor.execute(q7)
            cursor.execute(q8)
            db.commit()
            print("Tables created successfully!")
    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        db.close()

