from flask import Blueprint, jsonify, request
from app.models import db, Post
from app.models.like import Like
from flask_login import login_required

like_routes = Blueprint('likes', __name__)

@like_routes.route('/create', methods=['POST'])
@login_required
def generate_like():
    data = request.json
    # pulling the posts from the body by keying into the data
    like = Like(
        user_id = data['user_id'],
        post_id = data['post_id'],
    )


    # # checking if there is already a like for the post for that user and if there is, return so you dont make anything new
    # post = like.query.filter(like.post_id == data.post_id and like.user_id == data.user_id)
    # if post:
    #     return {"message": "already likeed"}, 401

    db.session.add(like) #adding the like
    db.session.commit() #commiting it to the database
    return like.to_dict()

@like_routes.route('/')
# @login_required
def load_likes():
    likes = Like.query.all()
    print("\n\n\n\n IN THE LIKE ROUTE \n\n\n\n")
    return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_like(id):
    like = Like.query.filter(Like.id == id)
    like.delete()
    db.session.commit()
    return {'id': id}
