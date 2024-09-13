import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import FilmInput from './FilmInput';
import Film from './Film';
import Login from './Login';

function App() {
  const [filmsList, setFilmsList] = useState([]);

  function addFilm(newFilm) {
    setFilmsList(prevFilmList => {
      return [...prevFilmList, newFilm];
    });
  }

  function deleteFilm(id) {
    setFilmsList(prevList => {
      return prevList.filter((film, index) => {
        return index !== id;
      });
    });
  }

  let isLoggedIn = true;

  return (
    <div>
      <Header />
      {isLoggedIn && <div>
        <FilmInput onAdd={addFilm} />
        {filmsList.map((film, index) => {
          return (
            <Film
              key={index}
              id={index}
              title={film.title}
              score={film.score}
              review={film.review}
              onDelete={deleteFilm}
            />
          );
        })}
      </div>
      }
      {!isLoggedIn && <Login />}
      <Footer />
    </div>
  );
}

export default App;
