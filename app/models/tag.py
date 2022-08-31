from unicodedata import category
from .db import db
from .post import post_tags


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.Integer, nullable=False)

    posts = db.relationship('Post', secondary=post_tags, back_populates='tags')
    post_tags = db.relationship('Post_Tag', back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'tag': self.tag,
        }
