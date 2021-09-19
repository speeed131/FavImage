import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//interfaces
import { IImage } from "interfaces/api";

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
      paddingBottom: 48,
    },
    dialogActions: {
      display: "flex",
      justifyContent: "space-around",
    },
  })
);

export default function ImageCard(props: any) {
  const classes = useStyles();

  const images: IImage[] = props.images;
  // const [color, setColor] = useState<any>("");
  const [beforeImages, setBeforeImages] = useState<any>();
  const [isEnableBeforeImagesButton, setIsEnableBeforeImagesButton] =
    useState<boolean>(false);

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
      props.setIsOpenDialog(true);
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

  return (
    <div className={classes.root}>
      {images.map((item: IImage, index) => (
        <Card className={classes.card} key={index}>
          <CardMedia className={classes.media} image={item.large_image_url} />
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
  );
}
