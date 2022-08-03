import re
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, FloatField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, regexp
# from app.models import Post


# def name_length(form, field):
#     name = field.data
#     if len(name) > 100:
#         raise ValidationError('Name must be less than 100 characters.')


class PostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    image = StringField(
        'image')
    caption = TextAreaField('caption')
    created_at = StringField('created_at', validators=[DataRequired()])



class EditPostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    image = StringField(
        'image')
    caption = TextAreaField('caption')
    created_at = StringField('created_at', validators=[DataRequired()])
