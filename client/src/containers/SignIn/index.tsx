import React from "react";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useStyles } from "./styles";

import {
  changeUserName as changeUserNameAction,
  changePassword as changePasswordAction,
  doSignIn as doSignInAction
} from "./actions";
import { selectUserName, selectPassword, selectLoading } from "./selectors";

const SignIn: React.FC = (props: any): any => {
  const {
    userName,
    password,
    loading,
    changeUserName,
    changePassword,
    doSignIn
  } = props;
  const classes = useStyles();

  const handleChangeUserName = (event: any) => {
    changeUserName(event.target.value);
  };

  const handleChangePassword = (event: any) => {
    changePassword(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={userName}
            onChange={handleChangeUserName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={handleChangePassword}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doSignIn}
            disabled={loading ? true : false}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  loading: selectLoading(state),
  userName: selectUserName(state),
  password: selectPassword(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
  doSignIn: () => dispatch(doSignInAction()),
  changeUserName: (userName: string) =>
    dispatch(changeUserNameAction(userName)),
  changePassword: (password: string) => dispatch(changePasswordAction(password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
