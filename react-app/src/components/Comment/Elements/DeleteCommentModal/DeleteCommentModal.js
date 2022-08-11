import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeComment } from "../../../../store/comments";

const DeleteCommentModal = ({ comment, setShowConfirmDeleteCommentModal, setShowCommentEditModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cancelDelete = () => {
    setShowConfirmDeleteCommentModal(false);
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    await dispatch(removeComment(comment.id));
    history.push("/posts");
  };

  return (
    <main>
      <div>
        <h2 style={{
          color: "black"
        }}>Are you sure you want to delete your comment?</h2>
        <div>
          <button onClick={cancelDelete}>Cancel</button>
          <button onClick={deleteComment}>Delete</button>
        </div>
      </div>
    </main>
  );
};

export default DeleteCommentModal;
