import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Button from '@mui/material/Button';

function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    function handleChange(event) {
        const { value, name } = event.target;
        setUserData((prevUserData) => {
            return ({ ...prevUserData, [name]: value });
        })
    }

    function changeLoginRegister() {
        setIsLoginMode(!isLoginMode);
    }

    function handleClick() {
        console.log("clicked");
    }

    return <div>
        <form className="login-register" >
            <h1>{isLoginMode ? 'Sign in' : 'Sign up'}</h1>
            <input onChange={handleChange} placeholder="Username" value={userData.username} name='username' />
            <input onChange={handleChange} placeholder="Password" value={userData.password} name='password' />

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

export default Login;