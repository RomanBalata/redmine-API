import { takeLatest, put, call } from "redux-saga/effects";
import {
  getSingleIssuesSuccess,
  getSingleIssuesFailure
} from "store/ducks/getSingleIssues";
import axios from "services/axiosInterceptors";

// eslint-disable-next-line camelcase
const get_issues_api = "/issues.json";

const getIssuesApi = id => {
  return axios({
    method: "GET",
    url: get_issues_api,
    params: {
      issue_id: id
    }
  });
};

function* worker({ payload: { id } }) {
  try {
    const { data } = yield call(getIssuesApi, id);
    yield put(getSingleIssuesSuccess(data));
  } catch (errors) {
    yield put(getSingleIssuesFailure());
  }
}

export default function* watcher() {
  yield takeLatest("GET_SINGLE_ISSUES_REQUEST", worker);
}
