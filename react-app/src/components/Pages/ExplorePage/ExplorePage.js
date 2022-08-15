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
import sleepinCat from "../../../images/sleepin-cat.png"

import { HashLink } from "react-router-hash-link";

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
      <div className="container-titles-and-img-divs">
        <div className="title-container">
          <h1
            id="title"
          >
            <span>Z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>Z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>Z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>Z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1
            id="title"
          >
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
        </div>
        <div
          className="cat-image-container"
        >
          <img style={{
            width: '15vw',
            paddingLeft: '2vw',
            float:'left'
          }} src={sleepinCat} />
        </div>
        <div className="home-subtitle">Log Your Dreams</div>
      </div>
      <div id="imageCard">
        {postImages.map((image) => {
          return (
            <div
              key={image.id}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <HashLink
                to={`/posts#${image.id}`}
                className="image"
                style={{ position: "relative" }}
              >
                <div className="overlay">
                  <h3
                    style={{
                      color: "white",
                      width: "309px",
                      fontWeight: "initial",
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
              </HashLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExplorePage;
