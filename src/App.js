// src/App.js
import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage"
import Toolbar from "./components/Toolbar"
import { useDispatch } from "react-redux";
import { bootstrapLoginState } from "./store/auth/actions"

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapLoginState());
  }, []);

  return (
    <div>
      <Toolbar />
      <Switch>
        {/* more pages to be added here later */}
        <Route path="/post/:id" component={PostPage} />
        <Route path="/login" component={LoginPage} />
        <Route component={HomePage} />
      </Switch>
    </div>
  );
}
