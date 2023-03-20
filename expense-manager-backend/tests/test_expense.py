import pytest
from flask_jwt_extended import current_user

from app.models import Expense, ExpenseItem

def test_crud_expense(app, client, auth_headers):
    data = {
        "title": "test 1",
        "description": "description 1",
        "vendor": "vendor 1",
        "total": 123.45,
        "category_id": 1,
        "items": [
            { "name": "item 1", "amount": 10.0 },
            { "name": "item 2", "amount": 20.0 },
            { "name": "item 3", "amount": 30.0 },
        ]
    }

    # test that adding new expense works
    response = client.post("/api/expense/add", headers=auth_headers, json=data)
    assert response.status_code == 200
    assert "success" in response.json
    assert "expense" in response.json

    with app.app_context():
        assert (
            Expense.query.filter_by(title=data["title"]).one_or_none()
            is not None
        )

    newData = {
        "title": "test 2",
        "description": "description 2",
        "vendor": "vendor 2",
        "total": 123.45,
        "category_id": 1,
        "items": [
            { "name": "item 4", "amount": 10.0 },
            { "name": "item 5", "amount": 20.0 },
        ]
    }

    # test that update expense works
    expense_id = response.json["expense"]["id"]
    response = client.put("/api/expense/{}/update".format(expense_id), headers=auth_headers, json=newData)
    assert response.status_code == 200
    assert "success" in response.json

    with app.app_context():
        assert (
            ExpenseItem.query.filter_by(name=data["items"][0]["name"]).one_or_none()
            is None
        )

    # test that get expense works
    response = client.get("/api/expense/{}".format(expense_id), headers=auth_headers)
    assert response.status_code == 200
    assert "items" in response.json
    assert len(response.json["items"]) == len(newData["items"])

    # test that get my expense works (current user)
    response = client.post("/api/me/expenses", headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json) == 1

    # test that delete expense works
    response = client.post("/api/expense/{}/delete".format(expense_id), headers=auth_headers)
    assert response.status_code == 200
    assert "success" in response.json

    with app.app_context():
        assert (
            Expense.query.get(expense_id) is None
        )

def test_expense_status(app, client, auth_headers):
    data = {
        "title": "test 1",
        "description": "description 1",
        "vendor": "vendor 1",
        "total": 123.45,
        "category_id": 1,
    }

    # test that adding new expense works
    response = client.post("/api/expense/add", headers=auth_headers, json=data)
    assert response.status_code == 200
    assert "expense" in response.json
    expense_id = response.json["expense"]["id"]

    with app.app_context():
        assert (
            Expense.query.get(expense_id).status.value == "Draft"
        )

    # test that approve expense works
    response = client.post("/api/expense/{}/approve".format(expense_id), headers=auth_headers)
    assert response.status_code == 200
    assert "success" in response.json

    with app.app_context():
        assert (
            Expense.query.get(expense_id).status.value == "Approved"
        )

    # test that reject expense works
    response = client.post("/api/expense/{}/reject".format(expense_id), headers=auth_headers)
    assert response.status_code == 200
    assert "success" in response.json

    with app.app_context():
        assert (
            Expense.query.get(expense_id).status.value == "Rejected"
        )

def test_expense_category(app, client, auth_headers):
    # test that adding new expense works
    response = client.post("/api/expense/category/all", headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json) > 0
