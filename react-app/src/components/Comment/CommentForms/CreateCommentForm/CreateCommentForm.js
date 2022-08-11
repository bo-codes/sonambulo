// IMPORT REACT STUFF --------
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// IMPORT THUNKS WE NEED TO DISPATCH --------
import { makeComment } from "../../../../store/comments";

// COMMENT FORM THAT WE WILL DISPLAY ON THE POSTS PAGE USING A MODAL AND BUTTON THAT SHOWS MODAL NEXT TO EACH POST
function CreateCommentForm({
  comment = null,
  post = null,
  setShowCreateComment,
}) {
  // SETTING STATES
  const [date, setDate] = useState((comment && comment.created_at) || "");
  const [content, setContent] = useState((comment && comment.content) || "");
  const [errors, setErrors] = useState([]);
  const [showConfirmDeleteCommentModal, setShowConfirmDeleteCommentModal] =
    useState(false);

  // SETTING UP THE REACT FUNCTIONS
  const history = useHistory();
  const dispatch = useDispatch();

  // PULLING CURRENT USER FROM STATE
  const userId = useSelector((state) => state.session.user.id);

  // SETTING VARIABLES TO INFO WE'LL USE
  const postId = post.id;
  let created_at;
  if (comment) created_at = comment.created_at;

  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!userId) {
      setErrors(["You must be logged in to create or edit a comment."]);
      setErrors(comment);
      return;
    }

    comment = await dispatch(makeComment(userId, postId, content, date));
    if (comment.id) {
      history.push(`/posts`);
      return;
    }

    if (Array.isArray(comment)) {
      setErrors(comment);
    } else {
      setShowCreateComment(false);
      return;
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        {!comment && (
          <div>
            <ul className="errors">
              {errors &&
                errors.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
            </ul>
          </div>
        )}
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <div>
            <button>Create Comment</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCommentForm;
