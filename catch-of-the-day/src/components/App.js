import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
    loggedIn: false,
    editing: false,
    wishlist: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    //first resinate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    const localStorageRefWishlist = localStorage.getItem(
      params.storeId + "wishlist"
    );

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }

    if (localStorageRefWishlist) {
      this.setState({
        wishlist: JSON.parse(localStorageRefWishlist),
      });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
    localStorage.setItem(
      this.props.match.params.storeId + "wishlist",
      JSON.stringify(this.state.wishlist)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleLoggedInState = (state) => {
    //alert("working");
    this.setState({ loggedIn: state });
  };

  addFish = (fish) => {
    console.log(fish);
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };

    // 2. add our new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;

    // 3. set the new fishes object into the state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  updateFish = (key, updatedFish) => {
    //1. take a copy of the current state
    const fishes = { ...this.state.fishes };

    //2. update that state
    fishes[key] = updatedFish;

    //3. set updated fish into state
    this.setState({
      fishes,
    });
  };

  deleteFish = (key) => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes };

    //2. update the state
    fishes[key] = null;

    //3. update the state
    this.setState({ fishes });
  };

  addToOrder = (key) => {
    //1. take a copy of state
    const order = { ...this.state.order };

    //2. either add to the order or update numner in our order
    order[key] = order[key] + 1 || 1;

    //3. call setState to update our state object with the order
    this.setState({ order });
  };

  setEditing = (value) => {
    this.setState({ editing: value });
  };

  removeFromOrder = (key) => {
    //1. take a copy of state
    const order = { ...this.state.order };

    //2. remove that item from the order
    delete order[key];

    //3. call setState to update our state object with the order
    this.setState({ order });
  };

  //adding to wishlist
  addToWishlist = (key) => {
    const wishlist = { ...this.state.wishlist };

    wishlist[key] = true;

    this.setState({ wishlist });
  };

  render() {
    return (
      <div>
        <div className="logo_holder">
          <img className="site_logo" src="/images/logo.svg" />
        </div>

        {this.state.loggedIn ? (
          <div className="adminlog">
            <div className="menu2">
              <Header
                loggedIn={this.state.loggedIn}
                editing={this.state.editing}
                onEdit={this.setEditing}
              />
              {this.state.loggedIn && this.state.editing ? (
                <div className="edit_products">
                  {Object.keys(this.state.fishes).map((key) => (
                    <EditFishForm
                      key={key}
                      index={key}
                      fish={this.state.fishes[key]}
                      updateFish={this.updateFish}
                      deleteFish={this.deleteFish}
                    />
                  ))}
                  <AddFishForm addFish={this.addFish} />
                  <button onClick={this.loadSampleFishes}>
                    Publish Added Books
                  </button>
                </div>
              ) : (
                <ul className="fishes">
                  {Object.keys(this.state.fishes).map((key) => (
                    <Fish
                      key={key}
                      index={key}
                      details={this.state.fishes[key]}
                      addToOrder={this.addToOrder}
                      addToWishlist={this.addToWishlist}
                    />
                  ))}
                </ul>
              )}
            </div>
            <Inventory
              loggedIn={this.state.loggedIn}
              storeId={this.props.match.params.storeId}
              handleLoggedInState={this.handleLoggedInState}
              wishlist={this.state.wishlist}
              fishes={this.state.fishes}
            />
          </div>
        ) : (
          <div className="catch-of-the-day">
            <div className="menu">
              <Header
                loggedIn={this.state.loggedIn}
                editing={this.state.editing}
                onEdit={this.setEditing}
              />
              {this.state.loggedIn && this.state.editing ? (
                <div className="edit_products">
                  {Object.keys(this.state.fishes).map((key) => (
                    <EditFishForm
                      key={key}
                      index={key}
                      fish={this.state.fishes[key]}
                      updateFish={this.updateFish}
                      deleteFish={this.deleteFish}
                    />
                  ))}
                  <AddFishForm addFish={this.addFish} />
                  <button onClick={this.loadSampleFishes}>
                    Publish Added Books
                  </button>
                </div>
              ) : (
                <ul className="fishes">
                  {Object.keys(this.state.fishes).map((key) => (
                    <Fish
                      key={key}
                      index={key}
                      details={this.state.fishes[key]}
                      addToOrder={this.addToOrder}
                      addToWishlist={this.addToWishlist}
                    />
                  ))}
                </ul>
              )}
            </div>
            <Order
              fishes={this.state.fishes}
              order={this.state.order}
              removeFromOrder={this.removeFromOrder}
            />
            <Inventory
              loggedIn={this.state.loggedIn}
              storeId={this.props.match.params.storeId}
              handleLoggedInState={this.handleLoggedInState}
              wishlist={this.state.wishlist}
              fishes={this.state.fishes}
            />
          </div>
        )}
      </div>
    );
  }
}

//this.props is only used in a component where a component is not defined

export default App;
