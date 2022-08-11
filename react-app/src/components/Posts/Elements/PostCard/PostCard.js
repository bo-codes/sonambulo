import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../Global/Elements/Modal";
import PostForm from "../../PostForms/CreatePostForm/CreatePostForm";
import CreateCommentForm from "../../../Comment/CommentForms/CreateCommentForm/CreateCommentForm";
import Comment from "../../../Comment/Elements/Comment/Comment";
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";
import SignUpForm from "../../../auth/SignupForm/SignUpForm";
import moment from "moment";
import "./Postcard.css";
import chatballoon from "../../../../images/chat-balloon.jpg";

function PostCard({ post, postComments }) {
  // -------- SETTING STATES ------- //
  // SHOWING OR HIDING THE EDIT POST MODAL
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  // SHOWING OR HIDING THE CREATE COMMENT MODAL
  const [showCreateComment, setShowCreateComment] = useState(false);

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // -------- PULLING INFO FROM THE STATE -------- //
  const user = useSelector((state) => state.session.user) || "";
  // const [localDate] = useState(new Date(post.created_at).toString());
  const [localDate] = useState(new Date(post.created_at));
  console.log(post);
  const commentButton = () => {
    setShowCreateComment(true);
    setShowComments(true);
  };

  // -------- RETURN -------- //
  return (
    <div style={{ margin: "30px" }}>
      {/* POST IMAGE ----------- vv*/}
      <div
        style={{
          color: "white",
          fontSize: "16px",
          width: "660px",
          backgroundColor: "#3f3f3f",
          padding: "17px",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        {post.user.username}
      </div>
      {post.image_url && (
        <img
          style={{ width: "660px", height: "auto" }}
          src={post.image_url}
          alt=""
        />
      )}
      {/* POST IMAGE ----------- ^^*/}

      {/* POST DATE ----- vv*/}
      <div>
        <div className="post-date">
          <div>{moment(localDate).calendar()}</div>
        </div>
      </div>
      {/* POST DATE ----- ^^*/}

      {/*  POST CAPTION ----- vv*/}
      <div className="post-caption">
        <p>{post.caption}</p>
      </div>
      {/* POST CAPTION ----- ^^*/}

      {/* ------ POST EDIT BUTTON ------ vv*/}
      <div className="create-comment-container">
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div >
            {user ? (
              <button className="comment-button" onClick={commentButton}>
                comment
              </button>
            ) : (
              <button
                className="comment-button"
                onClick={() => setShowLogin(true)}
              >
                comment
              </button>
            )}
          </div>
          {post ? (
            // POST EDIT BUTTON
            // when clicked, setShowCreatePost will toggle to true
            <div className="edit-post-button-container">
              {user && post.user_id === user.id && (
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="edit-post-button"
                >
                  ✎
                </button>
              )}
              {/* if setShowCreatePost is set to true, then show the modal which holds the post edit form. */}
              {showCreatePost && (
                <PostForm post={post} setShowCreatePost={setShowCreatePost} />
              )}
            </div>
          ) : (
            <h1>Loading Post</h1>
          )}
        </div>
      </div>
      <div className="create-comment-container">
        {/* if we dont have a post, we dont error out */}
        {/* ------ POST EDIT BUTTON ------ ^^*/}

        {/* ----------- CREATE COMMENT BUTTON ----------- */}
        {showLogin && (
          <Modal onClose={() => setShowLogin(false)}>
            <LoginFormPosts
              setShowLogin={setShowLogin}
              setShowSignup={setShowSignup}
            />
          </Modal>
        )}
        {showSignup && (
          <Modal onClose={() => setShowSignup(false)}>
            <SignUpForm setShowSignup={setShowSignup} />
          </Modal>
        )}
        {/* ----------- CREATE COMMENT BUTTON ----------- */}
        {showCreateComment && (
          <CreateCommentForm
            post={post}
            setShowCreateComment={setShowCreateComment}
            userId={user.id}
          />
        )}
        {/* ------------ COMMENTS ------------ vv*/}
        {showComments && (
          <div className="comment-section">
            {postComments &&
              postComments.map((comment) => {
                // FOR EACH COMMENT DISPLAY THIS
                return (
                  <Comment
                    style={{
                      backgroundColor: "red",
                    }}
                    className="comment"
                    key={comment.id}
                    comment={comment}
                    post={post}
                    userId={user.id}
                  />
                );
              })}
          </div>
        )}
        {/* ------------ COMMENTS ------------ ^^*/}
      </div>
    </div>
  );
}

export default PostCard;
