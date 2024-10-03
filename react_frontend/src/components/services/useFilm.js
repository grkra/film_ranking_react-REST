import axios from "axios"

export function getFilms(token) {
    return axios.get("http://localhost:4000/getFilms", {
        params: {
            token: token
        },
    })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
}

export function postFilm(token, film) {
    return axios.post('http://localhost:4000/addFilm', film, {
        params: {
            token: token
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
}

export function removeFilm(token, id) {
    return axios.delete(`http://localhost:4000/deleteFilm/${id}`, {
        params: {
            token: token
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
}
