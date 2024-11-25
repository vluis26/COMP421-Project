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
    ('thin', 'crust', 5), 
    ('thick', 'crust', 2), 
    ('stuffed', 'specialty_crust', 10), 
    ('tomato', 'sauce', 10), 
    ('spicy', 'sauce', 1), 
    ('pesto', 'sauce', 10), 
    ('alfredo', 'sauce', 10), 
    ('mozzarella', 'cheese', 5), 
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
    ('rat drink', 'drink', 10), 
    ('sprite', 'drink', 10), 
    ('coke', 'drink', 10), 
    ('sweet tea', 'drink', 10)
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
cursor.execute('CREATE TABLE order_archive (oid VARCHAR(40) PRIMARY KEY, customer_id TEXT, employee_id INTEGER, price REAL)')
cursor.execute('CREATE TABLE active_orders (oid VARCHAR(40) PRIMARY KEY, customer_id TEXT, quantity INTEGER, price REAL, status VARCHAR(20))')
cursor.execute('CREATE TABLE customers (customer_id TEXT PRIMARY KEY, first VARCHAR(20), last VARCHAR(20), phone INTEGER, email VARCHAR(100), address VARCHAR(100), card_number INTEGER)')

# Insert data into tables
cursor.executemany('INSERT INTO users (username, password, status) VALUES (?, ?, ?)', users)
cursor.executemany('INSERT INTO inventory (item, type, quantity) VALUES (?, ?, ?)', inventory)
cursor.executemany('INSERT INTO prices (type, price) VALUES (?, ?)', prices)
cursor.executemany('INSERT INTO customers (customer_id, first, last, phone, email, address, card_number) values (?, ?, ?, ?, ?, ?, ?)', customers)
for pizza in pizzas:
    for item_id in pizzas[pizza]:
        cursor.execute('INSERT INTO pizzas (pizza_name, item_id) values (?, ?)', (pizza, item_id))

# Create the trigger (each SQL statement on its own)
cursor.execute("""
    CREATE TRIGGER IF NOT EXISTS archive_order
    AFTER UPDATE ON active_orders
    FOR EACH ROW
    BEGIN
        -- Insert the order into order_archive
        INSERT INTO order_archive (oid, customer_id, employee_id, price)
        SELECT NEW.oid, NEW.customer_id, 1, NEW.price
        WHERE NEW.status = 'Ready';
    END;
""")

cursor.execute("""
    CREATE TRIGGER IF NOT EXISTS archive_order_delete
    AFTER UPDATE ON active_orders
    FOR EACH ROW
    BEGIN
        DELETE FROM active_orders
        WHERE oid = NEW.oid AND NEW.status = 'Ready';
    END;
""")


# Commit changes and close the database connection
db.commit()
db.close()
