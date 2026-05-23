# importy
import os
import uuid
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_admin.form.upload import FileUploadField
from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin

# inicjalizacja db i admina
db = SQLAlchemy()
admin = Admin(name='panel')


# definiujeme modele
class Dzwigi(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    param1 = db.Column(db.String(256))
    param2 = db.Column(db.String(256))
    image_path = db.Column(db.String(256))
    pdf_file = db.Column(db.String(256))

    @staticmethod
    def get_paginated(page=1, per_page=3):
        """Return paginated query results"""
        offset = (page - 1) * per_page
        dzwigi = Dzwigi.query.order_by(desc(Dzwigi.id)).offset(offset).limit(per_page).all()
        total = db.session.query(Dzwigi).count()
        return dzwigi, total


# Funkcja generująca nazwy plików z prefiksem
def prefix_name(obj, file_data):
    prefix = 'my_prefix_'
    ext = os.path.splitext(file_data.filename)[1]  # get file extension
    return prefix + str(uuid.uuid4()) + ext


# panel administracyjny
class DzwigiModelView(ModelView):
    form_overrides = {
        'image_path': FileUploadField,
        'pdf_file': FileUploadField
    }

    form_args = {
        'image_path': {
            'label': 'Image File',
            'base_path': '/myproject/images/',  # Wymagane. Katalog, do którego będą przesyłane pliki
            'namegen': prefix_name,
            'allow_overwrite': False  # Opcjonalne. Czy użytkownik może nadpisać plik o tej samej nazwie?
        },
        'pdf_file': {
            'label': 'PDF File',
            'base_path': '/myproject/pdf/',  # Wymagane. Katalog, do którego będą przesyłane pliki
            'namegen': prefix_name,
            'allow_overwrite': False  # Opcjonalne. Czy użytkownik może nadpisać plik o tej samej nazwie?
        }
    }


admin.add_view(DzwigiModelView(Dzwigi, db.session))  # Dodaj model Dzwigi do panelu admina
