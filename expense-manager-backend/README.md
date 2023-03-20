# Express Expense Manager Backend

[![CI](https://github.com/cs160-expense-manager/expense-manager-backend/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/cs160-expense-manager/expense-manager-backend/actions/workflows/ci.yml)

## Usage

### Start a Python 3 virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.local.txt
```

### Initialize the database (SQLite)

```bash
flask db upgrade
```

### Run the server

```bash
python server.py
```

### Run unit tests

```bash
pytest
```

[//]: <> (This is project is awesome.)
