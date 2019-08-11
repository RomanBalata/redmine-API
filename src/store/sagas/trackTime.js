/* eslint-disable no-undef */
import { takeLatest, put, call } from "redux-saga/effects";
import { trackTimeSuccess, trackTimeFailure } from "store/ducks/trackTime";
import { showPopUp } from "store/ducks/popUp";
import axios from "services/axiosInterceptors";

// eslint-disable-next-line camelcase
const track_time_api = "/time_entries.json";

const trackTimeApi = (time, id) => {
  return axios({
    method: "POST",
    url: track_time_api,
    data: {
      time_entry: {
        project_id: id,
        hours: time
      }
    }
  });
};
function* worker({
  payload: {
    values: { time },
    id,
    actions: { resetForm }
  }
}) {
  try {
    const { data } = yield call(trackTimeApi, time, id);
    yield put(trackTimeSuccess(data));
    yield call(resetForm);
    yield put(showPopUp("You added time"));
  } catch (errors) {
    yield put(trackTimeFailure());
  }
}

export default function* watcher() {
  yield takeLatest("TRACK_TIME_REQUEST", worker);
}
