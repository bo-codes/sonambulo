from app.models import db, Tag


# Adds a demo user, you can add other users here if you want
def seed_tags():
    bo = Tag(
        Category='Demo',)
    bobo = Tag(
        Category='Domo')
    bobus = Tag(
        Category='Bomo')

    db.session.add(bo)
    db.session.add(bobo)
    db.session.add(bobus)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
