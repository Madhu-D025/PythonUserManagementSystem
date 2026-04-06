from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'Users'

    Id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Username = db.Column(db.String(100), nullable=False)
    Email = db.Column(db.String(120), unique=True, nullable=False)
    PhoneNumber = db.Column(db.String(20), nullable=True)
    Department = db.Column(db.String(50), nullable=True)
    Salary = db.Column(db.Float, nullable=True)
    Address = db.Column(db.String(255), nullable=True)
    DateOfJoining = db.Column(db.Date, nullable=True)
    Status = db.Column(db.String(20), default="Active")

    def to_dict(self):
        return {
            "Id": self.Id,
            "Username": self.Username,
            "Email": self.Email,
            "PhoneNumber": self.PhoneNumber,
            "Department": self.Department,
            "Salary": self.Salary,
            "Address": self.Address,
            "DateOfJoining": self.DateOfJoining.isoformat() if self.DateOfJoining else None,
            "Status": self.Status
        }
