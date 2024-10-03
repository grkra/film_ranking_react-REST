import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Button from '@mui/material/Button';

function LoginRegister(props) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState();

    function changeLoginRegister() {
        setIsLoginMode(!isLoginMode);
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setUserData((prevUserData) => {
            return ({ ...prevUserData, [name]: value });
        })
    }

    async function loginUser() {
        return (fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json()));
    }

    // async function registerUser() {

    // }

    async function handleLogin() {
        const response = await loginUser();
        if (response.error) {
            setError(response.error)
        } else {
            props.setToken(response);
        }
    }

    async function handleClick() {
        if (isLoginMode) {
            await handleLogin();
        }
        // else if (!isLoginMode) {
        //     const response = await registerUser();
        // }
    }

    return <div>
        <form className="login-register" >
            <h1>{isLoginMode ? 'Sign in' : 'Sign up'}</h1>

            <input onChange={handleChange} placeholder="Username" value={userData.username} name='username' />
            <input onChange={handleChange} placeholder="Password" value={userData.password} name='password' />
            {error && <p className="error-message">{error}</p>}

            <Button className="change-button" variant="text" onClick={changeLoginRegister}>
                {isLoginMode ? "Don't have account yet? Sign up" : "Have account already? Sign in"}
            </Button>

            <Fab className="login-register-button"
                onClick={handleClick}>
                {isLoginMode ? 'Sign in' : 'Sign up'}
            </Fab>
        </form>
    </div>
}

export default LoginRegister;