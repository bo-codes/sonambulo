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
    history.push("/posts");
  };

  return (
    <main>
      <div>
        <h2>Are you sure you want to delete your post?</h2>
        <div>
          <button onClick={cancelDelete}>Cancel</button>
          <button onClick={deletePost}>Delete</button>
        </div>
      </div>
    </main>
  );
};

export default DeletePostModal;
