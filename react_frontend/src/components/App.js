import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Home from './Home';
import LoginRegister from './LoginRegister';
import useToken from './services/useToken';
import { getUsername } from './services/useUser';

function App() {
  const { token, setToken, deleteToken } = useToken();
  const [username, setUsername] = useState("");

  useEffect(
    () => {
      if (token) {
        getUsername(token)
          .then(response => setUsername(response.username))
          .catch((error) => console.log(error));
      } else {
        setUsername("");
      }
    }, [token]
  );



  return (
    <div>
      <Header token={token} deleteToken={deleteToken} />
      <BrowserRouter>
        <Routes>
          {!token
            ? <Route path="/"
              element={<LoginRegister setToken={setToken} />} />
            : <Route path="/"
              element={<Home token={token} username={username} />} />}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div >
  );
}

export default App;
