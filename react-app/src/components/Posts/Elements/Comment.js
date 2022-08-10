import React, { useState } from "react";
import EditCommentForm from "../Forms/editCommentForm";
import CommentDropdown from "./CommentDropdown";
import moment from "moment";

function Comment({ comment, post, userId }) {
  const [showEditComment, setShowEditComment] = useState(false);
  const [commentDate] = useState(new Date(comment.created_at));
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
          <div>{moment(commentDate).calendar()}</div>
        </div>
      )}
    </>
  );
}

export default Comment;
