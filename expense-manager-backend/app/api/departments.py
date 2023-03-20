from flask import jsonify, request
import json
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required

from app import db, jwt
from app.api import bp
from app.models import Company, Department



def department_json(self):
        return {'name': self.id, 'description': self.description,
                'company_id': self.company_id}

#Method to create a department
@bp.route("/departments/create", methods=["POST"])
@jwt_required()
def create_department():
    name = request.json.get("name", None)
    description = request.json.get("description", None)
    company_id = request.json.get("company_id", None)

    department = Department.query.filter_by(name=name, company_id=company_id).one_or_none()
    if department is not None:
        company = Company.query.get(company_id)
        return jsonify(error="Duplicated department at " + company.name), 401
    department  = Department(name=name, description=description, company_id=company_id)
    db.session.add(department)
    db.session.commit()
    return jsonify(success=True)
     

#Method to get all departments
@bp.route("/departments/<id>/get", methods=["GET"])
@jwt_required()
def get_department(id):
    #return a list of all department
    department = Department.query.filter_by(company_id=id)
    department_list = []
    for d in department:
        department_list.append({
            'id': d.id,
            'name': d.name,
            'description':  d.description,
            'company_id': d.company_id
        })
    return jsonify(department_list)

#Method to edit a department
@bp.route("/departments/<id>/edit", methods=["PUT"])
@jwt_required()
def edit_department(id):
    department = Department.query.get(id)
    if department is None:
        return jsonify(error="Invalid department ID"), 404

    #getting data from client
    name = request.json.get("name", Department.name)
    company_id = request.json.get("company_id", Department.company_id)
    description = request.json.get("description", Department.description)
    #commit changes to the database
    department.company_id = company_id
    department.name = name
    department.description = description
    db.session.commit()
    return jsonify(success=True)

#Method to delete a department
@bp.route("/departments/<id>/delete", methods=["POST"])
@jwt_required()
def delete_department(id):
    department = Department.query.get(id)
    if department is None:
        return jsonify(error="Invalid department ID"), 404

    db.session.delete(department)
    db.session.commit()
    return jsonify(success=True)

