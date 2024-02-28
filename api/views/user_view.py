import sqlite3
import json

database = './api/magnified.sqlite3'


def get_user(pk):
    with sqlite3.connect(database) as conn:
        conn.row_factory = sqlite3.Row
        db_cursor = conn.cursor()

        db_cursor.execute(
            '''
            SELECT
                u.id,
                u.name,
                u.email,
                u.iconNumber,
                u.isAdmin
            FROM Users u
            WHERE u.id = ?
            ''',
            (pk,),
        )

        query_results = db_cursor.fetchone()

    return json.dumps(dict(query_results)) if query_results else None


def get_all_users():
    with sqlite3.connect(database) as conn:
        conn.row_factory = sqlite3.Row
        db_cursor = conn.cursor()

        db_cursor.execute(
            '''
            SELECT
                u.id,
                u.name,
                u.email,
                u.iconNumber,
                u.isAdmin
            FROM Users u
            '''
        )
        query_results = db_cursor.fetchall()

        users = []

        for row in query_results:
            users.append(dict(row))

    return json.dumps(users) if query_results else None


def create_user(user):
    with sqlite3.connect(database) as conn:
        conn.row_factory = sqlite3.Row
        db_cursor = conn.cursor()

        db_cursor.execute(
            '''
            INSERT INTO Users
            (name, email, iconNumber, isAdmin)
            VALUES (?, ?, ?, ?)
            ''',
            (user['name'], user['email'], user['iconNumber'], user['isAdmin']),
        )

        if db_cursor.rowcount > 0:
            user['id'] = db_cursor.lastrowid
            return user

    return None
