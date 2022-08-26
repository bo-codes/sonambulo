// -------- REACT --------
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

// -------- THUNKS --------
import { makeComment } from "../../../../store/comments";
import "./CreateCommentForm.css";

function CreateCommentForm({
  comment = null,
  post = null,
  setShowCreateComment,
  setShowLogin,
  userId,
}) {
  // SETTING STATES
  const [date, setDate] = useState((comment && comment.created_at) || "");
  const [content, setContent] = useState((comment && comment.content) || "");
  const [errors, setErrors] = useState([]);

  // SETTING UP THE REACT FUNCTIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  // PULLING CURRENT USER FROM STATE
  // const userId = useSelector((state) => state.session.user.id);

  // SETTING VARIABLES TO INFO WE'LL USE
  const postId = post.id;
  let created_at;
  if (comment) created_at = comment.created_at;

  // -------- ONSUBMIT -------- vv//
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
      setContent("");
      // setShowCreateComment(false);
      history.push(window.location.pathname);
      return;
    }

    // IF WE GET ERRORS BACK BECAUSE THATS THE ONLY ARR WED GET BACK. COMMENT WOULD BE AN OBJECT.
    if (Array.isArray(comment)) {
      // SET OUT ERROR STATE TO OUR NEW ERRORS WE GOT FROM SUBMITTAL
      setErrors(comment);
      // IF IT FAILS TO CREATE A COMMENT BUT DOESNT RETURN ERRORS IN THE ARRAY
    } else {
      setContent("");
      // setShowCreateComment(false);
      return;
    }
  };

  // const adjustTextBox = () => {
  //   if (this.scrollHeight > this.clientHeight)
  //     this.style.height = this.scrollHeight + "px";
  // };
  // -------- ONSUBMIT -------- ^^//

  return (
    <div className="comment-create-input">
      <form onSubmit={submit}>
        <div>
          <ul>
            {errors &&
              errors.map((error) => {
                let splitError = error.split(":");
                let firstPart = splitError[0];
                let firstLetter = firstPart[0].toUpperCase();
                let secondPart = splitError[1].slice(11, 23);
                return <li key={error}>{splitError[1]}</li>;
              })}
          </ul>
        </div>
        <div className="custom-search">
          <div className="custom-outer-div"></div>
          <div className="text-area-container">
            <TextareaAutosize
              // onKeyUp={adjustTextBox}
              // style={{ overflow: "hidden", transition: "height 0.2s ease-out" }}
              className="custom-search-input"
              name="content"
              type="text"
              value={content}
              placeholder={`Tell ${post.user.username} something ...`}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="custom-outer-div-bottom"></div>
          {userId ? (
            <button className="custom-search-button">Reply</button>
          ) : (
            <button
              className="custom-search-button"
              onClick={() => setShowLogin(true)}
            >
              Reply
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateCommentForm;
