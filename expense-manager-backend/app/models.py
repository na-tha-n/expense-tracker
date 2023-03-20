import enum
from datetime import datetime

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

from app import db

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)

    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    company = db.relationship('Company',
        backref=db.backref('users', lazy=True))
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'))
    department = db.relationship('Department',
        backref=db.backref('users', lazy=True))
    expenses = db.relationship('Expense',
        backref=db.backref('user', lazy=True),
        order_by="Expense.created_date")

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return '<User %r %r' % (self.first_name, self.last_name)

class Company(db.Model):
    __tablename__ = 'company'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    description = db.Column(db.String(256))

    def __repr__(self):
        return '<Company %r>' % self.name

class Department(db.Model):
    __tablename__ = 'department'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    description = db.Column(db.String(256))

    company_id = db.Column(db.Integer, db.ForeignKey('company.id'),nullable=False)
    company = db.relationship('Company',
        backref=db.backref('departments', lazy=True))

    def __repr__(self):
        return '<Department %r>' % self.name

class StatusType(enum.Enum):
    DRAFT = 'Draft'
    SUBMITTED = 'Submitted'
    INREVIEW = 'In Review'
    APPROVED = 'Approved'
    REJECTED = 'Rejected'

class Expense(db.Model):
    __tablename__ = 'expense'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(256))
    vendor = db.Column(db.String(64))
    total = db.Column(db.Integer)
    status = db.Column(db.Enum(StatusType), default=StatusType.DRAFT)
    receipt = db.Column(db.LargeBinary)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    modified_date = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('expense_category.id'))
    category = db.relationship('ExpenseCategory')

    def __repr__(self):
        return '<Expense %r>' % self.title

class ExpenseItem(db.Model):
    __tablename__ = 'expense_item'

    id = db.Column(db.Integer, primary_key=True)    
    name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(256))
    amount = db.Column(db.Integer, nullable=False)

    expense_id = db.Column(db.Integer, db.ForeignKey('expense.id'),nullable=False)
    expense = db.relationship('Expense',
        backref=db.backref('items'))

    def __repr__(self):
        return '<ExpenseItem %r>' % self.name

class ExpenseCategory(db.Model):
    __tablename__ = 'expense_category'

    id = db.Column(db.Integer, primary_key=True)    
    name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(256))

    def __repr__(self):
        return '<ExpenseCategory %r>' % self.name

class Report(db.Model):
    __tablename__ = 'report'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(256))
    excel = db.Column(db.LargeBinary)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)

#TODO
# class Permission(db.Model):
#     __tablename__ = 'permission'
#
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(64), nullable=False)
#     description = db.Column(db.String(256))
#
#     userPermission = db.Table('userPermission',db.Model.metadata,
#         db.Column('user_id', db.ForeignKey('user.id')),
#         db.Column('permission_id', db.ForeignKey('permission.id')),
#     )

