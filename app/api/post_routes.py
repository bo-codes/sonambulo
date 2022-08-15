from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Post, db
from app.forms.newPost_form import PostForm, EditPostForm
import datetime


post_routes = Blueprint('posts', __name__)

# ----------- VALIDATION ----------- vv#
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
# ----------- VALIDATION ----------- ^^#
#
#
# ----------- GET POSTS ----------- vv#
@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    data = [post.to_dict() for post in posts]
    print("\n\n\n", data, "\n\n\n", "DATAAAAAAAA")
    return {'posts': data}
# ----------- GET POSTS ----------- ^^#
#
#
# ----------- CREATE POST ----------- vv#
@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        post = Post(
            user_id=form.data['user_id'],
            image_url=form.data['image'],
            caption=form.data['caption'],
            created_at=datetime.datetime.now()
        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
# ----------- CREATE POST ----------- ^^#
#
#
# ----------- UPDATE POST ----------- vv#
@post_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_post(id):
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        if post.user_id != form.data['user_id']:
            return {'errors': "You don't own this post"}, 401

        post.user_id = form.data['user_id'],
        post.image_url = form.data['image'],
        post.caption = form.data['caption'],
        post.created_at=datetime.datetime.now()

        db.session.commit()
        return post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
# ----------- UPDATE POST ----------- ^^#
#
#
# ----------- DELETE POST ----------- vv#
@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.filter(Post.id == id)
    post.delete()
    db.session.commit()
    return {'message': 'Post deleted'}
# ----------- DELETE POST ----------- ^^#
#
#
# ----------- LIKE POST ----------- vv#
@post_routes.route('/<id>/like', methods=['PUT'])
@login_required
def like_post(id):
    post = Post.query.get(id)
    post.like_post(current_user)
    db.session.commit()
    return post.to_dict()
# ----------- LIKE POST ----------- ^^#
#
#
# ----------- LIKE POST ----------- vv#
@post_routes.route('/<id>/unlike', methods=['PUT'])
@login_required
def unlike_post(id):
    post = Post.query.get(id)
    post.unlike_post(current_user)
    db.session.commit()
    return post.to_dict()
# ----------- LIKE POST ----------- ^^#
