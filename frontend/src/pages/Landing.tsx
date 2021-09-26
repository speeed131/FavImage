import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  introduceSection: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 36,
  },
  introduceSectionImg: {
    height: 300,
  },
  introduceSectionContent: {
    textAlign: "center",
    flexGrow: 1,
    flexBasis: "100%",
  },
  introduceSectionContentText: {
    paddingBottom: "20px",
  },
  introduceSectionContentTextStrong: {
    backgroundColor: "#cddc39",
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
  },
  button: {
    backgroundColor: "#cddc39",
    color: "white",
    fontWeight: "bold",
  },
  howToSection: {
    display: "flex",
    backgroundColor: "#cddc39",
    color: "white",
  },
  icon: {
    paddingRight: 8,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
  },
  item: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    padding: "16px 0",
    margin: "16px",
    flexBasis: "80%",
    textAlign: "center",
  },
  cardMedia: {
    objectFit: "scale-down",
  },
  footerSection: {
    display: "flex",
    justifyContent: "center",
    margin: 16,
  },
}));

type HowToUseItems = { title: string; imageSrc: string; body: string };

export default function Landing() {
  const classes = useStyles();
  const history = useHistory();

  const toMoveSignUp = () => {
    history.push("/sign-up");
  };

  const howToUseItems: HowToUseItems[] = [
    {
      title: "１，まずはユーザ登録をしましょう",
      imageSrc: "signin.png",
      body: "名前とパスワードだけで簡単に登録できます。",
    },
    {
      title: "２，画像がランダムに表示されていきます。",
      imageSrc: "home.png",
      body: "ランダムに出てくる画像は意外に気に入る画像があるかも。 今後はジャンル別で画像が表示できる機能も開発中です。",
    },
    {
      title: "３, お気に入りしたい画像にはハートをクリック！",
      imageSrc: "home2.jpg",
      body: "それ以外はバツをクリックしましょう。 もし間違えてバツを押しても前の画像に戻れます。",
    },
    {
      title: "４, お気に入り画像ページからダウンロードしましょう",
      imageSrc: "favorite.jpg",
      body: `自分がお気に入り登録した画像が一覧で表示されます。そこからダウンロードページに飛ぶことができます。
      画像は Pixabay から提供しています。`,
    },
  ];

  return (
    <div>
      <Container component="main" maxWidth="md">
        <div className={classes.introduceSection}>
          <div className={classes.introduceSectionContent}>
            <img
              src="y1000.png"
              className={classes.introduceSectionImg}
              height="480"
              alt=""
            />
          </div>
          <div className={classes.introduceSectionContent}>
            <Typography className={classes.introduceSectionContentText}>
              お気に入りの画像を簡単に見つけられないかな...
            </Typography>
            <Typography className={classes.introduceSectionContentText}>
              そろそろ気分転換にデバイスの背景画像を変えようかな...
            </Typography>
            <Typography className={classes.introduceSectionContentText}>
              そんなあなたに。
            </Typography>
            <Typography className={classes.introduceSectionContentText}>
              <span className={classes.introduceSectionContentTextStrong}>
                FavImage
              </span>{" "}
              は ワクワクしながらお気に入りの画像を探せるアプリです。
            </Typography>
            <Button
              className={classes.button}
              variant="contained"
              onClick={toMoveSignUp}
            >
              さっそく始める
            </Button>
          </div>
        </div>

        <div className={classes.howToSection}>
          <HelpOutlineIcon className={classes.icon} />
          <Typography variant="h5" className={classes.title}>
            使い方
          </Typography>
        </div>
        <div className={classes.item}>
          {howToUseItems.map((item: HowToUseItems, index) => (
            <Card className={classes.card} key={index}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="300"
                image={item.imageSrc}
                className={classes.cardMedia}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className={classes.footerSection}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={toMoveSignUp}
          >
            さっそく始める
          </Button>
        </div>
      </Container>
    </div>
  );
}
