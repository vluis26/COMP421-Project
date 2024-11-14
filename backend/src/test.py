import sqlite3

users = [('bob', 'robby123', 'customer'), ('sally', 'slayer123', 'customer'), ('jim', 'gumball420', 'employee'), ('marge', 'largemarge92', 'manager')]
db = sqlite3.connect('pizza_rat.db')
cursor = db.cursor()
cursor.execute('drop table users')
cursor.execute('create table if not exists users (username varchar(20) primary key, password varchar(100) not null, status varchar(20) not null)')
cursor.executemany('insert into users (username, password, status) values (?, ?, ?)', users)
db.commit()
db.close()