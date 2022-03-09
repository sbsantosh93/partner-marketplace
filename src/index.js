import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./redux/store";
import client from "./services/api";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <PersistGate persistor={persistor}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </PersistGate>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
