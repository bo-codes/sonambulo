import React from "react";
import PostForm from "../Forms";

function CreatePost() {
  return (
    <main>
      <div id="create-form">
        <div className="create-form-image"></div>
        <div className="create-event-page-container">
          <h1
            style={{
              color: "#A675A1",
              letterSpacing: "4px",
              fontFamily: "Eina-bold",
              fontSize: "77px",
            }}
          >
            Create Post
          </h1>
          <PostForm />
        </div>
      </div>
    </main>
  );
}

export default CreatePost;
