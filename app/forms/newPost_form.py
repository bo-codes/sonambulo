import re
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, FloatField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, regexp
# from app.models import Post


def caption_length(form, field):
    caption = field.data
    if len(caption) >= 4000:
        raise ValidationError('Caption must be less than 4000 characters.')

def caption_required(form, field):
    caption = field.data
    if len(caption) <= 0:
        raise ValidationError('Caption required.')


class PostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    image = StringField(
        'image')
    caption = TextAreaField('caption', validators=[caption_required, caption_length])



class EditPostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    image = StringField(
        'image')
    caption = TextAreaField('caption', validators=[caption_required, caption_length])
