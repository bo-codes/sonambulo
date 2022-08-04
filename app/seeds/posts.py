from secrets import choice
from app.models import db
from app.models.post import Post
import datetime
import random


def seed_posts():

    reallycoolsuperbigbouncyparty = Post(
        user_id=1,
        image_url='https://img.freepik.com/free-vector/silhouette-crowd-party-people-starburst-background_1048-13832.jpg',
        caption="The coolest, most awesome, super big bounty party the world has ever seen",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
    )

    bumpbappers = Post(
        user_id=3,
        image_url='https://img.freepik.com/premium-photo/people-concert_31965-3617.jpg',
        caption="Mega huge house party! Come on through and have some fun!",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
        )

    discodunkers = Post(
        user_id=1,
        image_url='https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg',
        caption="We will be dunking some maybe disco. Its going be a blast. Let the world know. We are going to bring this disco to all the dunkers world wide",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    tomsbbq = Post(
        user_id=2,
        image_url='https://simpleseasonal.com/wp-content/uploads/2018/08/shutterstock_279093950.jpg',
        caption="Come on down to Tom's BBQ!",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    chrisandallison = Post(
        user_id=2,
        image_url='https://i.insider.com/5eac8da748d92c3d275bb2de?width=700',
        caption="Chris and Allison and getting married! Come share this special moment in our lives with us!",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    tysegallfilmore = Post(
        user_id=2,
        image_url='https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg',
        caption="Ty Segall playing live at the Filmore",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    runningforfun = Post(
        user_id=2,
        image_url='https://upload.wikimedia.org/wikipedia/commons/a/a3/Ludovic_and_Lauren_%288425515069%29.jpg',
        caption="This is running for fun. Come run for fun because it's fun",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    db.session.add(reallycoolsuperbigbouncyparty)
    db.session.add(bumpbappers)
    db.session.add(discodunkers)
    db.session.add(tomsbbq)
    db.session.add(chrisandallison)
    db.session.add(tysegallfilmore)
    db.session.add(runningforfun)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
