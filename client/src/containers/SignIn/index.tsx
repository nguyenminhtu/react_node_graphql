import React from "react";
import gql from 'graphql-tag';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useStyles } from "./styles";
import { client } from '../../services/client';

const uploadFileMutation = gql`
  mutation ($files: [Upload!]!) {
    uploadImages(files: $files) {
      path
    }
  }
`;

const SignIn: React.FC = (props: any): any => {
  const classes = useStyles();

  const uploadImages = (event: any): any => {
    return client.mutate({ mutation: uploadFileMutation, variables: { files: event.target.files } })
  };

  return (
    <>
      <input type="file" multiple id="file-upload" onChange={uploadImages} />
      <button onClick={uploadImages}>Click me</button>
    </>
    // <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     <Avatar className={classes.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Sign in
    //     </Typography>
    //     <form className={classes.form} noValidate>
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="Email Address"
    //         name="email"
    //         autoComplete="email"
    //         autoFocus
    //       />
    //       <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //       />
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         className={classes.submit}
    //       >
    //         Sign In
    //       </Button>
    //     </form>
    //   </div>
    // </Container>
  );
};

export default SignIn;
