from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextField
from wtforms.validators import DataRequired, Email, ValidationError, regexp

class AddPostTagForm(FlaskForm):
  post_id = IntegerField("post_id", validators=[DataRequired()])
  tag = TextField("tag", validators=[DataRequired()])
