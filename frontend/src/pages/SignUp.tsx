import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "api/index";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import { request } from 'http';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#cddc39",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const history = useHistory();

  // @TODO:Anyを適切な型にする target内の型を指定する良い方法があればいい。もしくは別で定義する？ https://zenn.dev/koduki/articles/0f8fcbc9a7485b
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const requestData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    const res = await api.auth.postUserRegister(requestData);
    if (res === undefined) {
      setError(true);
    } else {
      history.push("/");
    }
  };

  useEffect((): void => {
    async function isLoggedIn() {
      const res = await api.auth.getUserMe();
      if (res !== undefined) history.push("/");
    }
    isLoggedIn();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="ユーザーネーム"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            新規登録
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                既に登録されている方はこちらから
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
