// IMPORT REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// IMPORT COMPONENTS WE'RE USING --------
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// IMPORT THUNKS WE NEED TO DISPATCH --------
import { acquireAllComments } from "../../../store/comments";
import { acquirePosts } from "../../../store/posts";
import "./Posts.css";

// PAGE THAT DISPLAYS ALL OF OUR POSTS
function Posts() {
  // NEED TO DO THIS TO BE ABLE TO DISPATCH
  const dispatch = useDispatch();
  // PULLING ALL OF THE INFORMATION FROM OUR STATE
  // THIS RUNS FIRST BEFORE USEEFFECT FETCHES OUR DATA WHICH IS WHY WE ALWAYS HAVE TO IMPLEMENT
  // OUR CONDITIONALS (posts && posts.map()) TO HANDLE THE CASES WHERE WE DONT HAVE DATA YET
  const posts = Object.values(useSelector((state) => state.posts));

  const comments = Object.values(useSelector((state) => state.comments));

  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.user));

  const shuffledUsers = users.sort(() => Math.random() - 0.5);

  // WE ADD DISPATCH TO THE DEPENDENCY ARR SO THAT IT DOESNT RERENDER A MILLION TIMES, I JUST CANT EXPLAIN IT WELL
  useEffect(() => {
    // GET ALL POSTS THUNK
    dispatch(acquirePosts());
    // GET ALL COMMENTS THUNK
    dispatch(acquireAllComments());
  }, [dispatch]);

  return (
    <main>
      {/* TITLE */}
      {/* <h1>Posts</h1> */}
      <div className="post-list">
        <div>
          {/* <h3>Suggested Users:</h3> */}
          {/* {shuffledUsers.slice(0, 5).map((listedUser) => {
            return (
              <div key={listedUser.id}>
                <NavLink to={`/${listedUser.username}`}>
                  <img src={listedUser.profile_pic}></img>
                  <div>{listedUser.username}</div>
                </NavLink>
              </div>
            );
          })} */}
        </div>
        {/* CHECK IF THERE ARE POSTS SO THAT THE USESELECTOR DOESNT FUCK US */}
        {posts &&
          posts.map((post) => {
            // WE FILTER THROUGH ALL COMMENTS EVER TO ONLY GRAB THE ONES ASSOCIATED WITH THIS POST
            const postComments = comments.filter((comment) => {
              return parseInt(comment.post_id) === parseInt(post.id);
            });

            // RETURNING A POST CARD WHICH IS A COMPONENT THAT DETERMINES HOW THE POST IS STRUCTURED
            return (
              // EACH ITEM IN A MAP NEEDS ITS OWN UNIQUE KEY
              <div key={post.id}>
                <PostCard post={post} postComments={postComments} />
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default Posts;
