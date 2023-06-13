import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";
// window.$authUser = JSON.parse(localStorage.getItem("userRoles"))
window.$authUser = "admin";
window.$isAuthenticated = false;
// JSON.parse(localStorage.getItem("isAuthenticated"))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
