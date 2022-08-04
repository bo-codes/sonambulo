import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removePost } from "../../../store/posts";
// import "../Forms/eventForm.css";

const DeletePostModal = ({ post, setShowConfirmDeleteModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cancelDelete = () => {
    setShowConfirmDeleteModal(false);
  };

  const deletePost = async (e) => {
    e.preventDefault();
    await dispatch(removePost(post.id));
    history.push("/posts");
  };

  return (
    <main>
      <div
        className="modal-items-container"
        style={{
          fontFamily: "Eina-bold",
          color: "#A675A1",
        }}
      >
        <h2 id="delete-user-msg">Are you sure you want to delete your post?</h2>
        <div className="modal-buttons">
          <button
            onClick={cancelDelete}
            className="image-upload-label"
            style={{
              fontSize: "22px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Cancel
          </button>
          <button
            onClick={deletePost}
            className="image-upload-label"
            style={{
              fontSize: "22px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
};

export default DeletePostModal;
