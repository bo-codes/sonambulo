import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../Global/Elements/Modal";
import { Link } from "react-router-dom";
import PostForm from "../Forms";
import DeletePostModal from "./DeletePostModal";
// import "./eventCard.css";

function PostCard({ post }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [localDate] = useState(new Date(post.created_at).toString());
  return (
    <div
      style={{
        margin: "30px",
      }}
    >
      <img
        style={{
          width: "900px",
          height: "auto",
        }}
        src={post.image_url}
        alt=""
      />
      <div
        style={{
          top: "0px",
          right: "33px",
          backgroundColor: "#A675A1",
          // backgroundColor: "#7E7F9A",
          zIndex: "2",
        }}
      >
        <div
          style={{
            height: "auto",
            backgroundColor: "#A675A1",
            paddingTop: "10px",
          }}
        >
          <div>{localDate.split(" ")[1].toUpperCase()}</div>
          <div>{localDate.split(" ")[2]}</div>
        </div>
      </div>
      <div>
        {post.caption.length > 74 && (
          <p
            style={{
              fontSize: "20px",
            }}
          >
            {post.caption.slice(0, 74)}
            <span>...</span>
          </p>
        )}
        {/* IF DESCRIPTION IS LESS THAN 500 CHARS */}
        {post.caption.length <= 74 && (
          <p
            style={{
              fontSize: "20px",
            }}
          >
            {post.caption}
          </p>
        )}
      </div>
      {/* <Comments post.id/> */}
      {/* START OF MODAL */}
      <div>
        {post ? (
          <div>
            <div className="button-container">
              {user && post.user_id === user.id && (
                <button
                  onClick={() => setShowModal(true)}
                >
                  ✎
                </button>
              )}
              {/* LIKES */}
              {/* <div >
                {user && (
                  <Like
                    event_id={eventId}
                    user_id={user.id}
                    title={title}
                  />
                )}
              </div> */}
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <PostForm post={post} setShowModal={setShowModal} />
                </Modal>
              )}
            </div>
          </div>
        ) : (
          <h1>Loading Event</h1>
        )}
      </div>
    </div>
  );
}

export default PostCard;
