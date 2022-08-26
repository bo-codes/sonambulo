import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/Global/Elements/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Posts from "./components/Pages/ExplorePage/ExplorePage";
import CreatePost from "./components/Pages/CreatePostPage/CreatePost";
import { authenticate } from "./store/session";
import Signup from "./components/auth/Pages/SignupPage/Signup";
import Footer from "./components/Global/Elements/Footer/index";
import HomePage from "./components/Pages/HomePage/HomePage";
import SplashPage from "./components/Pages/SplashPage/SplashPage";
import ErrorPage from "./components/Pages/404/404";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import UsersProfilePage from "./components/Pages/usersProfilePage/UsersProfilePage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path="/users">
          <UsersProfilePage />
        </Route>
        <Route path="/home" exact={true}>
          <HomePage />
        </Route>
        <Route path="/explore" exact={true}>
          <Posts />
        </Route>
        <Route path="/profile" exact={true}>
          <ProfilePage />
        </Route>
        <ProtectedRoute path="/create" exact={true}>
          <CreatePost />
        </ProtectedRoute>
        <Route path="/signup" exact={true}>
          <Signup />
        </Route>
        <Route path="">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
