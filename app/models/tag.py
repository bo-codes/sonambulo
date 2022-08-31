from unicodedata import category
from .db import db


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.Integer, nullable=False)

    posts = db.relationship('Post', secondary='post_tags')

    def to_dict(self):
        return {
            'id': self.id,
            'tag': self.tag,
        }
