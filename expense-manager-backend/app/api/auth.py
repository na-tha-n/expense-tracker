import re

from flask import jsonify, request
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from app import db, jwt
from app.api import bp
from app.models import User

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

@bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).one_or_none()
    if user is None or not user.check_password(password):
        return jsonify(error="Invalid username/password"), 401

    user_dict={
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'company_id': user.company_id,
        'department_id': user.department_id

    }

    access_token = create_access_token(identity=user, additional_claims=user_dict)
    refresh_token = create_refresh_token(identity=user)

    return jsonify(access_token=access_token, refresh_token=refresh_token)

@bp.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)

    #email validation
    isEmailValid = validation_email(email)
    if isEmailValid is not None: return jsonify(error=isEmailValid), 401

    #password validation
    isPasswordValid = validation_password_format(password)
    if isPasswordValid is not None: return jsonify(error=isPasswordValid), 401

    user = User.query.filter_by(email=email).one_or_none()
    if user is not None:
        return jsonify(error="Email is already registered"), 401

    user = User(email=email, first_name=first_name, last_name=last_name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user)
    return jsonify(access_token=access_token)

@bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)

#Validation
def validation_email(email):
    #email [name]@[domain].[domail] format
    error = None
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if not (re.fullmatch(regex, email)):
        error="Invalid Email format"
    return error

def validation_password_format(password):
    error = None
    #password must contain at least a number, an upper case, a special character, > 8 charater
    regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]')

    if (len(password)<8):
        error='Password must have minimum 8 characters'
    elif regex.search(password) == None:
        error='Password must contain at least a special character'
    elif not re.search("[A-Z]", password):
        error='Password must contain at least an Upper Case'
    elif not re.search("[0-9]", password):
        error='Password must contain at least a digit'
    return error
