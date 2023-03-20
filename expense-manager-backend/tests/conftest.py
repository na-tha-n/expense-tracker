import os
import sqlite3
import tempfile

import pytest
from flask_jwt_extended import create_access_token

from app import create_app, db
from app.models import User

with open(os.path.join(os.path.dirname(__file__), "data.sql"), "rb") as f:
    data_sql = f.read().decode("utf8")

def initialize_sqlite3_db(db_path):
    db = sqlite3.connect(db_path)
    cursor = db.cursor()
    cursor.executescript(data_sql)
    db.commit()
    db.close()

@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()

    app = create_app({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": 'sqlite:///' + db_path
    })

    with app.app_context():
        db.create_all()
        initialize_sqlite3_db(db_path)

    yield app

    os.close(db_fd)
    os.unlink(db_path)

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def auth_headers(app):
    with app.app_context():
        user = User.query.get(1)
        access_token = create_access_token(identity=user)

    auth_headers = {
        "Authorization": "Bearer {}".format(access_token)
    }
    return auth_headers

