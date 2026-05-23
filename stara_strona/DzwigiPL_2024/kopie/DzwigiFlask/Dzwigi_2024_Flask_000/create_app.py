from flask import Flask
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, Dzwigi
import os
from main import main as main_blueprint
from werkzeug.utils import secure_filename
from flask_admin.form.upload import FileUploadField


class CustomModelView(ModelView):
    form_overrides = {
        'image_path': FileUploadField,
        'pdf_file': FileUploadField
    }

    def on_model_change(self, form, model, is_created):
        if form.image_path.data:
            model.image_path = save_file(form.image_path.data)
        if form.pdf_file.data:
            model.pdf_file = save_file(form.pdf_file.data)


def save_file(file, folder='uploads'):
    filename = secure_filename(file.filename)
    file.save(os.path.join(folder, filename))
    return os.path.join(folder, filename)


def create_app():
    app = Flask(__name__)
    app.register_blueprint(main_blueprint)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                                                        'database.db')

    db.init_app(app)

    with app.app_context():
        db.create_all()

    admin = Admin(app, name='Panel admina', template_mode='bootstrap3')
    admin.add_view(CustomModelView(Dzwigi, db.session))

    return app



# from flask import Flask
# from flask_admin import Admin
# from flask_admin.contrib.sqla import ModelView
# from flask_admin.contrib.fileadmin import FileAdmin
# from models import db, Dzwigi
# import os
# from main import main as main_blueprint
#
#
# def create_app():
#     app = Flask(__name__)
#     app.register_blueprint(main_blueprint)
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.dirname(os.path.abspath(__file__)),
#                                                                         'database.db')
#
#     db.init_app(app)
#
#     with app.app_context():
#         db.create_all()
#
#     admin = Admin(app, name='Panel admina', template_mode='bootstrap3')
#     admin.add_view(ModelView(Dzwigi, db.session))
#
#     # Utwórz instancję widoku FileAdmin
#     path = os.path.join(os.path.dirname(__file__), 'static')
#     admin.add_view(FileAdmin(path, '/static/', name='Pliki statyczne'))
#
#     return app









# from flask import Flask
# from flask_admin import Admin
# from flask_admin.contrib.sqla import ModelView
# from models import db, Dzwigi  # importuj model Dzwigi tutaj
# import os
# from main import main as main_blueprint
#
#
# def create_app():
#     app = Flask(__name__)
#     app.register_blueprint(main_blueprint)
#     # Ustaw ścieżkę do bazy danych
#     # Baza danych SQLite będzie znajdować się bezpośrednio w folderze projektu
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.dirname(os.path.abspath(__file__)),
#                                                                         'database.db')
#
#     # Inicjalizuj SQLAlchemy z tą aplikacją
#     db.init_app(app)
#
#     with app.app_context():
#         # Stwórz tabele w bazie danych
#         db.create_all()
#
#     # Utwórz instancję admina
#     admin = Admin(app, name='Panel admina', template_mode='bootstrap3')
#
#     # Dodaj model do instancji admina
#     admin.add_view(ModelView(Dzwigi, db.session))
#
#     return app
