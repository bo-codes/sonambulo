from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Comment
from app.forms.comment_form import UpdateCommentForm, AddCommentForm
import datetime


comment_routes = Blueprint("comments", __name__)

#-------------------------COMMENT VALIDATIONS------------------

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#-------------------------GET ALL COMMENTS FOR ONE POST----------------------

@comment_routes.route("/post/<int:id>")
def get_post_comments(id):
    comments = Comment.query.filter(Comment.post_id == id).all()
    return { "Comments": [comment.to_dict() for comment in comments] }

#-------------------------ADD ONE COMMENT---------------------

@comment_routes.route("", methods=["POST"])
# @login_required
def add_comment():
    form = AddCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=form.data["user_id"],
            post_id=form.data["post_id"],
            content=form.data["content"],
            created_at=datetime.datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
#-------------------------GET ONE COMMENT----------------------
@comment_routes.route('/<int:id>', methods=['GET'])
def get_one_comment(id):
    comments = Comment.query.filter(Comment.id == id).all()
    return { "Comments": [comment.to_dict() for comment in comments] }

#-------------------------UPDATE ONE COMMENT-------------------
@comment_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def update_one_comment(id):
    form = UpdateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_comment = Comment.query.get(id)
        current_comment.user_id=form.data['user_id'],
        current_comment.post_id=form.data['post_id'],
        current_comment.content=form.data['content'],

        db.session.commit()
        print(form.data)
        return current_comment.to_dict()
    return {'errors': "ERROR!!!!!!!"}, 401

#-------------------------DELETE ONE COMMENT-------------------
@comment_routes.route("/<int:id>", methods=["DELETE"])
# @login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {"message": "Sucessfully Deleted."}

#-----------------------GET ALL COMMENT-----------------------
@comment_routes.route("/all")
def get_all_comments():
    comments = Comment.query.all()
    return { "Comments": [comment.to_dict() for comment in comments] }
