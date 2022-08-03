from .db import db

class Post_Tag(db.Model):
    __tablename__ = "post_tags"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("postes.id"), nullable=False)
    tag = db.Column(db.Text, nullable=False)

    post = db.relationship("Posts", back_populates="post_tags")
    user = db.relationship("User", back_populates="post_tags")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.business_id,
            "tag": self.tag
        }
