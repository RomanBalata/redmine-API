import { createAction, handleActions } from "redux-actions";

// Action creators
export const getSingleIssuesRequest = createAction("GET_SINGLE_ISSUES_REQUEST");
export const getSingleIssuesSuccess = createAction("GET_SINGLE_ISSUES_SUCCESS");
export const getSingleIssuesFailure = createAction("GET_SINGLE_ISSUES_FAILURE");

// Reducer

const defaultState = {
  data: [],
  loading: false,
  success: false,
  errors: false
};

export default handleActions(
  {
    [getSingleIssuesRequest]: state => ({
      ...state,
      loading: true,
      success: false,
      errors: false
    }),
    [getSingleIssuesSuccess]: (state, action) => ({
      ...state,
      data: action.payload,
      loading: false,
      success: true,
      errors: false
    }),
    [getSingleIssuesFailure]: state => ({
      ...state,
      loading: false,
      success: false,
      errors: true
    })
  },
  defaultState
);
