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

export default function Home() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      imageList: {
        flexWrap: "nowrap",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        width: 500,
        height: 500,
        transform: "translateZ(0)",
      },
      title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      },
    })
  );

  const classes = useStyles();
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

  return (
    <Container component="main">
      {images.map((item) => (
        <div key={item.image_id}>
          <img src={item.webformat_url} alt={item.page_url}></img>
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={toHome}>
        お気に入り画像を見つけに行く
      </Button>
    </Container>
  );
}
