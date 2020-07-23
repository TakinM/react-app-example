import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";

    if (!fish) return null;

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available.
        </li>
      );
    }

    return (
      <li key={key}>
        {count} lbs {fish.name} {formatPrice(count * fish.price)}
        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    console.log(total);

    return (
      <div className="order-wrap">
        <h1>CART</h1>
        <div className="empty_text">
          <h2>
            You presently do not have any books in your cart! Click on the
            <div className="cart_icon"></div>
            to add books you are interested in purchasing!
          </h2>
        </div>
        {/*<h2>You want to buy ... books!</h2>
       <ul className="order">{orderIds.map(this.renderOrder)}</ul>*/}

        {/*<div className="total">
          Total Cost:
          <strong>{formatPrice(total)}</strong>
    </div>*/}
      </div>
    );
  }
}

export default Order;
