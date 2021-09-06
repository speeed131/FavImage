import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { api } from "api/index";
import { IImage } from "interfaces/api";
import { useHistory } from "react-router-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Container from "@material-ui/core/Container";

export default function Home() {
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
        width: 600,
        height: 600,
      },
    })
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

  return (
    // <div className={classes.root}>
    <Container component="main" maxWidth="xs">
      <ImageList rowHeight={160} className={classes.imageList} cols={3}>
        {images.map((item: IImage) => (
          <ImageListItem key={item.webformat_url} cols={3}>
            <img src={item.webformat_url} alt={item.page_url} />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
    // </div>
  );
}
