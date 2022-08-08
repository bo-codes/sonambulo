import React from "react";
import PostForm from "../Forms/postForm";

// PAGE JUST HOLDS THE FORM TO CREATE A POST
function CreatePost() {
  return (
    <main>
      <div>
        <h1>
          Create Post
        </h1>
        {/* THE FORM */}
        <PostForm />
      </div>
    </main>
  );
}

export default CreatePost;
