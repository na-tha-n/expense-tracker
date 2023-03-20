import pytest
import datetime
from app.models import Company, User, Expense
from datetime import datetime
def test_crud_company(app, client, auth_headers):

    #test @bp.route("/company/add", methods=["POST"])
    data = {
        "name": "test name",
        "description": "test description",
        "userId": 99,
    }

    response = client.post("/api/company/add", headers=auth_headers, json=data)
    assert "success" in response.json

    with app.app_context():
        assert (
            Company.query.filter_by(name=data["name"]).one_or_none()
            is not None
        )
    
    #test @bp.route("/company/<id>/users", methods=["GET"])
    company_id = 100
    response = client.get("/api/company/{}/users".format(company_id), headers=auth_headers)
    assert len(response.json) == 10

    #test @bp.route("/company/<id>/expenses", methods=["GET"])
    company_id = 100
    response = client.get("/api/company/{}/expenses".format(company_id), headers=auth_headers)
    assert response.status_code == 200
    #assert len(response.json) == 7

    #test @bp.route("/company/<id>/expenses/pending", methods=["GET"])
    company_id = 100
    response = client.get("/api/company/{}/expenses/pending".format(company_id), headers=auth_headers)
    assert response.status_code == 200
    #assert len(response.json) == 2

    #test @bp.route("/company/<id>/expenses/totals/<date>", methods=["GET"])
    company_id = 100
    date = datetime.now()
    response = client.get("/api/company/{}/expenses/totals/{}".format(company_id,date), headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json) == 6


