import React from "react";
import App from "./App";

function Header(props) {
  const isLoggedAndEditing = props.loggedIn && props.editing;
  return (
    <header className="top">
      <div className="user_saves">
        {isLoggedAndEditing && (
          <>
            {/* <button className="icon_button">
              <div className="add"></div>
        </button>*/}

            <button className="icon_button">
              <div className="exit" onClick={() => props.onEdit(false)}></div>
            </button>
          </>
        )}
        {!props.loggedIn && <div className="search"></div>}
        <div>
          <h1>LIBRARY</h1>
        </div>
        {props.loggedIn && !props.editing && (
          <button className="icon_button">
            <div className="edit" onClick={() => props.onEdit(true)}></div>
          </button>
        )}
        {!props.loggedIn && <div className="filter"></div>}
      </div>
    </header>
  );
}

export default Header;
