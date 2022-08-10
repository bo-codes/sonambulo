import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditCommentForm from "../Forms/editCommentForm";
import CommentDropdown from "./CommentDropdown";
import moment from "moment";
import getUsers from "../../../store/users";

function Comment({ comment, post, userId }) {
  const dispatch = useDispatch();

  const [showEditComment, setShowEditComment] = useState(false);
  const [commentDate] = useState(new Date(comment.created_at));

  // const user = User.find(user.id === comment.user_id)
  const users = useSelector((state) => state.session.user);

  const commentUser = Object.values(users).filter((user) => {
    return user.id === comment.user_id;
  });

  useEffect(() => {
    // GET ALL POSTS THUNK
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <>
      <h2>{commentUser.username}</h2>
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
          {!showEditComment && <p>{comment.content}</p>}
          <div>{moment(commentDate).calendar()}</div>
        </div>
      )}
    </>
  );
}

export default Comment;
