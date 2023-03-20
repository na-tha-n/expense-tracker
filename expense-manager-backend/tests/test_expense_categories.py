from flask import jsonify, request

from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required

from app import db, jwt
from app.api import bp
from app.models import Company, ExpenseCategory, User, Expense, Department

from datetime import datetime
from dateutil.relativedelta import relativedelta

def test_crud_category(app, client, auth_headers):

    #test @bp.route("/expense/category/all", methods=["POST"])
    response = client.post("/api/expense/category/all", headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json) == 13
