// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const FOLLOW = "session/follow";
const UNFOLLOW = "session/unfollow";
const GET_FOLLOWED_POSTS = "session/GET_FOLLOWED_POSTS";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const actionFollowUser = (user) => {
  return {
    type: FOLLOW,
    user,
  };
};

export const actionUnfollowUser = (user) => {
  return {
    type: UNFOLLOW,
    user,
  };
};

export const actionGetFollowedPosts = (followedPosts) => {
  return {
    type: GET_FOLLOWED_POSTS,
    followedPosts,
  };
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (username, email, password, confirmPassword) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const thunkFollow = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/${username}/follow`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const follow_user = await response.json();
    dispatch(actionFollowUser(follow_user));
    return follow_user;
  }
};

export const thunkUnfollow = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/${username}/unfollow`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const unfollow_user = await response.json();
    dispatch(actionUnfollowUser(unfollow_user));
    return unfollow_user;
  }
};

export const thunkGetFollowedPosts = (id) => async (dispatch) => {
  console.log(id, "thunkGetFollowedPosts");
  const response = await fetch(`/api/users/${id}/follows`);

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetFollowedPosts(data));
    return data;
  }
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case GET_FOLLOWED_POSTS:
      console.log(action.followedPosts, "FOLLOWED POSTS REDUCER");
      newState = {};
      action.followedPosts.followedPosts.forEach((followedPost) => {
        newState[followedPost.id] = followedPost;
      });
      return newState;
    case FOLLOW:
      newState.user.following.push(action.user);
      return newState;
    case UNFOLLOW:
      const spliceIndex = newState.user.following.indexOf(action.user.id);
      newState.user.following.splice(spliceIndex, 1);
      return newState;
    default:
      return state;
  }
}
