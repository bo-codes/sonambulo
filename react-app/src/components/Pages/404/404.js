// IMPORT REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
// IMPORT COMPONENTS WE'RE USING --------
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// IMPORT THUNKS WE NEED TO DISPATCH --------
import { acquireAllComments } from "../../../store/comments";
import { acquirePosts } from "../../../store/posts";
import homepageImg from "../../../images/homepage-img.jpg";

import { HashLink } from "react-router-hash-link";

// PAGE THAT DISPLAYS ALL OF OUR POSTS
function ErrorPage() {
  return (
    <h1></h1>
  );
}

export default ErrorPage;
