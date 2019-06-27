import { createSelector } from "reselect";

const selectSignInState = (state: any) => state.signIn;

const selectUserName = createSelector(
  selectSignInState,
  (substate: any) => substate.get("userName")
);

const selectPassword = createSelector(
  selectSignInState,
  (substate: any) => substate.get("password")
);

const selectLoading = createSelector(
  selectSignInState,
  (substate: any) => substate.get("loading")
);

export { selectUserName, selectPassword, selectLoading };
