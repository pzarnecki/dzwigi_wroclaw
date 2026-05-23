from flask import Blueprint, render_template, request, current_app
from models import Dzwigi, db
from werkzeug.utils import secure_filename
import os


# Tworzymy blueprint
main = Blueprint('main', __name__)

# Strona główna
@main.route('/')
def home_page():
    page = request.args.get('page', 1, type=int)
    dzwigi, total = Dzwigi.get_paginated(page)
    total_pages = (total // 3) + (1 if total % 3 > 0 else 0)
    has_next = total_pages > page
    has_prev = page > 1
    return render_template(
        'index.html',
        dzwigi=dzwigi,
        has_next=has_next,
        has_prev=has_prev,
        page=page,
        total_pages=total_pages
    )

# Endpoint do obsługi przesyłania plików
# @main.route('/handle_upload', methods=['POST'])
# def handle_upload():
#     file = request.files['file']
#     filename = secure_filename(file.filename)
#     path = os.path.join(current_app.config['UPLOADED_PATH'], filename)
#     file.save(path)
#
#     new_dzwig = Dzwigi(name=request.form['name'],
#                        image_path=path if filename.endswith(('.png', '.jpg', '.jpeg')) else None,
#                        pdf_file=path if filename.endswith('.pdf') else None,
#                        param1=request.form['param1'],
#                        param2=request.form['param2'])
#
#     db.session.add(new_dzwig)
#     db.session.commit()
