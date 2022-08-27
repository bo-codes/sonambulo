// IMPORT REACT STUFF --------
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../../Global/Elements/Modal";
import moment from "moment";
import { Link } from "react-router-dom";
// --------COMPONENTS -------- //
import Comment from "../../../Comment/Elements/Comment/Comment";
import DeletePostModal from "../DeletePostModal/DeletePostModal";
import Follows from "../../../Follows/Follows";
// --------FORMS -------- //
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";
import CreateCommentForm from "../../../Comment/CommentForms/CreateCommentForm/CreateCommentForm";
import EditPostForm from "../../PostForms/CreatePostForm/EditPostForm";
import SignUpForm from "../../../auth/SignupForm/SignUpForm";
// -------- CSS/IMAGES -------- //
import "./Postcard.css";
import { addOneLike, getAllLikes } from "../../../../store/likes";
import Like from "../../../Like/Like";

function PostCardDetail({ post, postComments=null, likes }) {
  // console.log("POST LIKES BEFORE EVEN RETURNING", likes);
  const dispatch = useDispatch();
  // -------- SETTING STATES ------- //
  // SHOWING OR HIDING THE EDIT POST MODAL
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  // SHOWING OR HIDING THE CREATE COMMENT MODAL


  const [showLogin, setShowLogin] = useState(false);

  // -------- PULLING INFO FROM THE STATE -------- //
  // const likes = useSelector((state) => state.likes) || ""; //Grab likes state
  const user = useSelector((state) => state.session.user) || "";

  return (
    <div id="outermost-card">
      {/* {console.log("POST LIKES IN POSTCARD.JS BEFORE RETURN", likes)} */}
      <div className="post-head-container">
        <div className="post-username">
          <Link
            to={`/users/${post.user.username}`}
            style={{ textDecoration: "none", color: "white" }}
            className="post-username"
          >
            <div className="post-username">{post.user.username}</div>
          </Link>
          {user && <Follows profileUsername={post.user.username} />}
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

      {/* ----- POST DATE ----- vv*/}
      {/* <div className="post-date">
        <div>{moment(localDate).calendar()}</div>
      </div> */}
      {/* ----- POST DATE ----- ^^ */}

      {/*  POST CAPTION ----- vv*/}
      {!showCreatePost && (
        <div className="post-caption">
          {post.caption.length > 138 ? (
            <div>
              {!showFullCaption ? (
                <p>
                  {post.caption.slice(0, 138)}{" "}
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
          <Modal onClose={() => setShowCreatePost(false)}>
            <EditPostForm
              post={post}
              setShowCreatePost={setShowCreatePost}
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
            />
          </Modal>
        )}
        {showConfirmDeleteModal && (
          <Modal onClose={() => setShowConfirmDeleteModal(false)}>
            <DeletePostModal
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              showConfirmDeleteModal={showConfirmDeleteModal}
              post={post}
            />
          </Modal>
        )}
      </div>
      {/* ----------- EDIT POST BUTTON ----------- ^^*/}
      <div className="comment-btns">
        {/* <button className="post-btns" onClick={areWeShowingComments}>
          <div id="comment-btn"></div>
        </button> */}
        {user ? (
          <Like post_id={post.id} user_id={user.id} likes={likes} />
        ) : (
          <button className="post-btns" onClick={() => setShowLogin(true)}>
            <div id="heart-btn"></div>
          </button>
        )}
      </div>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginFormPosts setShowLogin={setShowLogin} />
        </Modal>
      )}
        <div className="create-comment-container">
          {/* ----------- CREATE COMMENT FORM ----------- vv*/}
          <CreateCommentForm
            post={post}
            userId={user.id}
            setShowLogin={setShowLogin}
          />
          {/* ----------- CREATE COMMENT FORM ----------- ^^*/}

          {/* ------------ COMMENTS ------------ vv*/}
          <div className="comment-section">
            {postComments && (
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
              })
            )}
          </div>
          {/* ------------ COMMENTS ------------ ^^*/}
        </div>
        {!postComments && (
          <div className="no-comment-message">
            No Comments Yet, Want To Leave One?
          </div>
        )}
    </div>
  );
}

export default PostCardDetail;
