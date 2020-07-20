import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import EditFishForm from "./EditFishForm";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    //first resinate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
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
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

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

  removeFromOrder = (key) => {
    //1. take a copy of state
    const order = { ...this.state.order };

    //2. remove that item from the order
    delete order[key];

    //3. call setState to update our state object with the order
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fish={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

//this.props is only used in a component where a component is not defined

export default App;
