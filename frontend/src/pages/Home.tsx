import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { api } from "api/index";
import { IImage } from "interfaces/api";
import { useHistory } from "react-router-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Container from "@material-ui/core/Container";

export default function Home() {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      width: 500,
      height: 500,
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }),
);

  const classes = useStyles();
  const history = useHistory();

  const [images, setImages] = useState<IImage[] | []>([]);

  useEffect((): void => {
    async function fetchImages() {
      const res = await api.image.getImagesAtRandom();
      res === undefined ? setImages([]) : setImages(res);
    }
    fetchImages();
  }, []);

  // @TODO:Anyを適切な型にする target内の型を指定する良い方法があればいい。もしくは別で定義する？ https://zenn.dev/koduki/articles/0f8fcbc9a7485b
  const onClickFavoriteButton = async (item: any) => {
    console.log(item)
  }

  return (
    // <div className={classes.root}>
    <Container component="main">
        {images.map((item) => (
            <div key={item.image_id}>
                <img src={item.webformat_url}  alt={item.page_url}></img>
                <IconButton onClick={() => onClickFavoriteButton(item)}>
                    <StarBorderIcon className={classes.title} />
                </IconButton>
            </div>
        ))}

      <ImageList className={classes.imageList} cols={1}>
        {images.map((item) => (
          <ImageListItem key={item.large_image_url}>
            <img src={item.large_image_url} alt={item.page_url} />
            <ImageListItemBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
    // </div>

  );
}
