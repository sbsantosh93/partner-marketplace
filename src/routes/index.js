import React from "react";
const Home = React.lazy(() => import("../containers/login"));
const CarPartner = React.lazy(() => import("../containers/login"));
const Login = React.lazy(() => import("../containers/loginPage"));
const Signup = React.lazy(() => import("../containers/SignupPage"));

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Home,
    authRequired: false,
  },
  {
    path: "/carpartner",
    exact: true,
    name: "CarPartner",
    component: CarPartner,
    authRequired: false,
  },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    authRequired: false,
  },

];
export default routes;
