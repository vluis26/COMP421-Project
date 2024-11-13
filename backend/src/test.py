import pymysql
from db import get_connection

def check_tables():
    db = get_connection()  # Connect to the database

    try:
        with db.cursor() as cursor:
            # List all tables
            cursor.execute("SHOW TABLES;")
            tables = cursor.fetchall()
            print("Tables in database:")
            for (table,) in tables:
                print(table)

            # Describe each table structure
            for (table,) in tables:
                print(f"\nStructure of table {table}:")
                cursor.execute(f"DESCRIBE {table};")
                columns = cursor.fetchall()
                for column in columns:
                    print(column)

    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        db.close()

check_tables()
