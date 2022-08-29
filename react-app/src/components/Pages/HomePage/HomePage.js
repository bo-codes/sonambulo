// -------- IMPORT REACT STUFF -------- //
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
// -------- COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// --------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getAllPostsThunk } from "../../../store/posts";
// --------- CSS AND IMAGES -------- //
import "./images.css";
import sleepinCat from "../../../images/sleepin-cat.png";

function HomePage() {
  const dispatch = useDispatch();
  // PULLING ALL OF THE INFORMATION FROM OUR STATE
  // THIS RUNS FIRST BEFORE USEEFFECT FETCHES OUR DATA WHICH IS WHY WE ALWAYS HAVE TO IMPLEMENT
  // OUR CONDITIONALS (posts && posts.map()) TO HANDLE THE CASES WHERE WE DONT HAVE DATA YET
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.user));

  const postImages = posts.filter((post) => post.image_url);
  const shuffledUsers = users.sort(() => Math.random() - 0.5);

  // WE ADD DISPATCH TO THE DEPENDENCY ARR SO THAT IT DOESNT RERENDER A MILLION TIMES, I JUST CANT EXPLAIN IT WELL
  useEffect(() => {
    // GET ALL POSTS
    dispatch(getAllPostsThunk());
    // GET ALL COMMENTS
    dispatch(getAllCommentsThunk());
  }, [dispatch]);

  return (
    <div className="background">
      <div className="container-titles-and-img-divs">
        <div className="title-container">
          <h1 className="title">
            <span>Z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>Z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>Z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>Z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
          <h1 className="title">
            <span>z</span>
            <span className="onambulo">O N A M B U L O</span>
          </h1>
        </div>
        <div className="cat-image-and-title-container">
          <div
            className="cat-image-container"
            style={{
              backgroundImage: "url(" + sleepinCat + ")",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="home-subtitle-container">
            <div className="home-subtitle">Log Your Dreams</div>
          </div>
        </div>
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
                  <h3>{image.caption.slice(0, 200)}</h3>
                </div>
                <img
                  src={image.image_url}
                  alt="coverImg"
                  className="image"
                ></img>
              </HashLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
