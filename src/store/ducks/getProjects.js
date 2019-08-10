import { createAction, handleActions } from "redux-actions";

// Action creators
export const getProjectsRequest = createAction("GET_PROJECTS_REQUEST");
export const getProjectsSuccess = createAction("GET_PROJECTS_SUCCESS");
export const getProjectsFailure = createAction("GET_PROJECTS_FAILURE");

// Reducer

const defaultState = {
  data: [],
  loading: false,
  success: false,
  errors: false
};

export default handleActions(
  {
    [getProjectsRequest]: state => ({
      ...state,
      loading: true,
      success: false,
      errors: false
    }),
    [getProjectsSuccess]: (state, action) => ({
      ...state,
      data: action.payload,
      loading: false,
      success: true,
      errors: false
    }),
    [getProjectsFailure]: state => ({
      ...state,
      loading: false,
      success: false,
      errors: true
    })
  },
  defaultState
);
