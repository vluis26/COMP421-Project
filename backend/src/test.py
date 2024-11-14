import sqlite3

# Data to insert into tables
users = [
    ('bob', 'robby123', 'customer'), 
    ('sally', 'slayer123', 'customer'), 
    ('jim', 'gumball420', 'employee'), 
    ('marge', 'largemarge92', 'manager')
]
inventory = [
    ('tomato', 'sauce', 10), 
    ('spicy', 'sauce', 10), 
    ('pesto', 'sauce', 10), 
    ('alfredo', 'sauce', 10), 
    ('mozzarella', 'cheese', 10), 
    ('parmesan', 'cheese', 10), 
    ('cheddar', 'cheese', 10), 
    ('asiago', 'cheese', 10), 
    ('thin', 'crust', 10), 
    ('thick', 'crust', 10), 
    ('stuffed', 'specialty_crust', 10), 
    ('tomato', 'vegetable', 10), 
    ('basil', 'vegetable', 10), 
    ('spinach', 'vegetable', 10), 
    ('kale', 'vegetable', 10), 
    ('arugula', 'vegetable', 10), 
    ('onion', 'vegetable', 10), 
    ('cilantro', 'vegetable', 10), 
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
cheese_pizza = [
    ('thick', 'crust'), 
    ('tomato', 'sauce'), 
    ('mozzarella', 'cheese')
]
pepperoni_pizza = [
    ('thick', 'crust'), 
    ('tomato', 'sauce'), 
    ('mozzarella', 'cheese'), 
    ('pepperoni', 'meat')
]
margherita_pizza = [
    ('thick', 'crust'), 
    ('tomato', 'sauce'), 
    ('mozzarella', 'cheese'), 
    ('tomato', 'vegetable'), 
    ('basil', 'vegetable'), 
    ('pesto', 'condiment')
]
meat_rat_pizza = [
    ('stuffed', 'specialty_crust'), 
    ('spicy', 'sauce'), 
    ('mozzarella', 'cheese'), 
    ('pepperoni', 'meat'), 
    ('ham', 'meat'), 
    ('bacon', 'meat'), 
    ('sausage', 'meat')
]
veggie_rat_pizza = [
    ('thin', 'crust'), 
    ('pesto', 'sauce'), 
    ('mozzarella', 'cheese'), 
    ('tomato', 'vegetable'), 
    ('basil', 'vegetable'), 
    ('spinach', 'vegetable'), 
    ('arugula', 'vegetable'), 
    ('onion', 'vegetable'), 
    ('olives', 'vegetable'), 
    ('artichoke', 'vegetable')
]
beach_rat_pizza = [
    ('thin', 'crust'), 
    ('spicy', 'sauce'), 
    ('mozzarella', 'cheese'), 
    ('cilantro', 'vegetable'), 
    ('ham', 'meat')
]

# Connect to the SQLite database and create tables
db = sqlite3.connect('pizza_rat.db')
cursor = db.cursor()

# Drop tables if they exist
cursor.execute('DROP TABLE IF EXISTS users')
cursor.execute('DROP TABLE IF EXISTS inventory')
cursor.execute('DROP TABLE IF EXISTS prices')
cursor.execute('DROP TABLE IF EXISTS cheese_pizza')
cursor.execute('DROP TABLE IF EXISTS pepperoni_pizza')
cursor.execute('DROP TABLE IF EXISTS build_your_own_pizza')
cursor.execute('DROP TABLE IF EXISTS margherita_pizza')
cursor.execute('DROP TABLE IF EXISTS meat_rat_pizza')
cursor.execute('DROP TABLE IF EXISTS veggie_rat_pizza')
cursor.execute('DROP TABLE IF EXISTS beach_rat_pizza')

# Create tables
cursor.execute('CREATE TABLE users (username TEXT PRIMARY KEY, password TEXT NOT NULL, status TEXT NOT NULL)')
cursor.execute('CREATE TABLE inventory (item TEXT, type TEXT, quantity INTEGER NOT NULL, PRIMARY KEY(item, type))')
cursor.execute('CREATE TABLE prices (type TEXT PRIMARY KEY, price REAL)')

# Create tables for pizzas
cursor.execute('CREATE TABLE cheese_pizza (item TEXT, type TEXT, PRIMARY KEY(item, type))')
cursor.execute('CREATE TABLE pepperoni_pizza (item TEXT, type TEXT, PRIMARY KEY(item, type))')
cursor.execute('CREATE TABLE build_your_own_pizza (item TEXT, type TEXT, PRIMARY KEY(item, type))')
cursor.execute('CREATE TABLE margherita_pizza (item TEXT, type TEXT, PRIMARY KEY(item, type))')
cursor.execute('CREATE TABLE meat_rat_pizza (item TEXT, type TEXT, PRIMARY KEY(item, type))')
cursor.execute('CREATE TABLE veggie_rat_pizza (item TEXT, type TEXT, PRIMARY KEY(item, type))')
cursor.execute('CREATE TABLE beach_rat_pizza (item TEXT, type TEXT, PRIMARY KEY(item, type))')

# Insert data into tables
cursor.executemany('INSERT INTO users (username, password, status) VALUES (?, ?, ?)', users)
cursor.executemany('INSERT INTO inventory (item, type, quantity) VALUES (?, ?, ?)', inventory)
cursor.executemany('INSERT INTO prices (type, price) VALUES (?, ?)', prices)

# Insert pizza recipes
cursor.executemany('INSERT INTO cheese_pizza (item, type) VALUES (?, ?)', cheese_pizza)
cursor.executemany('INSERT INTO pepperoni_pizza (item, type) VALUES (?, ?)', pepperoni_pizza)
cursor.executemany('INSERT INTO margherita_pizza (item, type) VALUES (?, ?)', margherita_pizza)
cursor.executemany('INSERT INTO meat_rat_pizza (item, type) VALUES (?, ?)', meat_rat_pizza)
cursor.executemany('INSERT INTO veggie_rat_pizza (item, type) VALUES (?, ?)', veggie_rat_pizza)
cursor.executemany('INSERT INTO beach_rat_pizza (item, type) VALUES (?, ?)', beach_rat_pizza)

# Commit changes and close the database connection
db.commit()
db.close()
