import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { Suspense } from "react";

import Login from "./containers/login";
import AuthContextProvider from "./contexts/AuthContext";
import routes from "./routes";
import AuthRoute from "./components/auth-route";

import Header from "./components/header/index";
function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Header />
      </div>
    </AuthContextProvider>
  );
}

export default App;
