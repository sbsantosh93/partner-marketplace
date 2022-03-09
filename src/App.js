import "./App.css";
import {
  Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { Suspense } from "react";

import Login from "./containers/loginPage";
import Signup from "./containers/SignupPage";
import AuthContextProvider from "./contexts/AuthContext";
import routes from "./routes";
import AuthRoute from "./components/auth-route";
import { history } from "./index";
import Header from "./components/header/index";
function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <div>
              <Header />
              <Suspense fallback={<React.Fragment />}>
                {routes.map((route: Object, index: number) => {
                  return route.authRequired ? (
                    <AuthRoute
                      component={route.component}
                      exact={true}
                      key={index}
                      name={route.name}
                      path={route.path}
                      title={route.title}
                    />
                  ) : (
                    <Route
                      component={route.component}
                      exact
                      key={index}
                      name={route.name}
                      path={route.path}
                      title={route.title}
                    />
                  );
                })}
                <Redirect to="/not-found" />
              </Suspense>
            </div>
          </Switch>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
