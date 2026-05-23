from . import main  # import blueprint 'main' from __init__.py
from flask import render_template


@main.route('/')
def home():
    return render_template('index.html')

