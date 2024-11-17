import sqlite3

users = [
    ('bob', 'robby123', 'customer'), 
    ('sally', 'slayer123', 'customer'), 
    ('jim', 'gumball420', 'employee'), 
    ('marge', 'largemarge92', 'manager')
]
customers = [
    ('bob', 'Bob', 'Robby', 1112223344, 'bob@bob.bo', '800 Bob Drive, Durham NC 27712', '999988887777'),
    ('sally', 'Salmon', 'Robby', 1112223344, 'fish@lake.co.uk', '800 Bob Drive, Durham NC 27712', '666655554444')
]
inventory = [
    ('thin', 'crust', 2), 
    ('thick', 'crust', 10), 
    ('stuffed', 'specialty_crust', 10), 
    ('tomato', 'sauce', 10), 
    ('spicy', 'sauce', 0), 
    ('pesto', 'sauce', 10), 
    ('alfredo', 'sauce', 10), 
    ('mozzarella', 'cheese', 0), 
    ('parmesan', 'cheese', 10), 
    ('cheddar', 'cheese', 10), 
    ('asiago', 'cheese', 10), 
    ('tomato', 'vegetable', 10), 
    ('basil', 'vegetable', 10), 
    ('spinach', 'vegetable', 10), 
    ('kale', 'vegetable', 10), 
    ('arugula', 'vegetable', 10), 
    ('onion', 'vegetable', 10), 
    ('cilantro', 'vegetable', 0), 
    ('olives', 'vegetable', 10), 
    ('pineapple', 'vegetable', 10), 
    ('pickles', 'vegetable', 10), 
    ('artichoke', 'vegetable', 10), 
    ('chicken', 'meat', 10), 
    ('pepperoni', 'meat', 10), 
    ('ham', 'meat', 10), 
    ('bacon', 'meat', 10), 
    ('sausage', 'meat', 10), 
    ('tofu', 'meat', 10), 
    ('salt', 'condiment', 10), 
    ('pepper', 'condiment', 10), 
    ('ranch', 'condiment', 10), 
    ('bbq', 'condiment', 10), 
    ('garlic butter', 'condiment', 10), 
    ('rat_drink', 'drink', 10), 
    ('sprite', 'drink', 10), 
    ('coke', 'drink', 10), 
    ('sweet_tea', 'drink', 10)
]
prices = [
    ('sauce', 0.00), 
    ('condiment', 0.00), 
    ('meat', 0.50), 
    ('vegetable', 0.25), 
    ('specialty_crust', 1.50), 
    ('drink', 2.00)
]
pizzas = {
    'cheese_pizza': (2, 4, 8),
    'pepperoni_pizza': (2, 4, 8, 24),
    'margherita_pizza': (2, 4, 8, 12, 13),
    'meat_rat_pizza': (3, 5, 8, 24, 25, 26, 27),
    'veggie_rat_pizza': (1, 6, 8, 12, 13, 14, 16, 17, 19, 22),
    'beach_rat_pizza': (1, 5, 8, 18, 25)
}

# Connect to the SQLite database and create tables
db = sqlite3.connect('pizza_rat.db')
cursor = db.cursor()

# Drop tables if they exist
cursor.execute('DROP TABLE IF EXISTS users')
cursor.execute('DROP TABLE IF EXISTS inventory')
cursor.execute('DROP TABLE IF EXISTS prices')
cursor.execute('DROP TABLE IF EXISTS pizzas')
cursor.execute('DROP TABLE IF EXISTS order_archive')
cursor.execute('DROP TABLE IF EXISTS active_orders')
cursor.execute('DROP TABLE IF EXISTS pizza_queue')
cursor.execute('DROP TABLE IF EXISTS pizza_ingreds')
cursor.execute('DROP TABLE IF EXISTS customers')

# Create tables
cursor.execute('CREATE TABLE users (username TEXT PRIMARY KEY, password TEXT NOT NULL, status TEXT NOT NULL)')
cursor.execute('CREATE TABLE inventory (item_id INTEGER PRIMARY KEY, item TEXT, type TEXT, quantity INTEGER NOT NULL)')
cursor.execute('CREATE TABLE prices (type TEXT PRIMARY KEY, price REAL)')
cursor.execute('CREATE TABLE pizzas (pizza_name VARCHAR(40), item_id INTEGER, PRIMARY KEY(pizza_name, item_id))')
cursor.execute('CREATE TABLE order_archive (oid INTEGER PRIMARY KEY, customer_id INTEGER, employee_id INTEGER, price REAL)')
cursor.execute('CREATE TABLE active_orders (oid INTEGER PRIMARY KEY, customer_id INTEGER, employee_id INTEGER, retrieval VARCHAR(20), status VARCHAR(20), quantity INTEGER, price REAL)')
cursor.execute('CREATE TABLE pizza_queue (pid INTEGER, oid INTEGER)')
cursor.execute('CREATE TABLE pizza_ingreds (pid INTEGER, item_id INTEGER, PRIMARY KEY(pid, item_id))')
cursor.execute('CREATE TABLE customers (username VARCHAR(20) PRIMARY KEY, customer_id INTEGER, first VARCHAR(20), last VARCHAR(20), phone INTEGER, email VARCHAR(100), address VARCHAR(100), card_number INTEGER)')

# Insert data into tables
cursor.executemany('INSERT INTO users (username, password, status) VALUES (?, ?, ?)', users)
cursor.executemany('INSERT INTO inventory (item, type, quantity) VALUES (?, ?, ?)', inventory)
cursor.executemany('INSERT INTO prices (type, price) VALUES (?, ?)', prices)
cursor.executemany('INSERT INTO customers (username, first, last, phone, email, address, card_number) values (?, ?, ?, ?, ?, ?, ?)', customers)
for pizza in pizzas:
    for item_id in pizzas[pizza]:
        cursor.execute('INSERT INTO pizzas (pizza_name, item_id) values (?, ?)', (pizza, item_id))

# Commit changes and close the database connection
db.commit()
db.close()
