import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//api

// layouts
import Header from "layouts/Header";
import SideBar from "layouts/SideBar";

// page
import Landing from "./pages/Landing";
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
              <Route path="/lp" component={Landing} exact></Route>
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
