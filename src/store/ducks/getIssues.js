import { createAction, handleActions } from "redux-actions";

// Action creators
export const getIssuesRequest = createAction("GET_ISSUES_REQUEST");
export const getIssuesSuccess = createAction("GET_ISSUES_SUCCESS");
export const getIssuesFailure = createAction("GET_ISSUES_FAILURE");

// Reducer

const defaultState = {
  data: [],
  loading: false,
  success: false,
  errors: false
};

export default handleActions(
  {
    [getIssuesRequest]: state => ({
      ...state,
      loading: true,
      success: false,
      errors: false
    }),
    [getIssuesSuccess]: (state, action) => ({
      ...state,
      data: action.payload,
      loading: false,
      success: true,
      errors: false
    }),
    [getIssuesFailure]: state => ({
      ...state,
      loading: false,
      success: false,
      errors: true
    })
  },
  defaultState
);
