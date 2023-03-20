from datetime import datetime
from base64 import b64encode, b64decode

from flask import jsonify, request
from flask_jwt_extended import jwt_required
from flask_jwt_extended import current_user

from app import db, models
from app.api import bp
from app.models import Expense, ExpenseItem

def expense_serialize(expense):
    items = []
    for item in expense.items:
        items.append({
            "name": item.name,
            "amount": item.amount,
        })
    expense_dict = {
        "id": expense.id,
        "title": expense.title,
        "description": expense.description,
        "vendor": expense.vendor,
        "total": expense.total,
        "status": expense.status.value,
        "created_date": expense.created_date.strftime("%m/%d/%Y, %H:%M:%S"),
        "modified_date": expense.modified_date.strftime("%m/%d/%Y, %H:%M:%S"),
        "user_id": expense.user_id,
        "category_id": expense.category_id,
        "items": items,
        "receipt": b64encode(expense.receipt).decode('utf-8') if expense.receipt else None,
    }

    return expense_dict

# Add Expense
# Method: POST
# URL: /expense/add
@bp.route("/expense/add", methods=["POST"])
@jwt_required()
def add_expense():
    title = request.json.get("title", None)
    description = request.json.get("description", None)
    vendor = request.json.get("vendor", None)
    total = request.json.get("total", 0)
    user_id = current_user.id
    category_id = request.json.get("category_id", None)

    expense = Expense(
        title=title,
        description=description,
        vendor=vendor,
        total=total,
        category_id=category_id
    )
    expense.user = current_user

    receipt_b64 = request.json.get("receipt", None)
    if receipt_b64:
        expense.receipt = b64decode(receipt_b64)

    db.session.add(expense)

    items = request.json.get("items", [])
    for item in items:
        itemId = item.get("id", None)
        name = item.get("name", "")
        amount = item.get("amount", 0)

        item = ExpenseItem(name=name, amount=amount)
        item.expense = expense
        db.session.add(item)

    db.session.commit()

    return jsonify(success=True, expense=expense_serialize(expense))

# Method:GET
# URL: /expense/<id>
# Get all the information (expense and items) for a single expense using id
@bp.route("/expense/<id>", methods=["GET"])
@jwt_required()
def get_expense_info(id):
    expense = Expense.query.get(id)
    if expense is None:
        return jsonify(error="Expense not found"), 404

    return jsonify(expense_serialize(expense)), 200

# Update Expense
# Method: POST
# URL: /expense/add
@bp.route("/expense/<id>/update", methods=["PUT"])
@jwt_required()
def update_expense(id):
    expense = Expense.query.get(id)
    if Expense is None:
        return jsonify(error="Expense not found"), 404

    expense.title = request.json.get("title", expense.title)
    expense.description = request.json.get("description", expense.description)
    expense.vendor = request.json.get("vendor", expense.vendor)
    expense.total = request.json.get("total", expense.total)
    expense.category_id = request.json.get("category_id", expense.category_id)
    expense.modified_date = datetime.utcnow()

    # Update items by replacing all old ones
    ExpenseItem.query.filter_by(expense_id=expense.id).delete()
    items = request.json.get("items", [])
    for item in items:
        name = item.get("name", "")
        amount = item.get("amount", 0)

        item = ExpenseItem(name=name, amount=amount)
        item.expense = expense
        db.session.add(item)

    receipt_b64 = request.json.get("receipt", None)
    if receipt_b64:
        expense.receipt = b64decode(receipt_b64)

    db.session.commit()

    return jsonify(success=True, expense=expense_serialize(expense)), 200

@bp.route("/expense/<id>/delete", methods=["POST"])
@jwt_required()
def delete_expense(id):
    expense = Expense.query.get(id)
    if expense is None:
        return jsonify(error="Expense not found"), 404

    for item in expense.items:
        db.session.delete(item)
    db.session.delete(expense)
    db.session.commit()
    return jsonify(success=True)

# Submit Expense
# Method: PUT
# URL: /expense/<id>/submit
# Changes status of expense with id to SUBMITTED
@bp.route("/expense/<id>/submit", methods=["POST"])
@jwt_required()
def submit_expense(id):
    expense = Expense.query.get(id)
    if Expense is None:
        return jsonify(error="Expense not found"), 404
    if expense.status.value != "Draft":
        return jsonify(error="Expense cannot be submitted again"), 401

    expense.status = 'SUBMITTED'
    db.session.commit()
    return jsonify(success=True)

# Approve Expense
# Method: PUT
# URL: /expense/<id>/approve
# Changes status of expense with id to APPROVED
@bp.route("/expense/<id>/approve", methods=["POST"])
@jwt_required()
def approve_expense(id):
    expense = Expense.query.get(id)
    if Expense is None:
        return jsonify(error="Expense not found"), 404

    expense.status = 'APPROVED'
    db.session.commit()
    return jsonify(success=True)

# Reject Expense
# Method: PUT
# URL: /expense/<id>/reject
# Changes status of expense with id to REJECTED
@bp.route("/expense/<id>/reject", methods=["POST"])
@jwt_required()
def reject_expense(id):
    expense = Expense.query.get(id)
    if Expense is None:
        return jsonify(error="Expense not found"), 404

    expense.status = 'REJECTED'
    db.session.commit()
    return jsonify(success=True)
