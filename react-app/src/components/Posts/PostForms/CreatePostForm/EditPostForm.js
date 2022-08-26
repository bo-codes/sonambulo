// IMPORT REACT STUFF
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
// IMPORT COMPONENTS WE'RE USING
import { Modal } from "../../../Global/Elements/Modal";
import DeletePostModal from "../../Elements/DeletePostModal/DeletePostModal";
// IMPORT THUNKS WE NEED TO DISPATCH
import { makePost, editPost } from "../../../../store/posts";

import "./EditPostForm.css";

// THIS IS OUR POST CREATION/EDIT FORM COMPONENT
function EditPostForm({
  post = null,
  setShowCreatePost,
  setShowConfirmDeleteModal,
  showConfirmDeleteModal,
}) {
  // SETTING STATES
  const [date, setDate] = useState((post && post.created_at) || "");
  const [image, setImage] = useState((post && post.image_url) || "");
  const [caption, setCaption] = useState((post && post.caption) || "");
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  // const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  // SETTING UP THE useHistory AND useDispatch FUNCTIONS
  const history = useHistory();
  const dispatch = useDispatch();

  // PULLING THE CURRENT USER IN OUR STATE
  const userId = useSelector((state) => state.session.user.id);

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
        history.push(window.location.pathname);
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
      setShowCreatePost(false);
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
    <div id="edit-post-form-container">
      {/* ----------------------FORM ---------------------- vv*/}
      <form onSubmit={submit}>
        {/* IF POST IS FALSEY, AKA IF NOTHING WAS RETURNED FROM THE DISPATCH AND REASSIGNED THE VALUE OF THE
        POST VARAIBLE FROM ITS DEFAULT NULL VALUE TO SOMETHING TRUTHY, JUST DISPLAY ANY ERRORS */}

        {/* -------- ERROR DISPLAY -------- vv*/}
        <div>
          {/* IF THERE IS A POST, DISPLAY THE TEXT "Update Your Post" AND LIST ANY ERRORS */}
          {/* {post && <h2>Update Your Post</h2>} */}
          <ul>
            {errors &&
              errors.map((error) => {
                let splitError = error.split(":");
                let firstPart = splitError[0];
                let firstLetter = firstPart[0].toUpperCase();
                let secondPart = splitError[1].slice(11, 23);
                return (
                  <li key={error}>
                    {firstLetter + firstPart.slice(1) + secondPart}
                  </li>
                );
              })}
          </ul>
        </div>
        {/* -------- ERROR DISPLAY -------- ^^*/}

        {/* ----- IMAGE INPUT ----- vv*/}
        {/* <div>
          <label>Image </label>
          <label htmlFor="image-upload-button">
            Upload
            <input
              id="image-upload-button"
              name="image"
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
          </label>
          {image && (
            <span htmlFor="image-upload-button" name="image">
              {image.name}
            </span>
          )}
        </div> */}
        {/* ----- IMAGE INPUT ----- ^^*/}

        {/* ----- CAPTION INPUT ----- vv*/}
        <div>
          <label htmlFor="caption">Caption</label>
          <TextareaAutosize
            className="post-edit-caption"
            id="textBox1"
            name="caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        {/* ----- CAPTION INPUT ----- ^^*/}

        {/* IF THE DELETE BUTTON IS CLICKED AND THE showConfirmModal SLICE IS SET TO TRUE, SHOW THE DELETE CONFIRMATION MODAL */}
        {showConfirmDeleteModal && (
          <Modal onClose={() => setShowConfirmDeleteModal(false)}>
            <DeletePostModal
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              post={post}
            />
          </Modal>
        )}

        {/* IF THERE'S A POST ALREADY WHEN FILLING OUT THE FORM, WHICH MEANS THAT WE PASSED IN THE A POST INTO THE
        postForm WHICH WE DO IN THE POSTCARD ELEMENT WHEN EDITING, ADD AN UPDATE BUTTON AND A DELETE BUTTON */}
        <div>
          {post ? (
            <div>
              {/* ----- UPDATE POST BUTTON ----- vv*/}
              {imageLoading ? (
                <button disabled>Loading . . .</button>
              ) : (
                <button
                  type="submit"
                  style={{
                    color: "white",
                  }}
                >
                  Update Post
                </button>
              )}
              {/* ----- UPDATE POST BUTTON ----- ^^*/}

              {/* ---------- DELETE BUTTON ---------- vv*/}
              <button
                type="button"
                // DELETE BUTTON SETS showDeletePostModal TO TRUE AND SHOWS THE DELETE CONFIRMATION PAGE
                onClick={deletePostModal}
                disabled={imageLoading}
                style={{
                  color: "white",
                }}
              >
                Delete Post
              </button>
              {/* ---------- DELETE BUTTON ---------- ^^*/}
            </div>
          ) : (
            // IF THERES NOT A POST AKA NO POST WAS PASSED INTO THIS COMPONENT SO "post" IS THE DEFAULT NULL VALUE
            // ----- CREATE BUTTON ----- vv//
            <div>
              {imageLoading ? (
                <button disabled>Loading . . .</button>
              ) : (
                <button>Create Post</button>
              )}
            </div>
            // ----- CREATE BUTTON ----- ^^//
          )}
        </div>
      </form>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default EditPostForm;
