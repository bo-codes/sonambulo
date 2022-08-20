/********************** ACTIONS **************************/

const CREATE_COMMENT = "comment/CREATE_COMMENT";
const READ_COMMENT = "comment/READ_COMMENT";
const UPDATE_COMMENT = "comment/UPDATE_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";
const GET_ALL_COMMENTS = "comment/GET_ALL_COMMENTS";

/********************** ACTION CREATORS **************************/

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});

const getComments = (comments) => ({
  type: GET_ALL_COMMENTS,
  comments,
});

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

/***************************** THUNKS ***************************************/
export const getAllCommentsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/comments/all`);

  if (response.ok) {
    const comments = await response.json();
    // console.log(comments);
    dispatch(getComments(comments.Comments));
    return comments;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const makeComment =
  (user_id, post_id, content, created_at) => async (dispatch) => {
    const response = await fetch("/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        post_id,
        content,
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

export const editComment =
  (comment_id, user_id, post_id, content, created_at) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        post_id,
        content,
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

export const removeComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteComment(commentId));
  }
};

/***************************** REDUCER ***************************************/

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_COMMENT:
      const comment = action.payload;
      newState[comment.id] = comment;
      return newState;
    case READ_COMMENT:
      newState = {};
      action.payload.comments.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return newState;
    case GET_ALL_COMMENTS:
      newState = {};
      action.comments.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return newState;
    case UPDATE_COMMENT:
      newState[action.comment.id] = action.comment;
      return newState;
    case DELETE_COMMENT:
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
}
