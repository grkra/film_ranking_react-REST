import { useState } from "react";

function useToken() {
    /**
     * Retrievs token from localStorage and returns (string with token) it to state. If there was no token in Storage returns UNDEFINED
     * @returns String or UNDEFINED
     */
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        // tokenString = {"token":"..."}
        const userToken = JSON.parse(tokenString);
        // userToken = {token:"..."}
        return userToken?.token;
        // zwraca "..." lub UNDEFINED
    };

    const [token, setToken] = useState(getToken());

    /**
     * Saves passed token to local storage under key token and sets string with token to state
     * @param userToken - object {token: "..."} 
     */
    const saveToken = (userToken) => {
        // userToken = {token: "..."}
        localStorage.setItem('token', JSON.stringify(userToken));
        // localStorage: token = {"token":"..."}
        setToken(userToken.token);
        // zapisuje "..."
    };

    const deleteToken = () => {
        setToken(undefined);
        localStorage.clear();
    };

    return {
        setToken: saveToken,
        deleteToken: deleteToken,
        token
    }
}

export default useToken;