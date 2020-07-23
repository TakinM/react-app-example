import React from "react";
import App from "./App";

function Header(props) {
  return (
    <header className="top">
      <div className="user_saves">
        {props.loggedIn ? <div></div> : <div className="search"></div>}

        <div>
          <h1>LIBRARY</h1>
        </div>
        {props.loggedIn ? (
          <button className="icon_button">
            <div className="edit" onClick></div>
          </button>
        ) : (
          <div className="filter"></div>
        )}
      </div>
    </header>
  );
}

export default Header;
