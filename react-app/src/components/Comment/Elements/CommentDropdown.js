import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeComment } from "../../../store/comments";

function CommentDropdown({ setShowEditComment, comment }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();

    const deleteComment = async () => {
        await dispatch(removeComment(comment.id));
    };

    useEffect(() => {
        const clickCheck = e => {
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
                    className="comment-menu-button"
                    onClick={() => setShowDropdown(!showDropdown)}>
                    ...
                </button>
                {showDropdown && (
                    <div style={{ position: "absolute" }} className="dropdown">
                        <button
                            className="comment-menu-button"
                            onClick={() => setShowEditComment(true)}>
                            Edit Comment
                        </button>
                        <button className="comment-menu-button" onClick={deleteComment}>
                            Delete Comment
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CommentDropdown;
