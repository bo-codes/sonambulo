from sqlalchemy import ForeignKey
from .db import db

user_posts = db.Table(
    'user_posts',
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True
    ),
    db.Column(
        'post_id',
        db.Integer,
        db.ForeignKey('posts.id'),
        primary_key=True
    )
)

post_tags = db.Table(
    'post_tags',
    db.Column(
        'tag_id',
        db.Integer,
        db.ForeignKey('tags.id'),
        primary_key=True
    ),
    db.Column(
        'post_id',
        db.Integer,
        db.ForeignKey('posts.id'),
        primary_key=True
    )
)


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id',  ondelete="CASCADE"), nullable=False)
    image_url = db.Column(db.String(255))
    caption = db.Column(db.Text)
    created_at = db.Column(db.DateTime)

    comments = db.relationship(
        'Comment', back_populates='post', cascade='all, delete-orphan', passive_deletes=True)
    likes = db.relationship(
        'Like', back_populates='post', cascade='all, delete-orphan', passive_deletes=True)
    users = db.relationship(
        'User', secondary=user_posts, back_populates='posts')
    tags = db.relationship(
        'Tag', secondary=post_tags, back_populates='posts')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'caption': self.caption,
            'created_at': self.created_at,
        }
