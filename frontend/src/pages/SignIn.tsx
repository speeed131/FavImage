import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "api/index";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#cddc39",
  },
}));

export default function SignIn() {
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
    const res = await api.auth.postUserLogin(requestData);
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
          ログイン
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="ユーザーネーム"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            ログイン
          </Button>
        </form>
      </div>
    </Container>
  );
}
