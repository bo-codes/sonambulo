from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from flask_wtf.csrf import validate_csrf

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    print("\n\n\n\ USERS HERE \n\n\n", users, "\n\n\n")
    return {'users': [user.to_dict_short() for user in users]}


@user_routes.route('/profile/<username>')
@login_required
def user(username):
    user = User.query.filter(User.username == username).first()
    return user.to_dict()


@user_routes.route('/search/<searchword>')
def search_user(searchword):
    users = db.session.query(User).filter(User.username.ilike(f"%{searchword}%"))
    data = [user.to_dict_short() for user in users]
    return {'users': data}


# FOLLOWS


@user_routes.route('/<username>/follow', methods=['PUT'])
@login_required
def follow(username):
    user = User.query.filter(User.username == username).first()
    current_user.follow(user)
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<username>/unfollow', methods=['PUT'])
@login_required
def unfollow(username):
    user = User.query.filter(User.username == username).first()
    current_user.unfollow(user)
    db.session.commit()
    return user.to_dict()
