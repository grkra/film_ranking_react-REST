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
    const [successMessage, setSuccessMessage] = useState();

    function changeLoginRegister() {
        setIsLoginMode(!isLoginMode);
        setUserData({
            username: '',
            password: ''
        });
        setError();
        setSuccessMessage();
    };

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

    async function registerUser() {
        return (fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
        )
    }

    async function handleLogin() {
        const response = await loginUser();
        if (response.error) {
            setError(response.error);
            setSuccessMessage();
        } else {
            props.setToken(response);
        }
    }

    async function handleRegister() {
        const response = await registerUser();
        if (response.error) {
            setError(response.error);
        } else {
            setUserData({
                username: '',
                password: ''
            });
            setError();
            setSuccessMessage("Registered new user. Please sign in");
            setIsLoginMode(!isLoginMode);
        }
    }

    async function handleClick() {
        if (isLoginMode) {
            await handleLogin();
        }
        else {
            await handleRegister();
        }
    }

    return <div>
        <form className="login-register" >
            <h1>{isLoginMode ? 'Sign in' : 'Sign up'}</h1>

            <input onChange={handleChange} placeholder="Username" value={userData.username} name='username' />
            <input onChange={handleChange} placeholder="Password" value={userData.password} name='password' />
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

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