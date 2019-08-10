import { createAction, handleActions } from "redux-actions";

// Action creators
export const showPopUp = createAction("SHOW_POP_UP");
export const hidePopUp = createAction("HIDE_POP_UP");

// Reducer

const defaultState = {
  show: false,
  message: ""
};

export default handleActions(
  {
    [showPopUp]: (state, action) => ({
      show: true,
      message: action.payload
    }),
    [hidePopUp]: () => ({
      show: false,
      message: ""
    })
  },
  defaultState
);
