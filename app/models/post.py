from sqlalchemy import ForeignKey
from .like import Like
from .db import db
from sqlalchemy import DateTime
from sqlalchemy.sql import func


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
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())

    comments = db.relationship(
        'Comment', back_populates='post', cascade='all, delete-orphan', passive_deletes=True)
    likes = db.relationship("Like",
            back_populates="post",
            cascade='all, delete-orphan', passive_deletes=True
    )
    user = db.relationship(
        'User', back_populates='posts', lazy='subquery')
    tags = db.relationship(
        'Tag', secondary=post_tags, back_populates='posts')
    post_tags = db.relationship('Post_Tag', back_populates='posts', cascade='all, delete-orphan', passive_deletes=True)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'caption': self.caption,
            'created_at': self.created_at,
            'user': self.user.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': [like.to_dict() for like in self.likes],
        }
