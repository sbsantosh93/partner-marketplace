import "./App.css";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import React,{Suspense} from 'react'

import Login from "./containers/login";
import AuthContextProvider from "./contexts/AuthContext";
import routes from './routes'
import AuthRoute from "./components/auth-route";



function App() {

  return (
    <AuthContextProvider>
    <div className="App">
      <Router>
        {/* <Header /> */}
        {/* <Switch>
          <Route path="/" exact component={Login}/>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductListing} />
          <Route path="/product/:productId"  exact component={ProductDetail} />
          <Route>404 Not Found!</Route>
        </Switch> */}

<Suspense fallback={<React.Fragment />}>
              <Switch>
                {routes.map((route: Object, index: number) => {
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
                  )
                })}
                <Redirect to="/not-found" />
              </Switch>
            </Suspense>
      </Router>
    </div>
    </AuthContextProvider>
  );
}

export default App;
