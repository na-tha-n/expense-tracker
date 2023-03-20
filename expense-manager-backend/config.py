import os

if os.environ.get('DATABASE_HOST'):
    host = os.environ.get('DATABASE_HOST')
    user = os.environ.get('DATABASE_USER')
    password = os.environ.get('DATABASE_PASSWORD')
    db_name = os.environ.get('DATABASE_NAME')
    db_url = f'postgresql+psycopg2://{user}:{password}@{host}/{db_name}'
else:
    basedir = os.path.abspath(os.path.dirname(__file__))
    db_url = 'sqlite:///' + os.path.join(basedir, 'app.db')

class Config(object):
    SQLALCHEMY_DATABASE_URI = db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "secret"
    CORS_HEADERS = "Content-Type"

