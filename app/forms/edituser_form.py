from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email


class EditUserForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    avatar = StringField('avatar', validators=[DataRequired()])
