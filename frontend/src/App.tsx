import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { api } from './api/index';

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


function App() {

  const [images, setImages] = useState([] as any[]);

  useEffect((): any => {
    async function fetchImages() {
      const res = await api.getImagesAtRandom()
      setImages(res)
      return res;
    }

      fetchImages()
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
        {images.map((image, index) => (
           <li key={index}>{image.page_url}</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

