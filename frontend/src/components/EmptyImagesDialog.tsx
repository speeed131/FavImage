import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

//interfaces
import { IImage, IUser, IFavoriteImageResponse } from "interfaces/api";
import { StayPrimaryLandscapeOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      minHeight: 470,
    },
    dialogTitle: {
      textAlign: "center",
      paddingTop: 16,
      paddingBottom: 48
    },
    dialogActions: {
      display: "flex",
      justifyContent: "space-around"

    },
  })
);

export default function EmptyImagesDialog(props: any) {
  const classes = useStyles();

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  const toMoveHome = () => {
    props.history.go(0)
  };

  const toMoveFavorite = () => {
    props.history.push("/favorite/images");
  }

  return (
        <Dialog
          open={props.isOpenDialog}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="dialog"
          fullWidth={true}
          max-width="lg"
          className={classes.dialog}
        >
          <DialogTitle className={classes.dialogTitle}>
            お気に入りの画像は見つかりましたか？
          </DialogTitle>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={toMoveFavorite} style={{ backgroundColor: "#cddc39", color: "white", fontWeight:"bold" }}>
              はい、お気に入りした画像を見る
            </Button>
            <Button onClick={toMoveHome} color="inherit">
              いいえ、まだ探す
            </Button>
          </DialogActions>
        </Dialog>
  );
}
