from flask import Blueprint, redirect, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Post, db
from app.forms.newPost_form import PostForm, EditPostForm
import datetime
# from datetime import timezone

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:id>/')
def get_post(id):
    post = Post.query.get(id)
    if not post.to_dict:
        return {"errors": "Post Not Found!"}, 404
    else:
        return {"post": post.to_dict()}


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


@post_routes.route('/:id', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.filter(Post.id == id)
    post.delete()
    db.session.commit()
    return {'message': 'Post deleted'}
