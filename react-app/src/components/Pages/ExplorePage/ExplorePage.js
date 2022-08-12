// IMPORT REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
// IMPORT COMPONENTS WE'RE USING --------
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// IMPORT THUNKS WE NEED TO DISPATCH --------
import { acquireAllComments } from "../../../store/comments";
import { acquirePosts } from "../../../store/posts";
import "./images.css";

// PAGE THAT DISPLAYS ALL OF OUR POSTS
function ExplorePage() {
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
    <div id="create-form">
      <div
        className="create-form-image"
        style={{
          width: "50vw",
          height: "100vh",
          overflow: "scroll",
          display: "flex",
          flexWrap: "wrap",
          float: "left",
        }}
      >
        {posts.map((post) => {
          if (post.image_url)
            return (
              <div key={post.id} style={{ alignContent: "center" }}>
                {/* <div key={image.id} className="image"> */}
                <Link
                  to={`/posts/`}
                  className="image"
                  style={{ position: "relative" }}
                >
                  <div className="overlay">
                    <div style={{ color: "white", width: "400px" }}>
                      {post.caption.slice(0, 220)}
                    </div>
                  </div>
                  <img
                    src={post.image_url}
                    alt="coverImg"
                    className="image"
                    style={{ padding: 2.5 }}
                  ></img>
                </Link>
              </div>
            )
        })}
      </div>
      <div
        className="create-event-page-container"
        style={{
          width: "50vw",
          height: "100vh",
          overflow: "scroll",
          display: "flex",
          color: "white",
          // float: "right",
          // backgroundColor: "blue",
          // fontSize: "100px"
        }}
      >
        <div id="home-title">SONAMBULO</div>
        <div id="home-subtitle">log your dreams</div>
      </div>
    </div>
  );
}

export default ExplorePage;
