/********************** ACTIONS **************************/

const CREATE_COMMENT = "comment/CREATE_COMMENT";
const READ_COMMENT = "comment/READ_COMMENT";
const UPDATE_COMMENT = "comment/UPDATE_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

/********************** ACTION CREATORS **************************/

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});

const readComment = (comments) => ({
  type: READ_COMMENT,
  payload: comments,
});

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

/***************************** THUNKS ***************************************/

export const makeComment =
  (user_id, image, caption, created_at) => async (dispatch) => {
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
      dispatch(createComment(data));
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
    dispatch(readComment(data));
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
      dispatch(updateComment(data));
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
    dispatch(deleteComment(postId));
  }
};

/***************************** REDUCER ***************************************/

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_COMMENT:
      const post = action.payload;
      newState[post.id] = post;
      return newState;
    case READ_COMMENT:
      newState = {};
      action.payload.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case UPDATE_COMMENT:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_COMMENT:
      console.log(action);
      delete newState[action.postId];
      return newState;
    default:
      return state;
  }
}
