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
    root: {
      position: "relative",
    },
    card: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 640,
    },
    cardActions: {
      display: "flex",
      justifyContent: "space-around",
    },
    media: {
      height: 470,
    },
    backButton: {
      position: "absolute",
      top: 550,
      left: 0,
    },
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

export default function ImageCard(props: any) {
  //@TODO: ダイアログを別コンポーネントに移動し、home.tsxでまとめる
  const classes = useStyles();

  const images: IImage[] = props.images;
  // const [color, setColor] = useState<any>("");
  const [beforeImages, setBeforeImages] = useState<any>();
  const [isEnableBeforeImagesButton, setIsEnableBeforeImagesButton] =
    useState<boolean>(false);

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleOpen = (images: IImage[] | []) => {
    if (images === []) {
      setIsOpenDialog(true);
    }
  };

  const handleClose = () => {
    setIsOpenDialog(false);
  };

  const removeImage = (index: number) => {
    setBeforeImages([...images]);
    props.setImages(
      images.filter((item, itemIndex) => {
        // setBeforeImage(item)
        return index !== itemIndex;
      })
    );
    setIsEnableBeforeImagesButton(true);
    if (index === 0) {
      setIsOpenDialog(true);
    }
  };

  const backToBeforeImage = () => {
    props.setImages(beforeImages);
    setIsEnableBeforeImagesButton(false);
  };

  const favoriteImage = (item: IImage, index: number) => {
    props.onClickFavoriteButton(item);
    removeImage(index);
    setIsEnableBeforeImagesButton(false);
  };

  const toMoveHome = () => {
    props.history.go(0)
  };

  const toMoveFavorite = () => {
    props.history.push("/favorite/images");
  }

  return (
    <div className={classes.root}>
      {isOpenDialog ? (
        <Dialog
          open={isOpenDialog}
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
      ) : (
        <div>
          {images.map((item: IImage, index) => (
            <Card className={classes.card} key={index}>
              <CardMedia
                className={classes.media}
                image={item.large_image_url}
              />
              <CardActions className={classes.cardActions}>
                <IconButton
                  aria-label="not favorited"
                  onClick={() => removeImage(index)}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => favoriteImage(item, index)}
                >
                  <FavoriteIcon fontSize="large" style={{ color: "#cddc39" }} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
          {isEnableBeforeImagesButton && (
            <IconButton
              className={classes.backButton}
              onClick={() => backToBeforeImage()}
              size="small"
            >
              <ArrowBackIcon fontSize="large" color="primary" />
              前の画像に戻る
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
}
