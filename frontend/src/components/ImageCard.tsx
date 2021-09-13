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

//interfaces
import { IImage, IUser, IFavoriteImageResponse } from "interfaces/api";

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
  })
);

export default function ImageCard(props: any) {
  const classes = useStyles();
  // const [, setExpanded] = useState([]);

  const images: IImage[] = props.images;
  const [color, setColor] = useState<any>("");

  const removeImage = (index: number) => {
    props.setImages(
      images.filter((item, itemIndex) => {
        return index !== itemIndex;
      })
    );
  };

  const favoriteImage = (item: IImage, index: number) => {
    // setColor("primary")
    props.onClickFavoriteButton(item);
    removeImage(index);
  };

  return (
    <div className={classes.root}>
      {images.map((item: IImage, index) => (
        <Card className={classes.card} key={index}>
          <CardMedia className={classes.media} image={item.large_image_url} />
          <CardActions className={classes.cardActions}>
            <IconButton aria-label="not favorited">
              <CloseIcon fontSize="large" onClick={() => removeImage(index)} />
            </IconButton>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                fontSize="large"
                onClick={() => favoriteImage(item, index)}
              />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
