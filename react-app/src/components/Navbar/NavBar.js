import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "./UserMenu";
// import EventzeitLogo from "../../images/EventzeitMainLogo.png";
import { login } from "../../store/session";
import "./navBar.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { Modal } from "../Global/Elements/Modal";

const NavigationBar = styled.div`
  margin-left: 20vw;
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 40px;
  align-items: center;
  justify-content: space-around;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 12rem;
  height: auto;
  padding-top: 0%;
  align-self: center;
`;

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
          <LoginForm setShowLogin={setShowLogin} />
        </Modal>
      )}
      {showSignup && (
        <Modal onClose={() => setShowSignup(false)}>
          <SignUpForm setShowSignup={setShowSignup} />
        </Modal>
      )}
      <div
        className="navBarWrapper"
        style={{
          // backgroundColor: "green",
          paddingLeft: "20px",
          height: "70px",
          // margin: "0px"
        }}
      >
        <div
          className="navBarDiv1"
          style={{
            // backgroundColor: "red",
            height: "100%",
            // alignItems: "center",
          }}
        >
          <NavLink
            to="/"
            exact={true}
            activeClassName="navlink navBarDiv1"
            style={{
              width: "205px",
              height: "100%",
            }}
          >
            {/* <Logo src={`${EventzeitLogo}`} /> */}
          </NavLink>
        </div>
        <NavigationBar className="navBarDiv2">
          {!loggedIn && (
            <>
              <div>
                <NavLink
                  to="/posts"
                  exact={true}
                  activeClassName="active"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <p className="navlink">Posts</p>
                </NavLink>
              </div>
              <div>
                <button
                  onClick={demoLogIn}
                  className="navlink"
                  style={{
                    border: "0px",
                    backgroundColor: "white",
                  }}
                >
                  Demo User
                </button>
              </div>
              <div>
                <button
                  className="navlink"
                  onClick={() => setShowLogin(true)}
                  style={{
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  className="navlink"
                  onClick={() => setShowSignup(true)}
                  style={{
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
          {loggedIn && user && (
            <>
              <div>
                <NavLink
                  to="/posts/create"
                  activeClassName="active"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <p className="navlink">Create</p>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/posts"
                  activeClassName="active"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <p className="navlink">Posts</p>
                </NavLink>
              </div>
              <div
                style={{
                  color: "#191923",
                  fontFamily: "Eina-semibold",
                }}
              >
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
