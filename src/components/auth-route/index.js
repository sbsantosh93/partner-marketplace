import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";


const AuthRoute = (props) => {
  const token = useSelector((state: any) =>state.login.token )
  const { path } = props;

  return token ? (
    <>
      <Route
        component={props.component}
        exact={props.exact}
        name={props.name}
        title={props.title}
        path={props.path}
        {...props}
      />
    </>
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: path },
      }}
    />
  );
};

export default AuthRoute;
