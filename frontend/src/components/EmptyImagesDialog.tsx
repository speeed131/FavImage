import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

//interfaces

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      minHeight: 470,
    },
    dialogTitle: {
      textAlign: "center",
      paddingTop: 16,
      paddingBottom: 48,
    },
    dialogActions: {
      display: "flex",
      justifyContent: "space-around",
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
    props.history.go(0);
  };

  const toMoveFavorite = () => {
    props.history.push("/favorite/images");
  };

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
        <Button
          onClick={toMoveFavorite}
          style={{
            backgroundColor: "#cddc39",
            color: "white",
            fontWeight: "bold",
          }}
        >
          はい、お気に入りした画像を見る
        </Button>
        <Button onClick={toMoveHome} color="inherit">
          いいえ、まだ探す
        </Button>
      </DialogActions>
    </Dialog>
  );
}
