import React, { useState, useEffect } from "react";
import { api } from "api/index";
import { IImage, IUser } from "interfaces/api";
import { useHistory } from "react-router-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

// component
import ImageCard from "components/ImageCard";
import EmptyImagesDialog from "components/EmptyImagesDialog";

// export const ImagesContext = createContext();

export default function Home() {
  const useStyles = makeStyles(() =>
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
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect((): void => {
    async function fetchImages() {
      const res = await api.image.getImagesAtRandom();
      if (res === undefined) {
        setImages([]);
        history.push("/lp");
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
      <EmptyImagesDialog history={history} isOpenDialog={isOpenDialog} />
      <div className={classes.homeCard}>
        <ImageCard
          images={images}
          setImages={setImages}
          setIsOpenDialog={setIsOpenDialog}
          onClickFavoriteButton={onClickFavoriteButton}
          history={history}
        ></ImageCard>
      </div>
    </div>
  );
}
