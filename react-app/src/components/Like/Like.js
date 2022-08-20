import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsThunk } from "../../store/posts";
import { addOneLike, deleteLike, getAllLikes } from "../../store/likes";

// const BookmarkEventName = styled.link`
//   cursor: pointer;
// `;

function Like({ post_id, user_id = null, likes }) {
  const dispatch = useDispatch();
  const postLikes = likes.filter((like) => {
    return (
      parseInt(like.post_id) === parseInt(post_id) &&
      parseInt(like.user_id) === parseInt(user_id)
    );
  });
  // const postId = post_id;

  //if a button clicks and there is no bookmark in the bookmarks table where the user and the event matches,
  //we create a bookmark with those associations and display the button differently.

  //we need to create and delete bookmmarks on click
  //we query the state for all bookmarks where the user id matches, then look in the bookmarks to check if any of the bookmarks match both the user and event id's
  //if they do, we run the delete,
  //otherwise, we create the new bookmark

  // const likes = useSelector((state) => state.likes); //Grab likes state
  const [like, setLike] = useState(null); //Used to store the current event bookmark state

  useEffect(() => {
    // console.log(likes);
    // console.log("LIKE.js RIGHT BEFORE SET LIKE", postLikes);
    //set bookmark to the first bookmark in state that matches the post_id
    setLike(
      Object.values(postLikes).filter((like) => {
        return parseInt(like.post_id) === parseInt(post_id);
      })[0]
    );
  }, [postLikes, post_id]);

  // useEffect(() => {
  //   // dispatch(getAllPostsThunk());
  //   dispatch(getAllLikes(user_id));
  // }, [dispatch, user_id]);

  const clickButton = () => {
    // console.log("IS THERE A LIKE WHEN BUTTON IS CLICKED", like);
    //if bookmark is falsey create a bookmark
    if (!like) dispatch(addOneLike({ post_id, user_id }));
    //else remove the bookmark
    else {
      dispatch(deleteLike(like));
    }
  };

  return (
    <div>
      {user_id && !like && (
        <>
          <button className="post-btns" onClick={clickButton}>
            <div id="heart-btn"></div>
          </button>
        </>
      )}
      {user_id && like && (
        <button className="post-btns" onClick={clickButton}>
          <div id="filled-heart-btn"></div>
        </button>
      )}
    </div>
  );
}

export default Like;
