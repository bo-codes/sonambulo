from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextField
from wtforms.validators import DataRequired, Email, ValidationError, regexp

def comment_length(form, field):
    comment = field.data
    if len(comment) >= 444:
        raise ValidationError('Comment must be less than 444 characters.')
    if len(comment) <= 0:
        raise ValidationError('Please provide comment.')

class AddCommentForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    post_id = IntegerField("post_id", validators=[DataRequired()])
    content = TextField("content", validators=[comment_length])



class UpdateCommentForm(FlaskForm):
    id = IntegerField("id")
    user_id = IntegerField("user_id", validators=[DataRequired()])
    post_id = IntegerField("post_id", validators=[DataRequired()])
    content = TextField("content", validators=[comment_length])
