import React from "react";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    const _this = this;
    //1. look up the current store in firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);

    //2. claim it if there is no owner

    if (!store.owner) {
      //save it as own

      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    //3. set the state of the inventory component to reflect the current user
    this.setState(
      {
        uid: authData.user.uid,
        owner: store.owner || authData.user.uid,
      },
      function () {
        _this.props.handleLoggedInState(true);
      }
    );

    console.log(authData);
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    const _this = this;
    console.log("logged out!");
    await firebase.auth().signOut();
    this.setState({ uid: null }, function () {
      _this.props.handleLoggedInState(false);
    });
  };

  render() {
    const logout = (
      <button onClick={this.logout} className="mybutton">
        Log Out
      </button>
    );

    //1. check if they logged in

    //3. they are the owner, show the inventory

    return (
      <div className="account_panel">
        {/*
         <h2>Inventory</h2>
        

        
        */}
        <div className="admin_view">
          <h4>Books are the gateway to the soul</h4>
          <h2 className="profile">ADMIN LOGIN</h2>

          {!this.state.uid ? (
            <Login authenticate={this.authenticate} />
          ) : (
            logout
          )}

          {this.state.uid !== this.state.owner ? (
            <div>
              <p>Sorry you are not the owner of this store</p>
              {logout}
            </div>
          ) : null}
        </div>
        <div className="wishlist_view">
          <h6>WISHLIST</h6>

          <div className="empty_text">
            <h2>
              You presently do not have any books in your wish list! Click on
              the
              <div className="heart_icon"></div>
              to add books you are interested in saving for later!
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;
