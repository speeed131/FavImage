import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "./logo.svg";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid"


//api
import { api } from "./api/index";
import { IImage } from "./interfaces/api";


// layouts
import Header from "layouts/Header";
import ResponsiveDrawer from "layouts/SideBar"

// page
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import FavoritedImages from "pages/FavoritedImages";

const App: React.FC = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    main: {
      marginLeft: "240px"
    }
  }));
  
  return (
    <BrowserRouter>
          <Header></Header>
          <Grid container>
            <Grid item lg={1}>
              <ResponsiveDrawer></ResponsiveDrawer>
            </Grid>
            <Grid item lg={11}>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/sign-up" component={SignUp} exact />
                <Route path="/sign-in" component={SignIn} exact />
                <Route path="/favorite/images" component={FavoritedImages} exact />
              </Switch>
            </Grid>
          </Grid>
    </BrowserRouter>
  );
};

export default App;

// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/" exact children={<Index />} />
//         <Route path="/about" children={<About />} />
//       </Switch>
//     </BrowserRouter>
//   );
// }

// function App() {
//   return (
//     <Button variant="contained" color="primary">
//       Hello World
//     </Button>
//   );
// }

// ReactDOM.render(<App />, document.querySelector('#app'));

// function App() {

//   const [images, setImages] = useState<IImage[] | []>([]);

//   useEffect((): void => {
//     async function fetchImages() {
//       const res = await api.image.getImagesAtRandom()
//       res === undefined ? setImages([]) : setImages(res)
//     }
//     fetchImages()
//     }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <ul>
//         {images.map((image, index) => (
//            <li key={index}>{image.page_url}</li>
//           ))}
//         </ul>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <button>
//           fawfwaf
//         </button>
//       </header>
//     </div>
//   );
// }

// export default App;
