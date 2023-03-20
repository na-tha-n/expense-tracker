from flask import jsonify, request

from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required

from app import db, jwt
from app.api import bp
from app.models import Company, User, Expense, Department

from datetime import datetime
from dateutil.relativedelta import relativedelta

def user_serialize(self):
    if self.department is not None:
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_date': self.created_date,
            'company_id': self.company_id,
            'department': self.department.name
        }
    else:
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_date': self.created_date,
            'company_id': self.company_id,
        }


#Method to create a company
@bp.route("/company/add", methods=["POST"])
@jwt_required()
def add_company():
    name = request.json.get("name", None)
    description = request.json.get("description", None)
    user_id = request.json.get("userId", None)

    company = Company.query.filter_by(name=name).one_or_none()
    if company is None:
        #add company
        company  = Company(name=name, description=description)
        print(company.description)
        db.session.add(company)
        db.session.commit()
        #retrieve the assigned company id
        company = Company.query.filter_by(name=name).one_or_none()
        company_id = company.id
        #add the company_id to the user_id
        user = User.query.get(user_id)
        if user is None:
            return jsonify(error="Invalid User ID"), 404
        user.company_id = company_id
        db.session.commit()
        return jsonify(success=True, company_id = company_id)
    return jsonify(error="Duplicated Company"), 401

#Method to get all users from a company
@bp.route("/company/<id>/users", methods=["GET"])
@jwt_required()
def get_company(id):
    users = User.query.filter_by(company_id=id).all()
    return jsonify([user_serialize(user) for user in users])

#Method to get all  expenses from all users from a company
def all_expense_serialize(record):
    user_name= record.User.first_name +' '+ record.User.last_name
    return {
        'id': record.Expense.id,
        'total':record.Expense.total,
        'title':record.Expense.title,
        'created_date': record.Expense.created_date,
        'status': record.Expense.status.value,
        'user_name': user_name,
    }

@bp.route("/company/<id>/expenses", methods=["GET"])
@jwt_required()
def get_company_all_expense(id):
    allexpense = db.session.query(Expense,User).join(User).filter(User.company_id == id).group_by(Expense.id).all()
    allexpense_list=[]
    for e in allexpense:
        allexpense_list.append(all_expense_serialize(e))
    if allexpense:
        return jsonify(allexpense_list)
    else:
        return jsonify(error="Not Found"), 404

#get all pending expenses in from all users  in a company
def all_expense_serialize(record):
    user_name= record.User.first_name +' '+ record.User.last_name
    return {
        'id': record.Expense.id,
        'user_name': user_name,
        'title':record.Expense.title,
        'total':record.Expense.total,
        'created_date': record.Expense.created_date,
        'status': record.Expense.status.value
    }

@bp.route("/company/<id>/expenses/pending", methods=["GET"])
@jwt_required()
def get_company_all_pending_expense(id):
    allexpense = db.session.query(Expense,User).join(User).filter(User.company_id == id, Expense.status=='APPROVED').group_by(Expense.id).all()
    allexpense_list=[]
    for e in allexpense:
        allexpense_list.append(all_expense_serialize(e))
    if allexpense:
        return jsonify(allexpense_list)
    else:
        return "Not Found"

#Get All Expense Totals by Month in a company
@bp.route("/company/<id>/expenses/totals/<date>", methods=["GET"])
@jwt_required()
def get_company_total_monthly_expense(id, date):
    current = datetime.now()
    current_month = current.month
    current_year = current.year
    monthly_total_list =[]
    #compute total for each month from the  current date in 6 months
    for i in range(6):
        #compute time frame ex: Oct 2021 start from 10/1 00:00 to 11/1 00:00
        current_month_endtime = datetime((datetime(current_year,current_month,1) + relativedelta(months=1)).year,\
                                                (datetime(current_year,current_month,1) + relativedelta(months=1)).month,1)
        current_month_starttime=datetime((current_month_endtime-relativedelta(months=1)).year,\
                                                (current_month_endtime - relativedelta(months=1)).month,1)
        current_month_year_toString = current_month_starttime.strftime("%b %Y")

        #Query all expenses from all users in a company in that month status APPROVED
        allexpense = db.session.query(Expense,User).join(User).filter(User.company_id == id, Expense.status=='APPROVED',\
                                                            Expense.created_date>= current_month_starttime,\
                                                            Expense.created_date<= current_month_endtime)\
                                                            .group_by(Expense.id).all()
        #Compute total expense for a month, put in a dictionany, put dictionary in a list
        monthly_total = 0
        for e in allexpense:
            monthly_total += e.Expense.total
        #print(monthly_total)
        #print(current_month_year_toString)
        monthly_total_Dict = {'month': current_month_year_toString, 'amount': monthly_total}
        monthly_total_list.insert(0,monthly_total_Dict)
        if current_month==1:
            current_month = 12
            current_year-=1
        else: current_month -= 1
    #print(monthly_total_list)
    return jsonify(monthly_total_list)

#get company
@bp.route("/company/<id>/info", methods=["GET"])
def get_company_info(id):
    company = Company.query.get(id)
    if company is None:
        return jsonify(error="Invalid company ID"), 404

    return jsonify(
        id=company.id,
        name=company.name,
        description=company.description,
    )
