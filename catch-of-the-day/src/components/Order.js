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
        <b>{count} OF </b> {fish.name}
        <b> {formatPrice(count * fish.price)}</b>
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

        {total === 0 ? (
          <div className="empty_text">
            <h2>
              You presently do not have any books in your cart! Click on the
              <h2 className="cart_icon">ADD TO CART BUTTON</h2>
              to add books you are interested in purchasing!
            </h2>
          </div>
        ) : (
          <div>
            <h2>These are the books you are interested in buying!</h2>
            <ul className="order">{orderIds.map(this.renderOrder)}</ul>

            <div className="total">
              <b> Total Cost:</b>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Order;
