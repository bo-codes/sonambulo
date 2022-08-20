// IMPORT REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// --------COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getAllPostsThunk } from "../../../store/posts";
import { getAllLikes } from "../../../store/likes";
// -------- CSS/IMAGES -------- //
import "./Posts.css";

function Posts({}) {
  const dispatch = useDispatch();
  // PULLING ALL OF THE INFORMATION FROM OUR STATE
  // THIS RUNS FIRST BEFORE USEEFFECT FETCHES OUR DATA WHICH IS WHY WE ALWAYS HAVE TO IMPLEMENT
  // OUR CONDITIONALS (posts && posts.map()) TO HANDLE THE CASES WHERE WE DONT HAVE DATA YET
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.user));
  const likes = Object.values(useSelector((state) => state.likes));

  const shuffledUsers = users.sort(() => Math.random() - 0.5);

  // WE ADD DISPATCH TO THE DEPENDENCY ARR SO THAT IT DOESNT RERENDER A MILLION TIMES, I JUST CANT EXPLAIN IT WELL
  useEffect(() => {
    // console.log(likes);
    // GET ALL POSTS
    dispatch(getAllPostsThunk());
    // GET ALL COMMENTS
    dispatch(getAllCommentsThunk());
    // GET ALL LIKES
    dispatch(getAllLikes());
  }, [dispatch]);

  return (
    <main>
      <div className="post-list">
        <div className="suggested-users">
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
        {/* CHECK IF THERE ARE POSTS SO THAT THE USESELECTOR DOESNT MESS US UP */}
        {posts &&
          posts.map((post) => {
            // WE FILTER THROUGH ALL COMMENTS EVER TO ONLY GRAB THE ONES ASSOCIATED WITH THIS POST
            // console.log(likes, "LIKES BEFORE EVEN FILTERING");
            let postComments = comments.filter((comment) => {
              return parseInt(comment.post_id) === parseInt(post.id);
            });

            // RETURNING A POST CARD WHICH IS A COMPONENT THAT DETERMINES HOW THE POST IS STRUCTURED
            return (
              // EACH ITEM IN A MAP NEEDS ITS OWN UNIQUE KEY
              <a key={post.id} name={post.id} id={post.id}>
                <PostCard
                  post={post}
                  postComments={postComments}
                  likes={likes}
                />
              </a>
            );
          })}
      </div>
    </main>
  );
}

export default Posts;
