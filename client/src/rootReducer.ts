import { combineReducers } from "redux";

import signInReducer from "./containers/SignIn/reducers";

export default function createReducer(): any {
  const rootReducer: any = combineReducers({
    signIn: signInReducer
  });

  return rootReducer;
}
