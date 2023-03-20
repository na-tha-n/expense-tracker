import pytest
from flask_jwt_extended import current_user

from app.models import User

def test_signup(app, client):
    data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "abc@example.com",
        "password": "Password!123",
    }

    # test that sign up works
    response = client.post("/api/signup", json=data)
    assert response.status_code == 200
    assert "access_token" in response.json

    with app.app_context():
        assert (
            User.query.filter_by(email=data["email"]).one_or_none()
            is not None
        )

    # test that register with registered email will fail
    response = client.post("/api/signup", json=data)
    assert response.status_code == 401

def test_login(client):
    data = {
        "email": "klebrum0@typepad.com",
        "password": "123456",
    }

    # test that login works
    response = client.post("/api/login", json=data)
    assert response.status_code == 200
    assert "access_token" in response.json

def test_me(client, auth_headers):
    # test that jwt-required user identity works
    with client:
        response = client.post("/api/me", headers=auth_headers)
        assert response.status_code == 200
        assert "first_name" in response.json
        assert current_user.id == 1

