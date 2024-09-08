import React from "react";
import TheatersIcon from '@mui/icons-material/Theaters';


function Header() {
  return (
    <header>
      <h1>
        <TheatersIcon className="logo" />
        My favourite films!
      </h1>
    </header>
  );
}

export default Header;
