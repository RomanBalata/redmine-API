/* eslint-disable no-undef */
import { takeLatest, put, call } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "store/ducks/login";
import { push } from "connected-react-router";
import axios from "services/axiosInterceptors";

// eslint-disable-next-line camelcase
const login_api = "/issues.json";

const loginApi = (login, password) => {
  return axios({
    method: "GET",
    url: login_api,
    headers: {
      Authorization: `Basic ${btoa(`${login}:${password}`)}`,
      "Content-Type": "application/json"
    }
  });
};

function* worker({
  payload: {
    values: { login, password },
    actions: { setErrors, setSubmitting }
  }
}) {
  // { payload }
  try {
    yield call(loginApi, login, password);
    sessionStorage.setItem("login", login);
    sessionStorage.setItem("password", password);
    yield put(push("/projects"));
    yield put(loginSuccess());
  } catch (errors) {
    yield put(loginFailure());
    yield call(setErrors, {
      login: "Invalid Email or Password",
      password: "Invalid Email or Password"
    });
  } finally {
    yield call(setSubmitting, false);
  }
}

export default function* watcher() {
  yield takeLatest("LOGIN_REQUEST", worker);
}
