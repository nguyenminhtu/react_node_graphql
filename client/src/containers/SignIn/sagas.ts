import { fork, all, call, takeLatest, put, select } from "redux-saga/effects";
import gql from "graphql-tag";

import { DO_SIGNIN } from "./constants";
import { signInSuccess, signInFail } from "./actions";
import { selectUserName, selectPassword } from "./selectors";
import { client } from "../../services/client";

const signInMutation = gql`
  mutation signIn($userName: String!, $password: String!) {
    signin(userName: $userName, password: $password) {
      token
    }
  }
`;

const requestSignIn = (userName: string, password: string) => {
  return client.mutate({
    mutation: signInMutation,
    variables: { userName, password }
  });
};

function* doSignInSaga() {
  try {
    const userName = yield select(selectUserName);
    const password = yield select(selectPassword);
    const response = yield call(requestSignIn, userName, password);
    yield put(signInSuccess(response.data.signin.token));
  } catch (err) {
    yield put(signInFail(err.toString()));
  }
}

function* doSignInWatcher() {
  yield takeLatest(DO_SIGNIN, doSignInSaga);
}

export default function* watchSagas() {
  yield all([fork(doSignInWatcher)]);
}
