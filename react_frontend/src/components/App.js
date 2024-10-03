import React /*, { useState } */ from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Home from './Home';
import LoginRegister from './LoginRegister';
import useToken from './services/useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div>
        <Header />
        <LoginRegister setToken={setToken} />
        <Footer />
      </div >
    );
  }

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home token={token} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div >
  );
}

export default App;
