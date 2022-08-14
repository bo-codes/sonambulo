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
import homepageImg from "../../../images/homepage-img.jpg";

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

  const postImages = posts.filter((post) => post.image_url);

  // WE ADD DISPATCH TO THE DEPENDENCY ARR SO THAT IT DOESNT RERENDER A MILLION TIMES, I JUST CANT EXPLAIN IT WELL
  useEffect(() => {
    // GET ALL POSTS THUNK
    dispatch(acquirePosts());
    // GET ALL COMMENTS THUNK
    dispatch(acquireAllComments());
  }, [dispatch]);

  return (
    <div className="background">
      <div
        style={{
          display: "flex",
          float: "right",
          justifyContent: "center",
          width: "54vw",
          height: "100vh",
          backgroundImage: "url(" + homepageImg + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
        }}
      >
        <h1
          id="title"
          style={{
            display: "flex",
            color: "white",
            marginTop: "40px",
            marginLeft: "10px",
            marginBottom: "20px",
            fontSize: "5vw",
            float: "right",
            alignItems: "center",
          }}
        >
          SONAMBULO
        </h1>
      </div>
      <div id="imageCard">
        {postImages.map((image) => {
          return (
            <div
              key={image.id}
              style={{ justifyContent: "center", display: "flex" }}
            >
              {/* <div key={image.id} className="image"> */}
              <Link
                to={`/posts/`}
                className="image"
                style={{ position: "relative" }}
              >
                <div className="overlay">
                  <h3
                    style={{
                      color: "white",
                      fontSize: "14px",
                      width: "209px",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    {image.caption.slice(0, 200)}
                  </h3>
                </div>
                <img
                  src={image.image_url}
                  alt="coverImg"
                  className="image"
                  style={{ padding: 2.5 }}
                ></img>
              </Link>
            </div>
          );
        })}
      </div>
      {/* <div
        className="create-event-page-container"
        style={{
          // width: "50vw",
          height: "100vh",
          overflow: "scroll",
          display: "flex",
          color: "white",
          // float: "right",
          // backgroundColor: "blue",
          // fontSize: "100px"
        }}
      >
        <NavLink
          to={`/posts/`}
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <div id="home-title">SONAMBULO</div>
          <div id="home-subtitle">log your dreams</div>
        </NavLink>
      </div> */}
    </div>
  );
}

export default ExplorePage;
