import { fromJS } from "immutable";

import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  DO_SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL
} from "./constants";

const initialState = fromJS({
  userName: "",
  password: "",
  loading: false,
  error: ""
});

const signInReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state.set("userName", action.userName);
    case CHANGE_PASSWORD:
      return state.set("password", action.password);
    case DO_SIGNIN:
      return state.set("loading", true);
    case SIGNIN_SUCCESS:
      localStorage.setItem("token", action.token);
      return state.set("loading", false);
    case SIGNIN_FAIL:
      return state.set("error", action.error).set("loading", false);
    default:
      return state;
  }
};

export default signInReducer;
