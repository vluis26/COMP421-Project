import pymysql
from db import get_connection

db = get_connection(create_db=False)
cursor = db.cursor()

ingredients = [
    ('tomato', 10, 'sauce', 0),
    ('spicy', 10, 'sauce', 0),
    ('pesto', 10, 'sauce', 0),
    ('alfredo', 10, 'sauce', 0),
    ('none', -1, 'sauce', 0),
    ('mozzarella', 10, 'cheese', 0.50),
    ('parmesan', 10, 'cheese', 0.50),
    ('cheddar', 10, 'cheese', 0.50),
    ('asiago', 10, 'cheese', 0.50),
    ('thin', 10, 'crust', 0),
    ('thick', 10, 'crust', 0),
    ('stuffed', 10, 'crust', 1.50),
    ('tomato', 10, 'vegetable', 0.25),
    ('basil', 10, 'vegetable', 0.25),
    ('spinach', 10, 'vegetable', 0.25),
    ('kale', 10, 'vegetable', 0.25),
    ('arugula', 10, 'vegetable', 0.25),
    ('onion', 10, 'vegetable', 0.25),
    ('cilantro', 10, 'vegetable', 0.25),
    ('olives', 10, 'vegetable', 0.25),
    ('pineapple', 10, 'vegetable', 0.25),
    ('pickles', 10, 'vegetable', 0.25),
    ('artichoke', 10, 'vegetable', 0.25),
    ('chicken', 10, 'meat', 0.50),
    ('pepperoni', 10, 'meat', 0.50),
    ('ham', 10, 'meat', 0.50),
    ('bacon', 10, 'meat', 0.50),
    ('sausage', 10, 'meat', 0.50),
    ('tofu', 10, 'meat', 0.50),
    ('salt', 20, 'condiment', 1.00),
    ('pepper', 20, 'condiment', 1.00),
    ('ranch', 20, 'condiment', 1.00),
    ('bbq', 20, 'condiment', 1.00),
    ('garlic butter', 20, 'condiment', 1.00),
    ('rat drink', 'drink'),
    ('sprite', 30, 'drink', 2.00),
    ('coke', 30, 'drink', 2.00),
    ('sweet tea', 30, 'drink', 2.00)
]

pizzas = [
    ('Cheese', 'Pizza with just mozz', 8.99),
    ('Pepperoni', 'Pizza with mozz and pepperoni', 10.99),
    ('Margherita', 'Pizza with mozz, tomato, and basil', 'thick', 'tomato', 'mozzarella'),
    ('Meat Rat', 'Stuffed crust pizza with mozz and spicy sauce, topped with pepperoni, ham, bacon, and sausage', 9.99),
    ('Veggie Rat', 'Thin crust pizza with mozz, pesto, and veggies galore', 10.99),
    ('Beach Rat', 'Thin crust pizza with mozz, spicy sauce, cilantro, and ham', 10.99),
    ('Sewer Rat', 'Pizza with stuffed crust and every topping you could ever desire', 16.99)
]

employees = [
    ('John Doe', 'cashier', '2024-01-15', 'username4'),
    ('Jane Smith', 'cook', '2024-03-01', 'username5'),
    ('Tom Harris', 'delivery', '2024-05-22', 'username6'),
    ('Lucy Brown', 'cleaner', '2024-06-10', 'username7')
]

managers = [
    ('Michael Johnson', 'operations manager', '2023-11-01', 'bigboss'),
    ('Sarah Williams', 'shift manager', '2023-12-05', 'sarahwilliams')
]

customers = [
    ('Alice Green', '555-1234', 'username1'),
    ('Bob White', '555-5678', 'username2')
]

users = [
    ('username1', 'alice@example.com', 'password123', 'customer'),
    ('username2', 'bob@example.com', 'securePass456', 'customer'),
    ('username4', 'john.doe@example.com', 'adminPass789', 'employee'),
    ('bigboss', 'michael.johnson@example.com', 'managerPass123', 'manager'),
    ('sarahwilliams', 'sarah.williams@example.com', 'managerPass456', 'manager')
]

insert_ingredient_query = """
INSERT INTO Inventory (name, quantity, type, price) 
VALUES (%s, %s, %s, %s)
"""

cursor.executemany(insert_ingredient_query, ingredients)
db.commit()

insert_pizza_query = """
INSERT INTO Pizzas (name, description, price, size) 
VALUES (%s, %s, %s, %s)
"""
cursor.executemany(insert_pizza_query, pizzas)
db.commit()

fetch_pizza_ids_query = "SELECT pid, name FROM Pizzas"
cursor.execute(fetch_pizza_ids_query)
pizza_ids = {name: pid for pid, name in cursor.fetchall()}

fetch_ingredient_ids_query = "SELECT iid, name FROM Inventory"
cursor.execute(fetch_ingredient_ids_query)
ingredient_ids = {name: iid for iid, name in cursor.fetchall()}

pizza_ingredients = {
    'Cheese': [('thick', 1), ('tomato', 1), ('mozzarella', 1)],
    'Pepperoni': [('thick', 1), ('tomato', 1), ('mozzarella', 1), ('pepperoni', 1)],
    'Margherita': [('thick', 1), ('tomato', 1), ('mozzarella', 1), ('basil', 1), ('pesto', 1)],
    'Meat Rat': [('stuffed', 1), ('spicy', 1), ('mozzarella', 1), ('pepperoni', 1), ('ham', 1), ('bacon', 1), ('sausage', 1)],
    'Veggie Rat': [('thin', 1), ('pesto', 1), ('mozzarella', 1), ('tomato', 1), ('basil', 1), ('spinach', 1), ('arugula', 1), ('onion', 1), ('olives', 1), ('artichoke', 1)],
    'Beach Rat': [('thin', 1), ('spicy', 1), ('mozzarella', 1), ('ham', 1), ('cilantro', 1)],
    'Sewer Rat': [
        ('stuffed', 1), ('none', 1), ('mozzarella', 1), ('parmesan', 1), ('cheddar', 1), ('asiago', 1),
        ('tomato', 1), ('basil', 1), ('spinach', 1), ('kale', 1), ('arugula', 1), ('onion', 1), ('cilantro', 1),
        ('olives', 1), ('pineapple', 1), ('pickles', 1), ('artichoke', 1),
        ('chicken', 1), ('pepperoni', 1), ('ham', 1), ('bacon', 1), ('sausage', 1), ('tofu', 1),
        ('salt', 1), ('pepper', 1), ('ranch', 1), ('bbq', 1), ('garlic butter', 1)
    ]
}

insert_pizza_ingredient_query = """
INSERT INTO PizzaIngredients (pizza_id, ingredient_id, quantity) 
VALUES (%s, %s, %s)
"""

pizza_ingredient_data = []
for pizza_name, ingredients in pizza_ingredients.items():
    pizza_id = pizza_ids.get(pizza_name)
    for ingredient_name, quantity in ingredients:
        ingredient_id = ingredient_ids.get(ingredient_name)
        if pizza_id and ingredient_id:
            pizza_ingredient_data.append((pizza_id, ingredient_id, quantity))

cursor.executemany(insert_pizza_ingredient_query, pizza_ingredient_data)
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
INSERT INTO Customers (name, phone_number, user) 
VALUES (%s, %s, %s)
"""
cursor.executemany(insert_customer_query, customers)
db.commit()

insert_user_query = """
INSERT INTO Users (user, password, email, role) 
VALUES (%s, %s, %s, %s)
"""
cursor.executemany(insert_user_query, users)
db.commit()

# close out
cursor.close()
db.close()
