/********************** ACTIONS **************************/

const CREATE_POST = "post/CREATE_POST";
const READ_POST = "post/READ_POST";
const UPDATE_POST = "post/UPDATE_POST";
const DELETE_POST = "post/DELETE_POST";

/********************** ACTION CREATORS **************************/

const createPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

const readPost = (posts) => ({
  type: READ_POST,
  payload: posts,
});

const updatePost = (post) => ({
  type: UPDATE_POST,
  payload: post,
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

/***************************** THUNKS ***************************************/

export const makePost =
  (user_id, image, caption, created_at) => async (dispatch) => {
    const imageData = new FormData();
    imageData.append("image", image);

    const imageRes = await fetch(`/api/images/`, {
      method: "POST",
      body: imageData,
    });

    if (imageRes.ok) {
      image = await imageRes.json();
    } else if (imageRes.status < 500) {
      const data = await imageRes.json();
      if (data.errors) {
        return [data.errors];
      }
    } else {
      return ["An error occurred. Please try again."];
    }

    const response = await fetch("/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        image: image.url,
        caption,
        created_at,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createPost(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const acquirePosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  console.log("inside acquirePosts thunk", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(readPost(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const editPost =
  (post_id, user_id, image, caption, created_at) => async (dispatch) => {
    if (typeof image === "object") {
      const postData = new FormData();
      postData.append("image", image);

      const imageRes = await fetch(`/api/images/`, {
        method: "POST",
        body: postData,
      });

      if (imageRes.ok) {
        image = await imageRes.json();
        image = image.url;
      } else if (imageRes.status < 500) {
        const data = await imageRes.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    }

    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        image,
        caption,
        created_at,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updatePost(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const removePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  console.log(postId);

  if (response.ok) {
    dispatch(deletePost(postId));
  }
};

/***************************** REDUCER ***************************************/

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_POST:
      const post = action.payload;
      newState[post.id] = post;
      return newState;
    case READ_POST:
      newState = {};
      action.payload.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case UPDATE_POST:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_POST:
      console.log(action);
      delete newState[action.postId];
      return newState;
    default:
      return state;
  }
}
