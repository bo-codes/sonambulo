/********************** ACTIONS **************************/

const CREATE_POST = "post/CREATE_POST";
const CREATE_POST_TAG = "post/CREATE_POST_TAG";
const READ_POST = "post/READ_POST";
const GET_FEED_POSTS = "post/GET_FEED_POSTS";
const GET_ONE_USERS_POSTS = "post/GET_ONE_USERS_POSTS";
const GET_ONE_POST = "post/GET_ONE_POST";
const UPDATE_POST = "post/UPDATE_POST";
const DELETE_POST = "post/DELETE_POST";

/********************** ACTION CREATORS **************************/

const createPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

const createPostTag = (postTag) => ({
  type: CREATE_POST_TAG,
  payload: postTag,
});

const readPost = (posts) => ({
  type: READ_POST,
  payload: posts,
});

export const actionGetFeedPosts = (posts) => ({
  type: GET_FEED_POSTS,
  posts,
});

export const actionGetOneUsersPosts = (posts) => ({
  type: GET_ONE_USERS_POSTS,
  posts,
});

export const actionGetOnePost = (post) => ({
  type: GET_ONE_POST,
  post,
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
  (user_id, image, caption, tag, created_at) => async (dispatch) => {
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

    const postRes = await fetch("/api/posts/", {
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

    if (postRes.ok) {
      const data = await postRes.json();
      dispatch(createPost(data));
      return data;
    } else if (postRes.status < 500) {
      const data = await postRes.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const makePostTag = (tag) => async (dispatch) => {
  const tagRes = await fetch(`/api/tags/${tag.tag}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tag: tag.tag,
      post_id: tag.post_id,
    }),
  });

  if (tagRes.ok) {
    const data = await tagRes.json();
    dispatch(createPostTag(data));
    return data;
  } else if (tagRes.status < 500) {
    const data = await tagRes.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const getAllPostTagsThunk = () => async (dispatch) => {
  const response = await fetch("/api/tags/");
  // console.log("inside getAllPostsThunk thunk", response);
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

export const getAllPostTagsForPostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/tags/${postId}`);
  // console.log("inside getAllPostsThunk thunk", response);
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

export const getAllPostsThunk = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  // console.log("inside getAllPostsThunk thunk", response);
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

export const getOneUserPostsThunk = (username) => async (dispatch) => {
  const response = await fetch(`/api/posts/${username}`);
  // console.log("inside getAllPostsThunk thunk", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetOneUsersPosts(data));
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

export const thunkGetFeedPosts = (userId) => async (dispatch) => {
  const response = await fetch(`/api/posts/feed/${userId}`);

  if (response.ok) {
    const feedPosts = await response.json();
    dispatch(actionGetFeedPosts(feedPosts));
    return feedPosts;
  }
};

export const thunkGetOnePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetOnePost(data));
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
  // console.log(postId);

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
    case CREATE_POST_TAG:
      const postTag = action.payload;
      newState[postTag.id] = postTag;
      return newState;
    case READ_POST:
      newState = {};
      action.payload.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case GET_FEED_POSTS:
      newState = {};
      action.posts.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case GET_ONE_USERS_POSTS:
      newState = {};
      // console.log(action, "CURRENT ACTION");
      action.posts.posts.forEach((post) => {
        // console.log(post.id);
        newState[post.id] = post;
      });
      return newState;
    case GET_ONE_POST:
      newState = {};
      console.log(action);
      action.post.post.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case UPDATE_POST:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_POST:
      delete newState[action.postId];
      return newState;
    default:
      return state;
  }
}
