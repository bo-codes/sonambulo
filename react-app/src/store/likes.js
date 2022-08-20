const ADD_LIKE = "like/ADD_LIKE";
const GET_ALL_LIKES = "like/GET_ALL_LIKES";
const REMOVE_LIKE = "like/REMOVE_LIKE";

const add = (like) => ({
  type: ADD_LIKE,
  like,
});

const load = (likes) => ({
  type: GET_ALL_LIKES,
  likes,
});

const remove = (id) => ({
  type: REMOVE_LIKE,
  id,
});

export const addOneLike =
  ({ post_id, user_id }) =>
  async (dispatch) => {
    const response = await fetch(`/api/likes/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, post_id }),
    });
    if (response.ok) {
      const like = await response.json();
      dispatch(add(like));
      return like;
    }
  };

export const getAllLikes = () => async (dispatch) => {
  // console.log("IN GETTING LIKES THUNK", user_id);
  const response = await fetch(`/api/likes/`);
  if (response.ok) {
    const likes = await response.json();
    // console.log("GET ALL LIKES THUNK RESPONSE", likes.likes);
    dispatch(load(likes));
  }
};

export const deleteLike = (componentLike) => async (dispatch) => {
  const response = await fetch(`/api/likes/delete/${componentLike.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(componentLike),
  });
  if (response.ok) {
    const id = await response.json();
    dispatch(remove(id));
  }
};

const initialState = {};

const likesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_LIKE:
      newState[action.like.id] = action.like;
      return newState;
    case GET_ALL_LIKES:
      newState = {};
      // console.log("ACTION.LIKES IN REDUCER", action.likes);
      // this is normallizing. youre setting the id as the key for the value of the like O of 1 lookup time
      action.likes.likes.forEach((like) => {
        // console.log("like post id", like.post_id);
        newState[like.id] = like;
      });
      return newState;
    case REMOVE_LIKE:
      delete newState[action.id.id];
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
