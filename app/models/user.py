from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy import DateTime
# from .post import user_posts
from .follow import follows
from .like import likes

class User(db.Model, UserMixin):

    user_likes = db.relationship("Post",
            secondary=likes,
            back_populates="post_likes",
            cascade="all, delete"
    )

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


    comments = db.relationship('Comment', back_populates='user')
    posts = db.relationship('Post', back_populates='user', cascade='all, delete', passive_deletes=True)
    user_likes = db.relationship("Post",
            secondary=likes,
            back_populates="post_likes",
            cascade="all, delete"
    )

    followed = db.relationship(
        'User', secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref('follows', lazy='dynamic'), lazy='dynamic')



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'email': self.email,
    #         'username': self.username,
    #         'created_at': self.created_at,
    #     }

    def to_dict_short(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'created_at': self.created_at,
        }
