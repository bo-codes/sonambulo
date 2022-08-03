from flask import Blueprint
from app.models.tag import Tag

tag_routes=Blueprint("tag", __name__)

@tag_routes.route("")
def get_all_tags():
    tags = Tag.query.all()
    return { "Tags": [tag.to_dict() for tag in tags] }
