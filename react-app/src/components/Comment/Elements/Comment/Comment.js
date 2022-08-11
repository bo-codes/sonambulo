import React, { useState } from "react";
import EditCommentForm from "../../CommentForms/EditCommentForm/EditCommentForm";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
import moment from "moment";
import "./Comment.css";

function Comment({ comment, post, userId }) {
  const [showEditComment, setShowEditComment] = useState(false);
  // const [commentDate] = useState(new Date(comment.created_at));
  const commentDate = comment.created_at.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  return (
    <div>
      <div className="comment-container">
        {showEditComment ? (
          <EditCommentForm
            post={post}
            comment={comment}
            setShowEditComment={setShowEditComment}
          />
        ) : (
          <div>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {comment.user.username}
            </p>
            <p>{comment.content}</p>
            {/* <div>{moment(comment.commentDate).calendar()}</div> */}
            {/* <div>{comment.commentDate}</div> */}
          </div>
        )}
      </div>
      {userId === comment.user_id && (
        <div className="comment-dropdown">
          <CommentDropdown
            comment={comment}
            setShowEditComment={setShowEditComment}
          />
        </div>
      )}
    </div>
  );
}

export default Comment;
