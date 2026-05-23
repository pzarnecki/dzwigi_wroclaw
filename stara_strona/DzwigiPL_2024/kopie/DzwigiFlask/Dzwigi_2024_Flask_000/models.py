from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Dzwigi(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    image_path = db.Column(db.String(256))
    param1 = db.Column(db.String(256))
    param2 = db.Column(db.String(256))
    pdf_file = db.Column(db.String(256))
