import pymysql
from db import get_connection

db = get_connection()
cursor = db.cursor()

ingredients = [
    ('tomato', 'sauce'),
    ('spicy', 'sauce'),
    ('pesto', 'sauce'),
    ('alfredo', 'sauce'),
    ('none', 'sauce'),
    ('mozzarella', 'cheese'),
    ('parmesan', 'cheese'),
    ('cheddar', 'cheese'),
    ('asiago', 'cheese'),
    ('thin', 'crust'),
    ('thick', 'crust'),
    ('stuffed', 'crust'),
    ('tomato', 'vegetable'),
    ('basil', 'vegetable'),
    ('spinach', 'vegetable'),
    ('kale', 'vegetable'),
    ('arugula', 'vegetable'),
    ('onion', 'vegetable'),
    ('cilantro', 'vegetable'),
    ('olives', 'vegetable'),
    ('pineapple', 'vegetable'),
    ('pickles', 'vegetable'),
    ('artichoke', 'vegetable'),
    ('chicken', 'meat'),
    ('pepperoni', 'meat'),
    ('ham', 'meat'),
    ('bacon', 'meat'),
    ('sausage', 'meat'),
    ('tofu', 'meat'),
    ('salt', 'condiment'),
    ('pepper', 'condiment'),
    ('ranch', 'condiment'),
    ('bbq', 'condiment'),
    ('garlic butter', 'condiment'),
    ('rat drink', 'drink'),
    ('sprite', 'drink'),
    ('coke', 'drink'),
    ('sweet tea', 'drink')
]

pizzas = [
    ('Cheese', 'Default pizza with mozzarella cheese', 'thick', 'tomato', 'mozzarella'),
    ('Pepperoni', 'Pizza with mozzarella cheese and pepperoni', 'thick', 'tomato', 'mozzarella'),
    ('Margherita', 'Pizza with mozzarella cheese, tomato, and basil', 'thick', 'tomato', 'mozzarella'),
    ('Meat Rat', 'Pizza with mozzarella cheese and multiple meats', 'stuffed', 'spicy', 'mozzarella'),
    ('Veggie Rat', 'Pizza with mozzarella cheese and a variety of vegetables', 'thin', 'pesto', 'mozzarella'),
    ('Beach Rat', 'Pizza with mozzarella cheese, cilantro, and ham', 'thin', 'spicy', 'mozzarella'),
    ('Sewer Rat', 'Pizza with mozzarella and multiple cheeses and toppings', 'stuffed', 'none', 'mozzarella')
]

employees = [
    ('John Doe', 'cashier', '2024-01-15'),
    ('Jane Smith', 'cook', '2024-03-01'),
    ('Tom Harris', 'delivery', '2024-05-22'),
    ('Lucy Brown', 'cleaner', '2024-06-10')
]

managers = [
    ('Michael Johnson', 'operations manager', '2023-11-01'),
    ('Sarah Williams', 'shift manager', '2023-12-05')
]

customers = [
    ('alice@example.com', 'Alice Green', '2024-02-11', '555-1234'),
    ('bob@example.com', 'Bob White', '2024-03-18', '555-5678'),
    ('charlie@example.com', 'Charlie Black', '2024-04-02', '555-9876'),
    ('diana@example.com', 'Diana Gray', '2024-07-15', '555-6543')
]

users = [
    ('alice@example.com', 'password123', 'customer'),
    ('bob@example.com', 'securePass456', 'customer'),
    ('john.doe@example.com', 'adminPass789', 'employee'),
    ('michael.johnson@example.com', 'managerPass123', 'manager'),
    ('sarah.williams@example.com', 'managerPass456', 'manager')
]

insert_ingredient_query = """
INSERT INTO Ingredients (name, type) 
VALUES (%s, %s)
"""

cursor.executemany(insert_ingredient_query, ingredients)
db.commit()

insert_employee_query = """
INSERT INTO Employees (name, role, hire_date) 
VALUES (%s, %s, %s)
"""
cursor.executemany(insert_employee_query, employees)
db.commit()

insert_manager_query = """
INSERT INTO Managers (name, role, hire_date) 
VALUES (%s, %s, %s)
"""
cursor.executemany(insert_manager_query, managers)
db.commit()

insert_customer_query = """
INSERT INTO Customers (email, name, registration_date, phone_number) 
VALUES (%s, %s, %s, %s)
"""
cursor.executemany(insert_customer_query, customers)
db.commit()

# Insert users
insert_user_query = """
INSERT INTO Users (email, password, role) 
VALUES (%s, %s, %s)
"""
cursor.executemany(insert_user_query, users)
db.commit()

# Close the cursor and connection
cursor.close()
db.close()
