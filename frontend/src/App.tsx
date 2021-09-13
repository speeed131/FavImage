import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "./logo.svg";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import pink from "@material-ui/core/colors/pink";

//api
import { api } from "./api/index";
import { IImage } from "./interfaces/api";

// layouts
import Header from "layouts/Header";
import SideBar from "layouts/SideBar";

// page
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import FavoritedImages from "pages/FavoritedImages";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    marginTop: 64,
  },
  mainContent: {
    marginTop: 24,
  },
  mainContentWithSideBar: {
    marginLeft: 240,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Container>
        <Header></Header>
        <div className={classes.main}>
          <SideBar />
          <div className={classes.mainContent}>
            <Switch>
              <Route path="/sign-up" component={SignUp} exact />
              <Route path="/sign-in" component={SignIn} exact />
              <div className={classes.mainContentWithSideBar}>
                <Route path="/" component={Home} exact />
                <Route
                  path="/favorite/images"
                  component={FavoritedImages}
                  exact
                />
              </div>
            </Switch>
          </div>
        </div>
      </Container>
    </BrowserRouter>
  );
};

export default App;
