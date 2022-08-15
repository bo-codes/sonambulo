import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../../store/session";

import "./LoginFormCreate.css";

const LoginFormPosts = ({ setShowLogin, setShowSignup }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setShowLogin(false);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  if (user) {
    return <Redirect to="/posts" />;
  }

  return (
    <>
      <h1 id="login-header">SIGN IN</h1>
      <form onSubmit={onLogin}>
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
                  <li
                    key={error}
                    style={{
                      color: "white",
                    }}
                  >
                    <span
                      style={{
                        color: "#9387bc",
                      }}
                    >
                      ✖
                    </span>
                    {/* {firstLetter + firstPart.slice(1) + secondPart} */}
                    {splitError[1]}
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <div className="login-fields">
            <label className="login-input-label" htmlFor="email">
              EMAIL<span style={{ color: "red" }}> *</span>
            </label>
            <input
              className="login-input-box"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="login-fields">
            <label className="login-input-label" htmlFor="password">
              PASSWORD<span style={{ color: "red" }}>  *</span>
            </label>
            <input
              className="login-input-box"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
      <NavLink
        id="signup-reroute"
        to={"/signup"}
        onClick={() => setShowLogin(false)}
      >
        NO ACCOUNT?
      </NavLink>
    </>
  );
};

export default LoginFormPosts;
