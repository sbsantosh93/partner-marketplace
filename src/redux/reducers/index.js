import { combineReducers } from "redux";
import { Authtentication } from "./reducers";

const reducers = combineReducers({
  login:Authtentication
});

export default reducers;
