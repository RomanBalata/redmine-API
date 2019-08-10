import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import login from "./login";
import getProjects from "./getProjects";
import getIssues from "./getIssues";
import getSingleIssues from "./getSingleIssues";
import trackTime from "./trackTime";
import popUp from "./popUp";

export default history =>
  combineReducers({
    router: connectRouter(history),
    login,
    getProjects,
    getIssues,
    getSingleIssues,
    trackTime,
    popUp
  });
