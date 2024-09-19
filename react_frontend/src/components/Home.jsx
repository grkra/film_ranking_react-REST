import React, { useState } from 'react';

import FilmInput from './FilmInput';
import Film from './Film';

function Home() {
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

    return (
        <div>
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
    );
}

export default Home;
