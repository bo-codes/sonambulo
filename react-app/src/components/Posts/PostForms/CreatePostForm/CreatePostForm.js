// IMPORT REACT STUFF
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// IMPORT COMPONENTS WE'RE USING
import { Modal } from "../../../Global/Elements/Modal";
import DeletePostModal from "../../Elements/DeletePostModal/DeletePostModal";
// IMPORT THUNKS WE NEED TO DISPATCH
import { makePost, editPost, makePostTag } from "../../../../store/posts";
import "../../../auth/SignupForm/SignupForm.css";
import "./CreatePostForm.css";

// THIS IS OUR POST CREATION/EDIT FORM COMPONENT
function PostForm({ post = null, setShowCreatePost }) {
  // SETTING STATES
  const [date, setDate] = useState((post && post.created_at) || "");
  const [image, setImage] = useState((post && post.image_url) || "");
  const [caption, setCaption] = useState((post && post.caption) || "");
  const [tags, setTags] = useState((post && post.tag) || []);
  const [tag, setTag] = useState((post && post.tag) || []);
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  // SETTING UP THE useHistory AND useDispatch FUNCTIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  // PULLING THE CURRENT USER IN OUR STATE
  const userId = useSelector((state) => state.session.user.id);

  const createTag = async (e) => {
    e.preventDefault();

    if (!userId) {
      // ADD THE ERROR INTO THE Errors STATE SLICE
      setErrors(["You must be logged in to create a tag."]);
      return;
    } else {
      let newTag = await dispatch(makePostTag(tag));
    }
  };

  // ---------------------- ON SUBMITTAL ---------------------- vv//
  const submit = async (e) => {
    // PREVENTS PAGE FROM DOING DEFAULT PAGE RELOAD
    e.preventDefault();

    // SETS ERRORS TO EMPTY TO PREP IT FOR ERROR CHECK BELOW
    setErrors([]);

    // IF CURRENT USER ISNT SIGNED IN AND THEREFORE NOT IN THE SESSION STATE
    if (!userId) {
      // ADD THE ERROR INTO THE Errors STATE SLICE
      setErrors(["You must be logged in to create or edit an post."]);
      setErrors(post);
      return;
    }

    // IMAGE IS LOADING SO SET THAT TO TRUE
    setImageLoading(true);
    // SET THE DATE TO WHATEVER THE POST DATE IS IN YOUR SUBMITTED FORM
    setDate(date);

    // ----------- CREATION / DISPATCHES ----------- vv//
    // IF THERE IS NO POST, THEN RUN THE makePost DISPATCH WITH ALL OF THE INFO FROM THE FORM, WHICH
    if (!post) {
      // CREATING
      post = await dispatch(
        makePost(userId, image, caption, date)
        // WE ARE JUST PULLING FROM THE SLICES OF STATE ABOVE BECAUSE WE HAVE THE FORM SET UP TO UPDATE
        // THE SLICES OF STATE LIVE/onChange
      );

      // IF THE DISPATCH SUCCESSFULLY CREATES AND RETURNS A POST, THEN RETURN TO END THE FUNCTION
      if (post.id) {
        history.push(`/profile`);
        return;
      }
    }
    // IF THERE IS A POST, RUN THE editPost DISPATCH WITH ALL THE INFO FROM THE FORM
    else {
      post = await dispatch(
        editPost(post.id, userId, image, caption, date.replace("T", " "))
      );
    }
    // ----------- CREATION / DISPATCHES ----------- ^^//

    // AFTER DISPATCHING ABOVE, THE IMAGE IS NO LONGER LOADING, THE DISPATCH HAS BEEN RUN AND WE HAVE
    // A POST NOW WHICH MEANS ITLL NOW RENDER THE UPDATE BUTTON AND ENABLE IT SO YOU CAN CLICK IT
    setImageLoading(false);

    // IF POST IS AN ARRAY, SET THE ERRORS TO POST
    if (Array.isArray(post)) {
      setErrors(post);
    } else {
      // setShowCreatePost(false);
      return;
    }
  };
  // ---------------------- ON SUBMITTAL ---------------------- ^^//

  // FUNCTION TO SET IMAGE TO WHATEVER WE UPLOAD WHEN WE UPLOAD
  const updateImage = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  // FUNCTION TO TOGGLE THE VISIBILITY OF DELETE POST MODAL WHEN A BUTTON IS CLICKED
  const deletePostModal = () => {
    setShowConfirmDeleteModal(true);
  };

  return (
    <div className="page-container">
      <div className="form-half">
        <div className="form-container">
          <div className="signup-title">CREATE POST</div>
          {/* ----------------------FORM ---------------------- vv*/}
          <form onSubmit={submit}>
            {/* IF POST IS FALSEY, AKA IF NOTHING WAS RETURNED FROM THE DISPATCH AND REASSIGNED THE VALUE OF THE
              POST VARAIBLE FROM ITS DEFAULT NULL VALUE TO SOMETHING TRUTHY, JUST DISPLAY ANY ERRORS */}

            {/* -------- ERROR DISPLAY -------- vv*/}
            <div>
              {/* IF THERE IS A POST, DISPLAY THE TEXT "Update Your Post" AND LIST ANY ERRORS */}
              <ul>
                {errors &&
                  errors.map((error) => {
                    let splitError = error.split(":");
                    let firstPart = splitError[0];
                    let firstLetter = firstPart[0].toUpperCase();
                    let secondPart = splitError[1].slice(11, 23);
                    return (
                      <li key={error}>
                        {/* {firstLetter + firstPart.slice(1) + secondPart} */}
                        <span
                          style={{
                            color: "#9387bc",
                          }}
                        >
                          ✖
                        </span>
                        {splitError[1]}
                      </li>
                    );
                  })}
              </ul>
            </div>
            {/* -------- ERROR DISPLAY -------- ^^*/}

            {/* ----- IMAGE INPUT ----- vv*/}
            <div className="input-section">
              <label htmlFor="image-upload-button" className="imput-label">
                Image
                <input
                  id="image-upload-button"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={updateImage}
                />
              </label>
              {image && (
                <span
                  htmlFor="image-upload-button"
                  name="image"
                  className="imput-label"
                >
                  {/* {image.name} */}
                </span>
              )}
            </div>
            {/* ----- IMAGE INPUT ----- ^^*/}

            {/* ----- CAPTION INPUT ----- vv*/}
            <div className="input-section">
              <label htmlFor="caption">Caption</label>
              <textarea
                style={{
                  width: "230px",
                }}
                name="caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            {/* ----- CAPTION INPUT ----- ^^*/}
            {/* ----- TAGS INPUT ----- vv*/}
            {/* <div className="input-section">
              <label htmlFor="tags">Tags</label>
              <textarea
                style={{
                  width: "230px",
                }}
                name="tags"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              /> */}
            {/* ----- TAGS INPUT ----- ^^*/}
            {/* </div> */}
            {/* ----- CREATE TAG BUTTON ----- vv*/}
            {/* <button onClick={createTag}>Add Tag</button> */}
            {/* ----- CREATE TAG BUTTON -----^^*/}
            <div>
              <div>
                <button className="login-button">Create Post</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default PostForm;
