from secrets import choice
from app.models import db
from app.models.comment import Comment
import datetime
import random


def seed_comments():

    comment1 = Comment(
        user_id=1,
        post_id=1,
        content='comment1 moment',
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
    )

    comment2 = Comment(
        user_id=3,
        post_id=1,
        content='comment2 moment',
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
        )

    comment3 = Comment(
        user_id=1,
        post_id=2,
        content='comment3 moment',
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    comment4 = Comment(
        user_id=2,
        post_id=2,
        content='comment4 moment',
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
