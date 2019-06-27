import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  DO_SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL
} from "./constants";

export const changeUserName = (userName: string) => ({
  type: CHANGE_USERNAME,
  userName
});

export const changePassword = (password: string) => ({
  type: CHANGE_PASSWORD,
  password
});

export const doSignIn = () => ({
  type: DO_SIGNIN
});

export const signInSuccess = (token: string) => ({
  type: SIGNIN_SUCCESS,
  token
});

export const signInFail = (error: any) => ({
  type: SIGNIN_FAIL,
  error
});
