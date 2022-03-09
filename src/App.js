import { Switch, Route, Redirect } from "react-router-dom";
import React, { Suspense } from "react";
import routes from "./routes";
import AuthRoute from "./components/auth-route";
import Header from "./containers/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<React.Fragment />}>
        <Switch>
          {routes.map((route, index) => {
            return route.authRequired ? (
              <AuthRoute
                component={route.component}
                exact={route.exact}
                key={index}
                name={route.name}
                path={route.path}
                title={route.title}
              />
            ) : (
              <Route
                component={route.component}
                exact={route.exact}
                key={index}
                name={route.name}
                path={route.path}
                title={route.title}
              />
            );
          })}
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
