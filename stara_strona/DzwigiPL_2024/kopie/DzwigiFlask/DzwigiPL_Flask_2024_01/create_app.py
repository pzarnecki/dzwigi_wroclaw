import os
from flask import Flask
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_dropzone import Dropzone

from models import db, Dzwigi
from main.routes import main


def create_app():
    app = Flask(__name__)

    dropzone = Dropzone(app)

    app.config.update(
        DROPZONE_ALLOWED_FILE_CUSTOM=True,
        DROPZONE_ALLOWED_FILE_TYPE='image/*, .pdf',
        DROPZONE_MAX_FILE_SIZE=3,
        DROPZONE_MAX_FILES=30,
        DROPZONE_UPLOAD_ON_CLICK=True,
        DROPZONE_UPLOAD_ACTION='handle_upload',  # URL or endpoint
        DROPZONE_UPLOAD_MULTIPLE=True,
    )

    app.secret_key = 'tajny_klucz'
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "mydatabase.db")

    db.init_app(app)

    with app.app_context():
        db.create_all()

    admin = Admin(app, template_mode='bootstrap3', url='/operator_dzwigu')
    admin.add_view(ModelView(Dzwigi, db.session))

    app.register_blueprint(main)

    return app
