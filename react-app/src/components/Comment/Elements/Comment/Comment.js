import React, { useState } from "react";
import EditCommentForm from "../../CommentForms/EditCommentForm/EditCommentForm";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
import moment from "moment";

function Comment({ comment, post, userId }) {
  const [showEditComment, setShowEditComment] = useState(false);
  // const [commentDate] = useState(new Date(comment.created_at));
  const commentDate = comment.created_at.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  return (
    <>
      {showEditComment ? (
        <EditCommentForm
          post={post}
          comment={comment}
          setShowEditComment={setShowEditComment}
        />
      ) : (
        <div>
          {userId === comment.user_id && (
            <CommentDropdown
              comment={comment}
              setShowEditComment={setShowEditComment}
            />
          )}
          <p>{comment.user.username}</p>
          <p>{comment.content}</p>
          <div>{moment(comment.commentDate).calendar()}</div>
          {/* <div>{comment.commentDate}</div> */}
        </div>
      )}
    </>
  );
}

export default Comment;
