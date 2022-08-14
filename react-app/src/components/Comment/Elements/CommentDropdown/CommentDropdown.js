import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeComment } from "../../../../store/comments";
import { Modal } from "../../../Global/Elements/Modal/index";
import DeleteCommentModal from "../../Elements/DeleteCommentModal/DeleteCommentModal";
import "../../Elements/Comment/Comment.css";

function CommentDropdown({ setShowEditComment, showEditComment, comment }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmDeleteCommentModal, setShowConfirmDeleteCommentModal] =
    useState(false);
  const dispatch = useDispatch();

  const deleteComment = async (e) => {
    e.preventDefault();
    await dispatch(removeComment(comment.id));
    // history.push("/posts");
  };

  // THIS SHOWS THE MODAL WHEN CALLED
  const deleteCommentModal = () => {
    setShowConfirmDeleteCommentModal(true);
  };

  useEffect(() => {
    const clickCheck = (e) => {
      if (e.target.classList.contains("comment-menu-button")) return;
      if (!e.target.classList.contains("dropdown")) setShowDropdown(false);
    };
    document.addEventListener("mousedown", clickCheck);
    return () => document.removeEventListener("mousedown", clickCheck);
  }, [showDropdown]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <button
          className="comment-dropdown"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          ...
        </button>
        {showDropdown && !showEditComment && (
          <div style={{ position: "absolute" }} className="dropdown">
            <button
              className="comment-menu-button"
              onClick={() => setShowEditComment(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="comment-menu-button"
              onClick={deleteComment}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CommentDropdown;
