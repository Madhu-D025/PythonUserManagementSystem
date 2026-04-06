# User Management Dashboard

A simple full-stack User Management Dashboard with CRUD operations built using React, Tailwind CSS, Flask, and SQL Server via SQLAlchemy.

## Features
- Complete CRUD operations (Create, Read, Update, Delete) on users.
- Clean and responsive dashboard UI built with Tailwind CSS.
- REST API implemented in Python/Flask.
- Beginner-friendly, minimalistic architecture without unnecessary abstractions.

## Project Structure
- `/frontend` - React Vite application
- `/backend` - Python Flask Application

---

## Setup & Running the Application

### 1. Database Setup (SQL Server)
The application assumes you have a local SQL Server running at `DESKTOP-AF2MUVU\SQLEXPRESS`.
It connects using **Windows Authentication** (`Trusted_Connection=yes`) to the database named `UserManagementDB`.
Ensure that the `UserManagementDB` database exists on that SQL Server instance. The application will automatically create the `Users` table inside it on startup when you run the backend.

### 2. Backend Setup
Navigate to the `backend` directory:
```bash
Install dependencies using pip. We will force PIP to use the precompiled binary wheel for `pyodbc` to avoid the "Visual C++ 14.0 is required" error:
```powershell
python -m venv venv
.\venv\Scripts\activate
pip install --only-binary pyodbc pyodbc
pip install -r requirements.txt
```
Run the application (runs on http://127.0.0.1:5000):
```bash
python app.py
```

### 3. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```

## API Endpoints Summary

- `GET /api/users`: Get all users
- `GET /api/users/<id>`: Get single user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/<id>`: Update an existing user
- `DELETE /api/users/<id>`: Delete a user by ID
