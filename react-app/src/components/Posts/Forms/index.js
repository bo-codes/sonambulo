import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../Global/Elements/Modal";
import { makePost, editPost } from "../../../store/posts";
import DeletePostModal from "../Elements/DeletePostModal";
// import "./eventForm.css";

function PostForm({ post = null, setShowModal }) {
  const [date, setDate] = useState(
    (post && post.created_at.slice(0, 17).replace(" ", "T")) || ""
  );
  const [image, setImage] = useState((post && post.image_url) || "");
  const [caption, setCaption] = useState((post && post.caption) || "");
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);

  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!userId) {
      setErrors(["You must be logged in to create or edit an post."]);
      setErrors(post);
      return;
    }
    setImageLoading(true);
    setDate(date);

    if (!post) {
      console.log(userId, image, caption, date);
      post = await dispatch(
        makePost(userId, image, caption, date.replace("T", " "))
      );
      if (post.id) {
        history.push(`${post.id}`);
        return;
      }
    } else {
      post = await dispatch(
        editPost(post.id, userId, image, caption, date.replace("T", " "))
      );
    }

    setImageLoading(false);
    if (Array.isArray(post)) {
      setErrors(post);
    } else {
      setShowModal(false);
      return;
    }
  };

  const updateImage = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const deletePostModal = () => {
    setShowConfirmDeleteModal(true);
  };

  return (
    <div>
      <form onSubmit={submit}>
        {!post && (
          <div>
            <ul className="errors">
              {errors &&
                errors.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
            </ul>
          </div>
        )}
        {post && (
          <div>
            <div>
              <h2>Update Your Post</h2>
            </div>
            <div>
              <ul>
                {errors &&
                  errors.map((error) => {
                    return <li key={error}>{error}</li>;
                  })}
              </ul>
            </div>
          </div>
        )}
        <div>
          <label>Image </label>
          <label htmlFor="image-upload-button">
            Upload
            <input
              id="image-upload-button"
              name="image"
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
          </label>
          {image && (
            <span htmlFor="image-upload-button" name="image">
              {image.name}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="caption">Caption</label>
          <textarea
            name="caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {showConfirmDeleteModal && (
          <Modal onClose={() => setShowConfirmDeleteModal(false)}>
            <DeletePostModal
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              post={post}
            />
          </Modal>
        )}
        <div>
          {post ? (
            <div>
              {imageLoading ? (
                <button disabled>Loading . . .</button>
              ) : (
                <button type="submit">Update Post</button>
              )}
              <button
                type="button"
                onClick={deletePostModal}
                disabled={imageLoading}
              >
                Delete Event
              </button>
            </div>
          ) : (
            <div>
              {imageLoading ? (
                <button disabled>Loading . . .</button>
              ) : (
                <button>Create Post</button>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default PostForm;
