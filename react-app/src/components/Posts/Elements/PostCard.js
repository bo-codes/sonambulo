import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../Global/Elements/Modal";
import PostForm from "../Forms/postForm";
import CreateCommentForm from "../Forms/createCommentForm";
import Comment from "./Comment";
import LoginFormPosts from "../../auth/LoginFormPosts";
import SignUpForm from "../../auth/SignUpForm";
import moment from "moment";
import "./Postcard.css";

function PostCard({ post, postComments }) {
  // -------- SETTING STATES ------- //
  // SHOWING OR HIDING THE EDIT POST MODAL
  const [showCreatePost, setShowCreatePost] = useState(false);
  // SHOWING OR HIDING THE CREATE COMMENT MODAL
  const [showCreateComment, setShowCreateComment] = useState(false);

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // -------- PULLING INFO FROM THE STATE -------- //
  const user = useSelector((state) => state.session.user) || "";
  // const [localDate] = useState(new Date(post.created_at).toString());
  const [localDate] = useState(new Date(post.created_at));

  // -------- RETURN -------- //
  return (
    <div style={{ margin: "30px" }}>
      {/* POST IMAGE ----------- vv*/}
      <img
        style={{ width: "200px", height: "auto" }}
        src={post.image_url}
        alt=""
      />
      {/* POST IMAGE ----------- ^^*/}

      {/* POST DATE ----- vv*/}
      <div>
        <div>
          {/* <div>{localDate.split(" ")[1].toUpperCase()}</div> */}
          {/* <div>{localDate.split(" ")[2]}</div> */}
          <div>{moment(localDate).calendar()}</div>
          {/* <div>{post.created_at}</div> */}
        </div>
      </div>
      {/* POST DATE ----- ^^*/}

      {/*  POST CAPTION ----- vv*/}
      <div>
        <p>{post.caption}</p>
      </div>
      {/* POST CAPTION ----- ^^*/}

      {/* ------ POST EDIT BUTTON ------ vv*/}
      <div>
        {/* if we dont have a post, we dont error out */}
        {post ? (
          // POST EDIT BUTTON
          // when clicked, setShowCreatePost will toggle to true
          <div>
            {user && post.user_id === user.id && (
              <button onClick={() => setShowCreatePost(true)}>✎</button>
            )}
            {/* if setShowCreatePost is set to true, then show the modal which holds the post edit form. */}
            {showCreatePost && (
              <PostForm post={post} setShowCreatePost={setShowCreatePost} />
            )}
          </div>
        ) : (
          <h1>Loading Post</h1>
        )}
        {/* ------ POST EDIT BUTTON ------ ^^*/}

        {/* ----------- CREATE COMMENT BUTTON ----------- */}
        {user ? (
          <button onClick={() => setShowCreateComment(true)}>comment</button>
        ) : (
          <button onClick={() => setShowLogin(true)}>comment</button>
        )}
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
          />
        )}
        <div>
          {/* LIKES  START*/}
          {/* <div >
            {user && (
              <Like
                event_id={eventId}
                user_id={user.id}
                title={title}
              />
            )}
          </div> */}
          {/* LIKES END */}
        </div>
        {/* ------------ COMMENTS ------------ vv*/}
        <div className="comment-section">
          {postComments &&
            postComments.map((comment) => {
              // FOR EACH COMMENT DISPLAY THIS
              return (
                <Comment
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
