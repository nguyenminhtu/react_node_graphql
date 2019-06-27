import { all } from "redux-saga/effects";

import signInSaga from "./containers/SignIn/sagas";

export default function* rootSaga() {
  yield all([signInSaga()]);
}
