from app.forms.signup_form import profile_picture
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', name='demo gorgon', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', name='marnold schwarznegger', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', name='bobbie bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
