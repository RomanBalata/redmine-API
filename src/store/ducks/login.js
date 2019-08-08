import { createAction, handleActions } from "redux-actions";

// Action creators
export const loginRequest = createAction("LOGIN_REQUEST");
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginFailure = createAction("LOGIN_FAILURE");

// Reducer

const defaultState = {
  loading: false,
  success: false,
  errors: false
};

export default handleActions(
  {
    [loginRequest]: state => ({
      ...state,
      loading: true,
      success: false,
      errors: false
    }),
    [loginSuccess]: state => ({
      ...state,
      loading: false,
      success: true,
      errors: false
    }),
    [loginFailure]: state => ({
      ...state,
      loading: false,
      success: false,
      errors: true
    })
  },
  defaultState
);
