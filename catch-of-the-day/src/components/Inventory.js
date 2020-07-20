import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
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
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });

    console.log(authData);
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log("logged out!");
    await firebase.auth().signOut;
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;

    //1. check if they logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    //2. check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner of this store</p>
          {logout}
        </div>
      );
    }

    //3. they are the owner, show the inventory

    return (
      <div className="order">
        <h2>Inventory</h2>
        {logout}

        {Object.keys(this.props.fish).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fish[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}

        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
