from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextField
from wtforms.validators import DataRequired

class AddCommentForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    post_id = IntegerField("post_id", validators=[DataRequired()])
    content = TextField("content", validators=[DataRequired()])
    created_at = StringField("created_at", validators=[DataRequired()])


class UpdateCommentForm(FlaskForm):
    id = IntegerField("id")
    user_id = IntegerField("user_id", validators=[DataRequired()])
    post_id = IntegerField("post_id", validators=[DataRequired()])
    content = TextField("content", validators=[DataRequired()])
    created_at = StringField("created_at", validators=[DataRequired()])
