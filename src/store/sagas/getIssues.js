import { takeLatest, put, call } from "redux-saga/effects";
import { getIssuesSuccess, getIssuesFailure } from "store/ducks/getIssues";
import axios from "services/axiosInterceptors";

// eslint-disable-next-line camelcase
const get_issues_api = "/issues.json";

const getIssuesApi = () => {
  return axios({
    method: "GET",
    url: get_issues_api,
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
    const { data } = yield call(getIssuesApi);
    yield put(getIssuesSuccess(data));
  } catch (errors) {
    yield put(getIssuesFailure());
  }
}

export default function* watcher() {
  yield takeLatest("GET_ISSUES_REQUEST", worker);
}
