import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import login from "./login";

export default history =>
  combineReducers({
    router: connectRouter(history),
    login
  });
