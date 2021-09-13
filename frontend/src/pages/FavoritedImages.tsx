import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { api } from "api/index";
import { IImage, IUser, IFavoriteImageResponse } from "interfaces/api";
import { useHistory } from "react-router-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import StarIcon from "@material-ui/icons/Star";
import Container from "@material-ui/core/Container";
import ListSubheader from "@material-ui/core/ListSubheader";
import InfoIcon from "@material-ui/icons/Info";
import GetAppIcon from "@material-ui/icons/GetApp";

export default function Home() {
  const history = useHistory();

  const [images, setImages] = useState<IImage[] | []>([]);

  useEffect((): void => {
    async function fetchImages() {
      const res = await api.fav.getFavoriteImages();
      console.log(res);
      if (res === undefined) {
        setImages([]);
        history.push("/sign-in");
      } else {
        setImages(res);
      }
    }
    fetchImages();
  }, []);

  const toHome = () => {
    history.push("/");
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      },
      imageList: {
        width: 640,
        height: 470,
      },
      icon: {
        color: "rgba(255, 255, 255, 0.54)",
      },
    })
  );

  const classes = useStyles();

  const toMoveDownloadPage = (pageUrl: string) => {
    window.open(pageUrl, "_blank");
  };

  return (
    <div className={classes.root}>
      <ImageList rowHeight={470} cols={1} className={classes.imageList}>
        {images.map((item) => (
          <ImageListItem key={item.image_id}>
            <img src={item.large_image_url} alt={item.page_url} />
            <ImageListItemBar
              actionIcon={
                <IconButton
                  aria-label={`info about ${item.page_url}`}
                  className={classes.icon}
                  onClick={() => toMoveDownloadPage(item.page_url)}
                >
                  <GetAppIcon style={{ color: "#cddc39" }} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
