import sqlite3
import json
from .views_helper import dict_factory

database = './api/magnified.sqlite3'


def get_user(pk):
    '''returns requested user object'''

    with sqlite3.connect(database) as conn:
        conn.row_factory = dict_factory
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

    return json.dumps(query_results) if query_results else None


def get_all_users(email):
    '''returns requested list of users'''

    with sqlite3.connect(database) as conn:
        conn.row_factory = dict_factory
        db_cursor = conn.cursor()

        users = []
        if not email:
            # email is not specified; get all users
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

            for row in query_results:
                users.append(row)
        else:
            # email is specified; get matching user
            db_cursor.execute(
                '''
                SELECT
                    u.id,
                    u.name,
                    u.email,
                    u.iconNumber,
                    u.isAdmin
                FROM Users u
                WHERE u.email = ?
                ''',
                (email,),
            )
            query_results = db_cursor.fetchone()
            if query_results:
                users.append(query_results)

    return json.dumps(users) if query_results else None


def create_user(user):
    '''returns created user object'''

    with sqlite3.connect(database) as conn:
        conn.row_factory = dict_factory
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
            return json.dumps(user)

    return None


def update_user(pk, user):
    '''returns updated user object'''

    with sqlite3.connect(database) as conn:
        conn.row_factory = dict_factory
        db_cursor = conn.cursor()

        db_cursor.execute(
            '''
            UPDATE Users
                SET
                    name = ?,
                    email = ?,
                    iconNumber = ?,
                    isAdmin = ?
            WHERE id = ?
            ''',
            (user['name'], user['email'], user['iconNumber'], user['isAdmin'], pk),
        )

        if db_cursor.rowcount > 0:
            user['id'] = pk
            return json.dumps(user)

    return None
