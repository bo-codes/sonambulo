from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextField
from wtforms.validators import DataRequired, Email, ValidationError, regexp

def tag_length(form, field):
    tag = field.data
    if len(tag) >= 20:
        raise ValidationError('Tag must be less than 20 characters.')
    if len(tag) <= 0:
        raise ValidationError('Please provide Tag.')

class AddTagForm(FlaskForm):
    tag = TextField("tag", validators=[tag_length])
