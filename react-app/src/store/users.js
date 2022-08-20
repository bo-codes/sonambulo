const GET_SINGLE_USER = "user/GET_SINGLE_USER";
const GET_ALL_USERS = "users/GET_ALL_USERS";
const GET_SEARCHED_USERS = "users/GET_SEARCHED_USERS";

const actionGetUser = (user) => ({
  type: GET_SINGLE_USER,
  user,
});

const actionGetAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

const actionGetSearchedUsers = (users) => ({
  type: GET_SEARCHED_USERS,
  users,
});

export const thunkGetUser = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${username}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(actionGetUser(user));
    return user;
  }
};


const initialState = {};

const userReducer = (state = initialState, action) => {
  // console.log("BEFORE ACTION", action, "ACTION HERE BOZO");
  let newState = { ...state };
  switch (action.type) {
    case GET_SINGLE_USER:
      newState = {};
      newState[action.user.username] = action.user;
      return newState;

    case GET_ALL_USERS:
      newState = {};
      // console.log("ACTION", action);
      action.users.users.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
};

export default userReducer;
