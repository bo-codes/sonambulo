import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout()).then(() => {
      history.push(`/`);
      return;
    });
  };

  return (
    <button className="dropdown" onClick={onLogout} style={{ width: "90px" }}>
      Logout
    </button>
  );
};

export default LogoutButton;
