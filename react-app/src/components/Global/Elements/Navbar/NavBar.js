import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "./UserMenu";
// import EventzeitLogo from "../../images/EventzeitMainLogo.png";
import { login } from "../../../../store/session";
import "./navBar.css";
import LoginForm from "../../../auth/LoginForm/LoginForm";
import { Modal } from "../Modal";
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";

const NavigationBar = styled.div`
  margin-left: 20vw;
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 40px;
  align-items: center;
  justify-content: space-around;
`;

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!user) setLoggedIn(false);
    if (user) setLoggedIn(true);
  }, [user, loggedIn]);

  const demoLogIn = () => {
    dispatch(login("demo@aa.io", "password"));
  };

  return (
    <div>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginFormPosts
            setShowLogin={setShowLogin}
          />
        </Modal>
      )}
      {/* {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginForm setShowLogin={setShowLogin} />
        </Modal>
      )} */}
      <div className="navBarWrapper">
        <div className="navBarDiv1">
          <NavLink to="/" exact={true} activeClassName="navlink navBarDiv1">
            {/* <Logo src={`${EventzeitLogo}`} /> */}
          </NavLink>
        </div>
        <NavigationBar className="navBarDiv2">
          {!loggedIn && (
            <>
              <div className="navlink-container">
                <NavLink
                  to="/"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ textDecoration: "none" }} className="navlink">
                    Home
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/posts"
                  exact={true}
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ textDecoration: "none" }} className="navlink">
                    Posts
                  </div>
                </NavLink>
              </div>
              <div>
                <button onClick={demoLogIn} className="navlink">
                  Demo User
                </button>
              </div>
              <div>
                <button className="navlink" onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </div>
              <NavLink
                to="/signup"
                activeClassName="active"
                style={{ textDecoration: "none" }}
              >
                <p className="navlink">Signup</p>
              </NavLink>
            </>
          )}
          {loggedIn && user && (
            <>
              <div className="navlink-container">
                <NavLink
                  to="/"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <p className="navlink">Home</p>
                </NavLink>
              </div>
              <div className="navlink-container">
                <NavLink
                  to="/posts/create"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <p className="navlink">Create</p>
                </NavLink>
              </div>
              <div className="navlink-container">
                <NavLink
                  to="/posts"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <p className="navlink">Posts</p>
                </NavLink>
              </div>
              {/* <div>
                <NavLink to="/userposts" exact={true} activeClassName="active">
                  <p className="navlink">Profile</p>
                </NavLink>
              </div> */}
              <div>
                <UserMenu user={user} />
              </div>
            </>
          )}
        </NavigationBar>
      </div>
    </div>
  );
};

export default NavBar;
