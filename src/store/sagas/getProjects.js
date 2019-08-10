import { takeLatest, put, call } from "redux-saga/effects";
import {
  getProjectsSuccess,
  getProjectsFailure
} from "store/ducks/getProjects";
import axios from "services/axiosInterceptors";

// eslint-disable-next-line camelcase
const get_projects_api = "/projects.json";

const getProjectsApi = () => {
  return axios({
    method: "GET",
    url: get_projects_api,
    headers: {
      Authorization: `Basic ${btoa(
        `${sessionStorage.getItem("login")}:${sessionStorage.getItem(
          "password"
        )}`
      )}`,
      "Content-Type": "application/json"
    }
  });
};

function* worker() {
  try {
    const { data } = yield call(getProjectsApi);
    yield put(getProjectsSuccess(data));
  } catch (errors) {
    yield put(getProjectsFailure());
  }
}

export default function* watcher() {
  yield takeLatest("GET_PROJECTS_REQUEST", worker);
}
