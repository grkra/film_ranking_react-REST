import axios from "axios";

export function getUsername(token) {
    return axios.get("http://localhost:4000/getUsername", {
        params: {
            token: token
        },
    })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
}