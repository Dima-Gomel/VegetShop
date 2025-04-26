import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Настройки подключения к PostgreSQL
DB_HOST = "localhost"
DB_PORT = "5432"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_NAME = "fresh_vegetables"

def recreate_database():
    try:
        # Подключаемся к серверу PostgreSQL (без указания базы)
        conn = psycopg2.connect(
            dbname="postgres",  # важно! подключаемся к системной базе
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)  # Разрешаем выполнять команды вне транзакций

        cur = conn.cursor()

        # Завершаем активные подключения к базе, если есть
        cur.execute(f"""
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '{DB_NAME}'
              AND pid <> pg_backend_pid();
        """)

        # Удаляем базу, если существует
        cur.execute(f"DROP DATABASE IF EXISTS {DB_NAME};")

        # Создаём новую базу с нужной кодировкой
        cur.execute(f"""
            CREATE DATABASE {DB_NAME}
            WITH OWNER = {DB_USER}
            ENCODING = 'UTF8'
            LC_COLLATE = 'C'
            LC_CTYPE = 'C'
            TEMPLATE = template0;
        """)

        print(f"База данных '{DB_NAME}' успешно пересоздана! 🚀")

        cur.close()
        conn.close()

    except psycopg2.Error as e:
        print(f"Ошибка при работе с базой данных: {e}")

if __name__ == "__main__":
    recreate_database()
