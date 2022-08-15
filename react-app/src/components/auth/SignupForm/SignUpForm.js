import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./SignupForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
    const data = await dispatch(
      signUp(username, email, password, repeatPassword)
    );
    if (data) {
      setErrors(data);
    }
    // }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/posts" />;
  }

  return (
    <div className="page-container">
      <div className="form-half">
        <div className="form-container">
          <div className="signup-title">SIGN UP</div>
          <form onSubmit={onSignUp} novalidate="novalidate" className="form">
            <div className="errors">
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
            <div>
              {/* <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div> */}
              <div className="login-fields">
                <label className="login-input-label">User Name</label>
                <input
                  className="login-input-box"
                  type="text"
                  name="username"
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div className="login-fields">
                <label className="login-input-label">Email</label>
                <input
                  className="login-input-box"
                  type="text"
                  name="email"
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div className="login-fields">
                <label className="login-input-label">Password</label>
                <input
                  className="login-input-box"
                  type="password"
                  name="password"
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div className="login-fields">
                <label className="login-input-label">Repeat Password</label>
                <input
                  className="login-input-box"
                  type="password"
                  name="confirmPassword"
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
            </div>
            <button className="login-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="image-half"></div>
    </div>
  );
};

export default SignUpForm;
