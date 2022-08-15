import React from "react";
import PostForm from "../../Posts/PostForms/CreatePostForm/CreatePostForm";

// PAGE JUST HOLDS THE FORM TO CREATE A POST
function CreatePost() {
  return (
    <main>
      <div>
        {/* THE FORM */}
        <PostForm />
      </div>
    </main>
  );
}

export default CreatePost;
