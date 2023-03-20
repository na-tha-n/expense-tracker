from flask import jsonify, request

from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required

from app import db, jwt
from app.api import bp
from app.models import ExpenseCategory

def category_serialize(category):
    category_dict = {
        "id": category.id,
        "name": category.name,
        "description": category.description,
    }
    return category_dict

@bp.route("/expense/category/all", methods=["POST"])
@jwt_required()
def get_all_categories():
    categories = []
    for c in ExpenseCategory.query.all():
        categories.append(category_serialize(c))
    return jsonify(categories)
