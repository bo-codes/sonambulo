from flask import Blueprint, request
from flask_login import login_required
from app.models import Tag, db
from app.models.post_tag import Post_Tag
from app.forms.tag_form import AddTagForm
from app.forms.post_tag_form import AddPostTagForm

tag_routes=Blueprint("tags", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@tag_routes.route("/")
def get_all_tags():
    tags = Tag.query.all()
    return { "Tags": [tag.to_dict() for tag in tags] }

@tag_routes.route('/<int:postId>')
@login_required
def load_post_tags(postId):
    post_tags = Post_Tag.query.filter(Post_Tag.post_id == postId)
    return {'post_tags': [post_tag.to_dict() for post_tag in post_tags]}


@tag_routes.route("/all")
def get_all_post_tags():
    post_tags = Post_Tag.query.all()
    return { "post_tags": [post_tag.to_dict() for post_tag in post_tags] }



@tag_routes.route("/<tagName>", methods=["POST"])
@login_required
def add_post_tag(tagName):
    tags = Tag.query.all()
    if (tag.tag == tagName for tag in tags):
        post_tag_form = AddPostTagForm()
        post_tag_form['csrf_token'].data = request.cookies['csrf_token']
        if post_tag_form.validate_on_submit():
            postTag = Post_Tag(
                post_id=post_tag_form.data["post_id"],
                tag=post_tag_form.data["tag"],
            )
            db.session.add(postTag)
            db.session.commit()
            return postTag.to_dict()
        return {'errors': validation_errors_to_error_messages(post_tag_form.errors)}, 401
    else:
        post_tag_form = AddPostTagForm()
        post_tag_form['csrf_token'].data = request.cookies['csrf_token']
        if post_tag_form.validate_on_submit():
            postTag = Post_Tag(
                post_id=post_tag_form.data["post_id"],
                tag=post_tag_form.data["tag"],
            )
        form = AddTagForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            newTag = Tag(
                tag=form.data["tag"],
            )
            db.session.add(newTag, postTag)
            db.session.commit()
            return newTag.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
