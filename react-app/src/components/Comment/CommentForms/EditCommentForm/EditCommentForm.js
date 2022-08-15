// IMPORT REACT STUFF --------
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// IMPORT COMPONENTS WE'RE USING --------
import { Modal } from "../../../Global/Elements/Modal/index";
import DeleteCommentModal from "../../Elements/DeleteCommentModal/DeleteCommentModal";
// IMPORT THUNKS WE NEED TO DISPATCH --------
import { editComment } from "../../../../store/comments";
import { removeComment } from "../../../../store/comments";

// COMMENT FORM THAT WE WILL DISPLAY ON THE POSTS PAGE USING A MODAL AND BUTTON THAT SHOWS MODAL NEXT TO EACH POST
function EditCommentForm({ comment = null, post = null, setShowEditComment }) {
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

    comment = await dispatch(
      editComment(comment.id, userId, postId, content, date)
    );

    if (Array.isArray(comment)) {
      setErrors(comment);
    } else {
      setShowEditComment(false);
      return;
    }
  };

  // THIS SHOWS THE MODAL WHEN CALLED
  const deleteCommentModal = () => {
    setShowConfirmDeleteCommentModal(true);
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    await dispatch(removeComment(comment.id));
    // history.push("/posts");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          {/* IF THERE IS A POST, DISPLAY THE TEXT "Update Your Post" AND LIST ANY ERRORS */}
          <ul>
            {errors &&
              errors.map((error) => {
                let splitError = error.split(":");
                let firstPart = splitError[0];
                let firstLetter = firstPart[0].toUpperCase();
                let secondPart = splitError[1].slice(11, 23);
                return (
                  <li
                    key={error}
                    style={{
                      color: "white",
                    }}
                  >
                    {/* {firstLetter + firstPart.slice(1) + secondPart} */}
                    {splitError[1]}
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "fit-content",
            }}
          />
        </div>
        {/* {showConfirmDeleteCommentModal && (
          <Modal onClose={() => setShowConfirmDeleteCommentModal(false)}>
            <DeleteCommentModal
              setShowConfirmDeleteCommentModal={
                setShowConfirmDeleteCommentModal
              }
              comment={comment}
            />
          </Modal>
        )} */}
        <div>
          {/* IS THERE A COMMENT? IF SO THE BUTTONS WILL CHANGE TO UPDATE AND DELETE */}
          {comment ? (
            <div
              style={{
                marginTop: "4px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  width: "48%",
                  color: "white",
                }}
                type="submit"
              >
                Update
              </button>
              <button
                style={{
                  width: "48%",
                  color: "white",
                }}
                type="button"
                onClick={deleteComment}
              >
                Delete
              </button>
            </div>
          ) : (
            // IF THERE WAS NO COMMENT THEN ONLY GIVE THE OPTION TO CREATE. YOU"RE NOT UPDATING GOOFY
            <div>
              <button>Create Comment</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditCommentForm;
