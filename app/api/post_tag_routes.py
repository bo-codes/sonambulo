from flask import Blueprint, jsonify, request
from app.models import db, Event
from app.models.post_tag import Post_Tag
from flask_login import login_required

post_tag_routes = Blueprint('post_tags', __name__)


#-----------------------GET ALL POSTTAGS-----------------------
@post_tag_routes.route("/all")
def get_all_post_tags():
    post_tags = Post_Tag.query.all()
    return { "post_tags": [post_tag.to_dict() for post_tag in post_tags] }


@post_tag_routes.route('/create', methods=['POST'])
@login_required
def generate_post_tag():
    data = request.json
    # pulling the events from the body by keying into the data
    post_tag = Post_Tag(
        user_id = data['user_id'],
        event_id = data['event_id'],
    )


    # # checking if there is already a bookmark for the event for that user and if there is, return so you dont make anything new
    # event = Bookmark.query.filter(bookmark.event_id == data.event_id and bookmark.user_id == data.user_id)
    # if event:
    #     return {"message": "already bookmarked"}, 401

    db.session.add(post_tag) #adding the post_tag
    db.session.commit() #commiting it to the database
    return post_tag.to_dict()

@post_tag_routes.route('/<int:postId>')
@login_required
def load_post_tags(postId):
    post_tags = Post_Tag.query.filter(Post_Tag.post_id == postId)
    return {'post_tags': [post_tag.to_dict() for post_tag in post_tags]}

# @post_tag_routes.route("/<int:postId>")
# def get_all_post_tags(postId):
#     post_tags = Post_Tag.query.filter_by(Post_Tag.post_id == postId)
#     return { "PostTags": [post_tag.to_dict() for post_tag in post_tags] }


@post_tag_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post_tag = Post_Tag.query.filter(Post_Tag.id == id)
    post_tag.delete()
    db.session.commit()
    return {'id': id}
