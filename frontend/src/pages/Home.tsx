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
      const res = await api.image.getImagesAtRandom();
      if (res === undefined) {
        setImages([]);
        history.push("/sign-in");
      } else {
        setImages(res);
      }
    }
    fetchImages();
  }, []);

  // @TODO:Anyを適切な型にする target内の型を指定する良い方法があればいい。もしくは別で定義する？ https://zenn.dev/koduki/articles/0f8fcbc9a7485b
  const onClickFavoriteButton = async (item: IImage) => {
    // @TODO:バックエンド内部でcurrent_userからuser_idを取る方針にし、apiの叩く回数をへらす。
    const user: IUser | undefined = await api.auth.getUserMe();
    if (user === undefined) return console.log("cannnot read user");
    const requestData = {
      ...item,
      user_id: user.id,
    };
    const res = await api.fav.postFavoriteImage(requestData);
  };

  const toFavoritedImages = () => {
    history.push("/favorite/images");
  };

  return (
    // <div className={classes.root}>
    <Container component="main">
      {images.map((item) => (
        <div key={item.image_id}>
          <img src={item.webformat_url} alt={item.page_url}></img>
          <IconButton onClick={() => onClickFavoriteButton(item)}>
            <StarIcon className={classes.title} />
          </IconButton>
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={toFavoritedImages}>
        お気に入りの画像一覧
      </Button>
    </Container>
    // </div>
  );
}
