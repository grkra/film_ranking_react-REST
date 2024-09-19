import { useState } from "react";

function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        // tokenString = {"token":"..."}
        const userToken = JSON.parse(tokenString);
        // userToken = {token:"..."}
        return userToken?.token;
        // zwraca "..." lub nic
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        // userToken = {token: "..."}
        localStorage.setItem('token', JSON.stringify(userToken));
        // localStorage = {"token":"..."}
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}

export default useToken;