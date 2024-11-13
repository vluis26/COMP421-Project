import pymysql

from createTables import create_tables


def get_connection():
    connection = pymysql.connect(
        host='localhost',    
        user='root', 
        password='your_passwd'
    )
    create_database(connection)
    
    # Select the database before proceeding
    connection.select_db('pizza_ordering')
    

    
    return connection


def create_database(connection):
    try:
        with connection.cursor() as cursor:
            cursor.execute("CREATE DATABASE IF NOT EXISTS pizza_ordering")
            connection.commit()
            print("Database created successfully!")
    except Exception as e:
        print(f"Error occurred while creating database: {e}")
    