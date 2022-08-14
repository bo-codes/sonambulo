from secrets import choice
from app.models import db
from app.models.post import Post
import datetime
import random


def seed_posts():

    animalBar = Post(
        user_id=1,
        image_url='https://sonambulobucket.s3.amazonaws.com/130db8ed036c42d98c8cbe7e70f08cd6.jpg',
        caption="Today I had a dream that my friends and I went to a bar where evceryone was an animal besides us. It was like walking into alice in woderland or something of the sort. We befriended this slender rabbit figure who was a bit unsettling at first(think the rabbit from donnie darko), and we spent the whole nigth picking his brain about his occupation of being a mechanic.",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
    )

    dantesInferno = Post(
        user_id=3,
        image_url='https://sonambulobucket.s3.amazonaws.com/3894a06926734018a522f11d0c4c4f22.jpg',
        caption="I dreamt that I was in dante's inferno. I didn't realize it for about three days. I just sat and talked to this little old lady next to me in these incredibly uncomfortable chairs. She was the weetest lady, but then she told me she had murdered her husband and was on the run. The realization of where I was washed over me at a random time with no particular trigger. I thought to myself 'how is this lady here for that.' Her husband had been abusing her for years before then.",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
        )

    midnightShop = Post(
        user_id=1,
        image_url='https://sonambulobucket.s3.amazonaws.com/f846b670c24e4324b8b3cb137888a9c0.jpg',
        caption="I was in a shop of some sort alone. It was maybe around 2 in the moarning but it was a shop that didnt carry groceries or it wasnt a convenience store or anything. It had more niche items which makes me wonder why it was open that late in the first place. I was perusing the stoore and all of a sudden I heard a phone ring. I looked to the direction of the ringing and there was a young blonde girl maybe around my age working the register; it was just the two of us in the store. She looked up at me after exchanging a few short 'mhms' and 'okays' on the phone and said directly to me, 'they want to talk to you'. I walked up and grabbed the old black phone and put it to my ear and as soon as I felt the plastic on my ear, I woke up.",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    theLongDrive = Post(
        user_id=1,
        image_url='https://sonambulobucket.s3.amazonaws.com/7663a680a57743a585bf36b44d442cfc.jpg',
        caption="My dream started with myself sitting as a passenger in a car; at least thats where I came-to in the dream. I looked over and there was a pretty girl driving the car and she was playing some pretty calm music in the background and was mid conversation, talking about how maybe the world isnt structured correctly. I entertained the thought. I didn't have to talk, I could just listen. And I felt comfort. We were driving on a long road kind of like the more 'country-side' roads and it was late at night. The car was quiet and all you could hear was the slight hum of the wind.",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    everyonesWatching = Post(
        user_id=2,
        image_url='https://sonambulobucket.s3.amazonaws.com/7cd1a124310d46b8889b779fedd75aa0.jpg',
        caption="I had a dream I was walking around a city and every house that I passed had their window open and lights on; I could hear them talking about me.",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )

    moving = Post(
        user_id=2,
        image_url='https://sonambulobucket.s3.amazonaws.com/fc2c125fb06a4cae855c4abc82bcc61f.jpg',
        caption="I had a dream where my friends and I moved to a new place together. It was a comforting setting",
        created_at=datetime.datetime.now().strftime("%Y-%m-%d %I:%M"),
      )


    db.session.add(animalBar)
    db.session.add(dantesInferno)
    db.session.add(midnightShop)
    db.session.add(theLongDrive)
    db.session.add(everyonesWatching)
    db.session.add(moving)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
