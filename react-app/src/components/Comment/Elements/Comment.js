import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditCommentForm from "../Form/EditCommentForm";
import CommentDropdown from "./CommentDropdown";

function Comment({ comment }) {
    const [showEditComment, setShowEditComment] = useState(false);

    const userId = useSelector(state => state.session.user.id);

    return (
        <>
            {showEditComment ? (
                <EditCommentForm comment={comment} setShowEditComment={setShowEditComment} />
            ) : (
                <div>
                    Comment
                    {userId === comment.user_id && (
                        <CommentDropdown
                            comment={comment}
                            setShowEditComment={setShowEditComment}
                        />
                    )}
                    <p>{comment.text}</p>
                </div>
            )}
        </>
    );
}

export default Comment;
