from flask import Blueprint, request, jsonify
from models import db, User
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    try:
        user = User.query.get(id)
        if user:
            return jsonify(user.to_dict()), 200
        return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.json
        
        # Basic validation
        if not data.get('Username') or not data.get('Email'):
            return jsonify({"error": "Username and Email are required"}), 400
        
        # Check if email exists
        existing_user = User.query.filter_by(Email=data['Email']).first()
        if existing_user:
            return jsonify({"error": "Email already exists"}), 400
            
        doj = data.get('DateOfJoining')
        if doj:
            doj = datetime.strptime(doj, '%Y-%m-%d').date()
            
        new_user = User(
            Username=data['Username'],
            Email=data['Email'],
            PhoneNumber=data.get('PhoneNumber'),
            Department=data.get('Department'),
            Salary=data.get('Salary'),
            Address=data.get('Address'),
            DateOfJoining=doj,
            Status=data.get('Status', 'Active')
        )
        
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        user = User.query.get(id)
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        data = request.json
        user.Username = data.get('Username', user.Username)
        user.Email = data.get('Email', user.Email)
        user.PhoneNumber = data.get('PhoneNumber', user.PhoneNumber)
        user.Department = data.get('Department', user.Department)
        user.Salary = data.get('Salary', user.Salary)
        user.Address = data.get('Address', user.Address)
        
        doj = data.get('DateOfJoining')
        if doj:
            user.DateOfJoining = datetime.strptime(doj, '%Y-%m-%d').date()
            
        user.Status = data.get('Status', user.Status)
        
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.get(id)
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
