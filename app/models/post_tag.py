from .db import db

class Post_Tag(db.Model):
    __tablename__ = "post_tags"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), nullable=False)

    post = db.relationship("Post", back_populates='post_tags')
    tag = db.relationship("Tag", back_populates='post_tags')

    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "tag": self.tag
        }
