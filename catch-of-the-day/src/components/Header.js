import React from "react";

function Header(props) {
  return (
    <header className="top">
      <div className="user_saves">
        <div className="search"></div>
        <div>
          <h1>LIBRARY</h1>
        </div>
        <div className="filter"></div>
      </div>
    </header>
  );
}

export default Header;
