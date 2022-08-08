from flask import Blueprint, request
from app.models import db
from flask_login import login_required
from app.AWS import (allowed_file, upload_file_to_s3, get_unique_filename)


aws_routes = Blueprint('images', __name__)


@aws_routes.route('/', methods=["POST"])
@login_required
def upload():
    if "image" not in request.files:
        return {"url": ""}

    image = request.files['image']

    if not allowed_file(image.filename):
        return {"errors": "image must be .pdf .jpg .jpeg .png .gif"}

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return {"errors": upload}, 400

    url = upload['url']

    return {"url": url}
