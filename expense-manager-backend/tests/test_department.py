import pytest
import datetime
from app.models import Company, User, Expense, Department
from datetime import datetime


def test_crud_department(app, client, auth_headers):
    #test @bp.route("/departments/create", methods=["POST"])
    data = {
        "name": "test Name",
        "description": "test Description",
        "company_id": 100,
    }
    response = client.post("/api/departments/create", headers=auth_headers, json=data)
    assert response.status_code == 200
    with app.app_context():
            assert (
                Department.query.filter_by(name=data["name"]).one_or_none()
                is not None
            )
   
    #test @bp.route("/departments/<id>/get", methods=["PUT"])
    company_id=100
    response = client.get("/api/departments/{}/get".format(company_id), headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json) == 2
 
    #test @bp.route("/departments/<id>/edit", methods=["PUT"])
    data = {
        "name": "test Name edit",
        "description": "test Description change",
        "company_id": 100,
    }
    department_id = 100
    response = client.put("/api/departments/{}/edit".format(department_id), headers=auth_headers,json=data)
    assert response.status_code == 200
    #test if editing is successful
    with app.app_context():
        assert (
            Department.query.filter_by(name=data["name"]).one_or_none()
            is not None
        )


    #test @bp.route("/departments/<id>/delete", methods=["POST"])
    data = {
        "name": "test Name edit",
        "description": "test Description change",
        "company_id": 100,
    }
    department_id = 100
    response = client.post("/api/departments/{}/delete".format(department_id), headers=auth_headers)
    assert response.status_code == 200
    with app.app_context():
        assert (
            Department.query.filter_by(name=data["name"]).one_or_none()
            is None
        )

