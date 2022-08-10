import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Posts from "./components/auth/Posts";
import CreatePost from "./components/auth/CreatePost";
import { authenticate } from "./store/session";
import Signup from "./components/auth/Pages/Signup";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

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
          <h1>My Home Page</h1>
        </Route>
        <Route path="/posts" exact={true}>
          <Posts />
        </Route>
        <Route path="/profile" exact={true}>
          {/* <Posts /> */}
        </Route>
        <ProtectedRoute path="/posts/create" exact={true}>
          <CreatePost />
        </ProtectedRoute>
        <Route path="/signup" exact={true}>
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
