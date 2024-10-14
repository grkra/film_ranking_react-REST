import React from "react";
import TheatersIcon from '@mui/icons-material/Theaters';
import Button from '@mui/material/Button';

function Header(props) {
  function handleClick() {
    props.deleteToken();
  }

  return (
    <header>
      <h1>
        <TheatersIcon className="logo" />
        My favourite films!
      </h1>

      {props.token && <Button className="logout-button" variant="text" onClick={handleClick}>
        Log out
      </Button>}

    </header>
  );
}

export default Header;
