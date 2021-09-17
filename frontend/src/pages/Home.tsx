import React, { useState, useEffect, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { api } from "api/index";
import { IImage, IUser, IFavoriteImageResponse } from "interfaces/api";
import { useHistory } from "react-router-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import pink from "@material-ui/core/colors/pink";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

// component
import ImageCard from "components/ImageCard";

// export const ImagesContext = createContext();

export default function Home() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      home: {
        width: "100%",
        // marginLeft: ,
        // marginTop: 48
      },
      homeTitle: {
        fontWeight: "bold",
      },
      homeCard: {
        marginLeft: "15%",
      },
    })
  );

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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

  return (
    <div className={classes.home}>
      {/* <Typography
            variant="h5"
            className={classes.homeTitle}
      >
            画像を見つける
      </Typography> */}
      <div className={classes.homeCard}>
        <ImageCard
          images={images}
          setImages={setImages}
          onClickFavoriteButton={onClickFavoriteButton}
        ></ImageCard>
      </div>
    </div>
  );
}
