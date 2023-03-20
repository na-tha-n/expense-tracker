from flask import jsonify, request

from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required

from app import db, jwt
from app.api import bp
from app.models import User, Expense, Company

@bp.route("/me", methods=["POST"])
@jwt_required()
def me():
    return jsonify(
        id=current_user.id,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        company_id=current_user.company_id,
    )

# Get all Expenses of current user
# Method: POST
# URL: /users/me/expenses
# Return all the current user’s expenses
@bp.route("/me/expenses", methods=["POST"])
@jwt_required()
def get_user_expenses():
    expenseList = []
    for e in current_user.expenses:
        expenseList.append({
            'id': e.id,
            'title': e.title ,
            'description': e.description,
            'vendor': e.vendor,
            'total': e.total,
            'status': e.status.value,
            'created_date': e.created_date,
            'modified_date': e.modified_date,
            'user_id': e.user_id,
            'category_id': e.category_id
        })
    return jsonify(expenseList)

@bp.route("/users/<id>", methods=["POST"])
@jwt_required()
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify(error="Invalid User ID"), 404

    return jsonify(
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
    )

@bp.route("/users/<id>/edit", methods=["PUT"])
@jwt_required()
def edit_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify(error="Invalid User ID"), 404

    first_name = request.json.get("first_name", user.first_name)
    last_name = request.json.get("last_name", user.last_name)
    department_id = request.json.get("department_id", user.department_id)
    company_id = request.json.get("company_id", user.company_id)
    
    user.first_name = first_name
    user.last_name = last_name
    user.department_id = department_id
    user.company_id = company_id
    db.session.commit()
    return jsonify(success=True)

@bp.route("/users/<id>/delete", methods=["POST"])
@jwt_required()
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify(error="Invalid User ID"), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify(success=True)


@bp.route("/users/join/<id>/<companyId>", methods=["PUT"])
@jwt_required()
def user_join_company(id, companyId):
    user = User.query.get(id)
    company = Company.query.get(companyId)
    if user is None:
        return jsonify(error="Invalid User ID"), 404
    if company is None:
        return jsonify(error="Invalid Company ID"), 404
    
    user.company_id = companyId
    db.session.commit()
    return jsonify(success=True)
