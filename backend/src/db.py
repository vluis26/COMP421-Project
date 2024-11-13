import pymysql

def get_connection():
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='123003LcV$',
        database='pizza_db'  # Connect directly to your database
    )
    return connection

def create_database():
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='123003LcV$'
    )
    try:
        with connection.cursor() as cursor:
            cursor.execute("CREATE DATABASE IF NOT EXISTS pizza_db")
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    username VARCHAR(20) PRIMARY KEY,
                    password VARCHAR(100) NOT NULL,
                    email VARCHAR(100),
                    role ENUM('customer', 'employee', 'manager') NOT NULL
                );
            """)
            connection.commit()
            print("Database and table created successfully!")
    except Exception as e:
        print(f"Error occurred while creating database or table: {e}")
    finally:
        connection.close()
