import React, { useState, useEffect, useRef } from 'react';
import { getFilms, postFilm, removeFilm } from './services/useFilm';
import FilmInput from './FilmInput';
import Film from './Film';

function Home(props) {
    const [triggerGetFilms, setTriggerGetFilms] = useState(false);
    const [filmsList, setFilmsList] = useState([]);
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        if (filmsList.length && !alert) {
            return;
        }
        getFilms(props.token)
            .then((films) => {
                if (mounted.current) {
                    setFilmsList(films);
                    setTriggerGetFilms(false);
                }
            })
            .catch((error) => console.log(error));
        return () => mounted.current = false;
    }, [triggerGetFilms, filmsList, props.token]);

    function addFilm(newFilm) {
        postFilm(props.token, newFilm)
            .then((response) => {
                if (mounted.current) {
                    setTriggerGetFilms(true);
                }
            })
            .catch((error) => console.log(error));
    }

    function deleteFilm(id) {
        removeFilm(props.token, id)
            .then((response) => {
                if (mounted.current) {
                    setTriggerGetFilms(true);
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <div><h2> Hello {props.username}, what did you watch today? </h2></div>
            <FilmInput onAdd={addFilm} />
            {filmsList.map((film, index) =>
                <Film
                    key={index}
                    id={film.id || index}
                    title={film.title}
                    score={film.score}
                    review={film.review}
                    onDelete={deleteFilm}
                />
            )}
        </div>
    );
}

export default Home;
