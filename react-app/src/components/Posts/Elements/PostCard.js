import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../Global/Elements/Modal";
import PostForm from "../Forms/postForm";
import CommentForm from "../Forms/commentForm";

// WE IMPORTED THE CURRENT POST IN THE MAP AND THE COMMENTS ASSOCIATED WITH SAID POST
function PostCard({ post, postComments }) {
  // -------- SETTING STATES ------- //
  // CREATING A SLICE OF STATE DEDICATED TO SHOWING OR HIDING THE EDIT POST MODAL
  const [showModal, setShowModal] = useState(false);
  // CREATING A SLICE OF STATE DEDICATED TO SHOWING OR HIDING THE EDIT COMMENT MODAL
  const [showCommentEditModal, setShowCommentEditModal] = useState(false);
  // CREATING A SLICE OF STATE DEDICATED TO SHOWING OR HIDING THE CREATE COMMENT MODAL
  const [showCommentModal, setShowCommentModal] = useState(false);

  // -------- PULLING INFO FROM THE STATE -------- //
  const user = useSelector((state) => state.session.user);
  const [localDate] = useState(new Date(post.created_at).toString());

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
          <div>{localDate.split(" ")[1].toUpperCase()}</div>
          <div>{localDate.split(" ")[2]}</div>
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
        {post ? (
          // WE DO THIS TO MAKE SURE THAT IF WE DONT HAVE A POST YET, WE DONT ERROR OUT. ADDING THE LOADING TEXT IS JUST EXTRA, FANCY STUFF

          // POST EDIT BUTTON
          // WHEN CLICKED, setShowModal WILL TOGGLE TO TRUE
          <div>
            {user && post.user_id === user.id && (
              <button onClick={() => setShowModal(true)}>✎</button>
            )}
            {/* IF setShowModal iS SET TO TRUE, THEN SHOW THE MODAL WHICH HOLDS THE POST EDIT FORM. TO REITERATE, THE BUTTON ABOVE TOGGLES IT TRUE */}
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <PostForm post={post} setShowModal={setShowModal} />
              </Modal>
            )}
          </div>
        ) : (
          <h1>Loading Post</h1>
        )}
        {/* ------ POST EDIT BUTTON ------ ^^*/}

        {/* ----------- CREATE COMMENT BUTTON ----------- */}
        <button onClick={() => setShowCommentModal(true)}>comment</button>
        {/* ----------- CREATE COMMENT BUTTON ----------- */}
        {showCommentModal && (
          <Modal onClose={() => setShowCommentModal(false)}>
            <CommentForm post={post} showCommentModalVal={showCommentModal} />
          </Modal>
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
        {postComments &&
          postComments.map((comment) => {
            // FOR EACH COMMENT DISPLAY THIS
            return (
              <div key={comment.id}>
                {/* COMMENT CONTENT */}
                <div>{comment.content}</div>
                {/* IF COMMENT BELONGS TO THE CURRENT USER, SHOW THE COMMENT EDIT BUTTON */}
                <div>
                  {user && comment.user_id === user.id && (
                    <button onClick={() => setShowCommentEditModal(true)}>
                      edit
                    </button>
                  )}
                  {/* IF SHOW COMMENT MODAL IS TOGGLED TRUE, SHOW THE COMMENT FORM MODAL */}
                  {showCommentEditModal && (
                    <Modal onClose={() => setShowCommentEditModal(false)}>
                      <CommentForm
                        post={post}
                        setShowCommentEditModal={setShowCommentEditModal}
                        comment={comment}
                      />
                    </Modal>
                  )}
                </div>
              </div>
            );
          })}
        {/* ------------ COMMENTS ------------ ^^*/}
      </div>
    </div>
  );
}

export default PostCard;
