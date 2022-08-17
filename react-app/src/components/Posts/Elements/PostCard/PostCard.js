// IMPORT REACT STUFF --------
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../Global/Elements/Modal";
import moment from "moment";
// --------COMPONENTS -------- //
import Comment from "../../../Comment/Elements/Comment/Comment";
// --------FORMS -------- //
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";
import CreateCommentForm from "../../../Comment/CommentForms/CreateCommentForm/CreateCommentForm";
import EditPostForm from "../../PostForms/CreatePostForm/EditPostForm";
import SignUpForm from "../../../auth/SignupForm/SignUpForm";
// -------- CSS/IMAGES -------- //
import "./Postcard.css";
import chatballoon from "../../../../images/chat-balloon.jpg";

function PostCard({ post, postComments }) {
  // -------- SETTING STATES ------- //
  // SHOWING OR HIDING THE EDIT POST MODAL
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  // SHOWING OR HIDING THE CREATE COMMENT MODAL
  const [showCreateComment, setShowCreateComment] = useState(false);

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // -------- PULLING INFO FROM THE STATE -------- //
  const user = useSelector((state) => state.session.user) || "";
  const [localDate] = useState(new Date(post.created_at));

  const commentButton = () => {
    setShowCreateComment(true);
    setShowComments(true);
  };

  return (
    <div id="outermost-card">
      <div className="post-head-container">
        <div className="post-username">
          <div>{post.user.username}</div>
        </div>
        {/* ------ POST EDIT BUTTON ------ vv*/}
        <div className="edit-post-container">
          {post ? (
            // POST EDIT BUTTON
            // when clicked, setShowCreatePost will toggle to true
            <div className="edit-post-button-container">
              {user && post.user_id === user.id && (
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="edit-post-button"
                >
                  ...
                </button>
              )}
              {/* if setShowCreatePost is set to true, then show the modal which holds the post edit form. */}
            </div>
          ) : (
            <h1>Loading Post</h1>
          )}
        </div>
        {/* ------ POST EDIT BUTTON ------ ^^*/}
      </div>

      {/* ----------- POST IMAGE ----------- vv*/}
      {post.image_url && (
        <img id="postcard-image" src={post.image_url} alt="" />
      )}
      {/* ----------- POST IMAGE ----------- ^^*/}

      {/* POST DATE ----- vv*/}
      <div className="post-date">
        <div>{moment(localDate).calendar()}</div>
      </div>
      {/* POST DATE ----- ^^*/}

      {/*  POST CAPTION ----- vv*/}
      {!showCreatePost && (
        <div className="post-caption">
          {post.caption.length > 78 ? (
            <div>
              {!showFullCaption ? (
                <p>
                  {post.caption.slice(0, 78)}{" "}
                  <span>
                    <button
                      className="show-more"
                      onClick={() => setShowFullCaption(true)}
                    >
                      ...
                    </button>
                  </span>
                </p>
              ) : (
                <p>
                  {post.caption}{" "}
                  <span>
                    <button
                      className="show-more"
                      onClick={() => setShowFullCaption(false)}
                    >
                      show less
                    </button>
                  </span>
                </p>
              )}
            </div>
          ) : (
            <p>{post.caption}</p>
          )}
        </div>
      )}
      {/* POST CAPTION ----- ^^*/}
      {/* ----------- EDIT POST BUTTON ----------- vv*/}
      <div id="post-form-container">
        {showCreatePost && (
          <EditPostForm post={post} setShowCreatePost={setShowCreatePost} />
        )}
      </div>
      {/* ----------- EDIT POST BUTTON ----------- ^^*/}

      <div className="create-comment-container">
        {/* ----------- CREATE COMMENT BUTTON ----------- vv*/}
        {showLogin && (
          <Modal onClose={() => setShowLogin(false)}>
            <LoginFormPosts setShowLogin={setShowLogin} />
          </Modal>
        )}
        {showSignup && (
          <Modal onClose={() => setShowSignup(false)}>
            <SignUpForm setShowSignup={setShowSignup} />
          </Modal>
        )}
        {/* ----------- CREATE COMMENT BUTTON ----------- ^^*/}

        {/* ----------- CREATE COMMENT FORM ----------- vv*/}
        <CreateCommentForm
          post={post}
          setShowCreateComment={setShowCreateComment}
          userId={user.id}
          setShowLogin={setShowLogin}
        />
        {/* ----------- CREATE COMMENT FORM ----------- ^^*/}

        {/* ------------ COMMENTS ------------ vv*/}
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
        {/* ------------ COMMENTS ------------ ^^*/}
      </div>
    </div>
  );
}

export default PostCard;
