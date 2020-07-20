import React from "react";

const Login = (props) => (
  <nav className="Login">
    <h2>Inventory Login</h2>
    <p>Sign In to manage Your Store's Inventory</p>
    
    <button
      className="github"
      onClick={() => props.authenticate("Github")}
    >
      Login with Github
    </button>
  </nav>
);

//to make different sign ups just copy and past button with changed service, after authenticating through firebase

export default Login;
