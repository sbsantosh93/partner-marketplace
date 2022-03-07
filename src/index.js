import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from "./App";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./redux/store";
import client from "./services/api";
import { ApolloProvider } from "@apollo/react-hooks";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
