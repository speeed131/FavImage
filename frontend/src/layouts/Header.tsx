import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import pink from '@material-ui/core/colors/pink';


import { api } from "api/index";
import { utils } from "utils";
import { util } from "prettier";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      backgroundColor: "#cddc39"

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    headerTitle: {
      flexGrow: 1,
      cursor: "pointer",
      fontWeight: "bold"
    },
    headerSectionRight: {
      display: "flex",
    },
    headerSectionRightSignup: {
      marginRight: theme.spacing(2),
    },
    headerButton: {
      cursor: "pointer",
    },
  })
);

export default function MenuAppBar() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //@FIXME: レイアウトの中でapi呼ぶのよくなさそう。
  useEffect((): void => {
    async function isLoggedIn() {
      const res = await api.auth.getUserMe();
      res === undefined ? setAuth(false) : setAuth(true);
    }
    isLoggedIn();
  }, [location]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const toMoveSignUp = () => {
    history.push("/sign-up");
  };

  const toMoveSignIn = () => {
    history.push("/sign-in");
  };

  const toMoveHome = () => {
    history.push("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    utils.removeLocalToken();
    handleClose();
    history.push("/sign-in");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.header}>
        <Toolbar>
          <Typography
            variant="h5"
            onClick={toMoveHome}
            className={classes.headerTitle}
          >
            FavImage
          </Typography>
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="medium"
              >
                <AccountCircle fontSize="medium" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className={classes.headerSectionRight}>
              <Typography
                variant="button"
                className={[
                  classes.headerSectionRightSignup,
                  classes.headerButton,
                ].join(" ")}
                onClick={toMoveSignUp}
              >
                SignUp
              </Typography>
              <Typography
                variant="button"
                className={classes.headerButton}
                onClick={toMoveSignIn}
              >
                SignIn
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
