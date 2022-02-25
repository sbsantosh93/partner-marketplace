import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage: storage
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, reducers)

export const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store)
