import { createAction, handleActions } from "redux-actions";

// Action creators
export const trackTimeRequest = createAction("TRACK_TIME_REQUEST");
export const trackTimeSuccess = createAction("TRACK_TIME_SUCCESS");
export const trackTimeFailure = createAction("TRACK_TIME_FAILURE");

// Reducer

const defaultState = {
  data: [],
  loading: false,
  success: false,
  errors: false
};

export default handleActions(
  {
    [trackTimeRequest]: state => ({
      ...state,
      loading: true,
      success: false,
      errors: false
    }),
    [trackTimeSuccess]: (state, action) => ({
      ...state,
      data: action.payload,
      loading: false,
      success: true,
      errors: false
    }),
    [trackTimeFailure]: state => ({
      ...state,
      loading: false,
      success: false,
      errors: true
    })
  },
  defaultState
);
