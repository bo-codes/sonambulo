from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Post, User, follows, db
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
    # print("\n\n\n", data, "\n\n\n", "DATAAAAAAAA")
    return {'posts': data}
# ----------- GET POSTS ----------- ^^#
#
#
# ----------- GET ONE POST ----------- vv#
@post_routes.route('/<int:postId>')
def get_one_post(postId):
    posts = Post.query.filter(Post.id == postId)
    data = [post.to_dict() for post in posts]
    # print("\n\n\n", data, "\n\n\n", "DATAAAAAAAA")
    print("\n\n\n\n",data, "\n\n\n\n")
    return {'post': data}
# ----------- GET ONE POST ----------- ^^#
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


# ----------- GET SELF POSTS ----------- vv#
@post_routes.route('/<username>')
@login_required
def get_user_posts(username):
    user = User.query.filter_by(username=username).first()
    posts = user.posts
    data = [post.to_dict() for post in posts]
    return {'posts': data}
# ----------- GET SELF POSTS ----------- ^^#


# ----------- GET FOLLOWED POSTS ----------- vv#
@post_routes.route('/feed/<int:userId>')
@login_required
def feed_posts(userId):
    posts = Post.query.join(follows, (follows.c.followed_id == Post.user_id)).filter(follows.c.follower_id == userId)
    data = [post.to_dict() for post in posts]
    return {'posts': data}
# ----------- GET FOLLOWED POSTS ----------- ^^#
