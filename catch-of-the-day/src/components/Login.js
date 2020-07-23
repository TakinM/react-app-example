import React from "react";

const Login = (props) => (
  <nav className="Login">
    <button className="mybutton" onClick={() => props.authenticate("Github")}>
      GITHUB
    </button>
  </nav>
);

//to make different sign ups just copy and past button with changed service, after authenticating through firebase

export default Login;
