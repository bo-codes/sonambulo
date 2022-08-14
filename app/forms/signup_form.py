from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

# def email_required(form, field):
#     email = field.data
#     if len(email) <= 0:
#         raise ValidationError('Please enter a valid email.')

def email_length(form, field):
    email = field.data
    if len(email) >= 75:
        raise ValidationError('Email must be less than 75 characters.')

def email_validate(form, field):
    email = field.data
    if (not re.fullmatch('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}', email)):
        raise ValidationError('Please enter a valid email.')

def username_required(form, field):
    user = field.data
    if len(user) <= 0:
        raise ValidationError('Please choose a username.')

def username_length(form, field):
    username = field.data
    if len(username) >= 50:
        raise ValidationError('Username must be less than 50 characters.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

# def password_required(form, field):
#     password = field.data
#     if len(password) <= 0:
#         raise ValidationError('Password field is empty.')

def password_match(form, field):
    password = form.data['password']
    confirmPassword = form.data['confirmPassword']
    if (password != confirmPassword):
        raise ValidationError('Password fields must match.')

def password_validate(form, field):
    password = field.data
    if(not re.fullmatch('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$', password)):
        raise ValidationError('Password must be a minimum of 8 characters and contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[ username_exists, username_length, username_required])
    email = StringField('email', validators=[ email_validate, user_exists])
    password = StringField('password', validators=[ password_validate])
    confirmPassword = StringField('confirmPassword', validators=[ password_match])
