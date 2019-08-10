import { all } from "redux-saga/effects";
import login from "./login";
import getProjects from "./getProjects";
import getIssues from "./getIssues";
import getSingleIssues from "./getSingleIssues";
import trackTime from "./trackTime";

export default function* rootSaga() {
  yield all([
    login(),
    getProjects(),
    getIssues(),
    getSingleIssues(),
    trackTime()
  ]);
}
