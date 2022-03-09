import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from "./App";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./redux/store";
import client from "./services/api";
import { ApolloProvider } from "@apollo/react-hooks";
import AuthContextProvider from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
        <Router history={history}>
        <AuthContextProvider>
          <App />
          </AuthContextProvider>
          </Router>
        </ApolloProvider>
       
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
