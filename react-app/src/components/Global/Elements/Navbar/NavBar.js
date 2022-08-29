import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import { login } from "../../../../store/session";
import { Modal } from "../Modal";
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";
import "./navBar.css";

const NavigationBar = styled.div`
  margin-left: 20vw;
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 40px;
  align-items: center;
  justify-content: end;
`;

const NavBar = () => {
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const currentPage = window.location.href.split("/")[-1];

  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!user) setLoggedIn(false);
    if (user) setLoggedIn(true);
  }, [user, loggedIn]);

  const demoLogIn = () => {
    dispatch(login("demo@aa.io", "password"));
    history.push("/home");
  };

  return (
    <div>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginFormPosts setShowLogin={setShowLogin} />
        </Modal>
      )}
      <div className="navBarWrapper">
        <div className="navBarDiv1">
          <NavLink to="/" exact={true} activeClassName="navlink navBarDiv1">
            <div className="logo-link"></div>
          </NavLink>
        </div>
        <NavigationBar className="navBarDiv2">
          {!loggedIn && (
            <>
              {/* <div className="navlink-container">
                <NavLink
                  to="/explore"
                  exact={true}
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink ${
                      window.location.pathname == "/explore"
                        ? "explore-link-selected"
                        : "explore-link"
                    }`}
                  ></div>
                </NavLink>
              </div> */}
              <div className="navlink-container">
                <button onClick={demoLogIn} className="navlink">
                  Demo
                </button>
              </div>
              <div className="navlink-container">
                <button className="navlink" onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </div>
              <div className="navlink-container">
                <NavLink
                  to="/signup"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <p className="navlink">Signup</p>
                </NavLink>
              </div>
            </>
          )}
          {loggedIn && user && (
            <>
              <div className="navlink-container">
                <NavLink
                  to="/home"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink ${
                      window.location.pathname == "/home"
                        ? "home-link-selected"
                        : "home-link"
                    }`}
                  ></div>
                </NavLink>
              </div>
              <div className="navlink-container">
                <NavLink
                  to="/create"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink ${
                      window.location.pathname == "/create"
                        ? "create-link-selected"
                        : "create-link"
                    }`}
                  ></div>
                </NavLink>
              </div>
              <div className="navlink-container">
                <NavLink
                  to="/explore"
                  exact={true}
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink ${
                      window.location.pathname == "/explore"
                        ? "explore-link-selected"
                        : "explore-link"
                    }`}
                  ></div>
                </NavLink>
              </div>
              <div className="navlink-container">
                <NavLink
                  to="/profile"
                  exact={true}
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink ${
                      window.location.pathname == "/profile"
                        ? "profile-link-selected"
                        : "profile-link"
                    }`}
                  ></div>
                </NavLink>
              </div>
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
