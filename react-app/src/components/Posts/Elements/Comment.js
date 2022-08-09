import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditCommentForm from "../Forms/editCommentForm";
import CommentDropdown from "./CommentDropdown";

function Comment({ comment, post, userId }) {
  const [showEditComment, setShowEditComment] = useState(false);

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
          <p>{comment.content}</p>
        </div>
      )}
    </>
  );
}

export default Comment;
