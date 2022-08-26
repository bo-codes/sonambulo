import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removePost } from "../../../../store/posts";

const DeletePostModal = ({ post, setShowConfirmDeleteModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cancelDelete = () => {
    setShowConfirmDeleteModal(false);
  };

  const deletePost = async (e) => {
    e.preventDefault();
    await dispatch(removePost(post.id));
    history.push("/profile");
  };

  return (
    <main>
      <div>
        <h2
          style={{
            color: "white",
            marginTop: '8px'
          }}
        >
          Are you sure you want to delete your post?
        </h2>
        <div>
          <button
            onClick={cancelDelete}
            style={{
              color: "white",
              marginRight: "5px",
              padding: "3px",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={deletePost}
            style={{
              color: "white",
              padding: "3px",
              borderRadius: "4px",
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
