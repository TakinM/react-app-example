import React from "react";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };

  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";

    console.log(isAvailable);
    const imgStyle = (imgSrc) => ({ backgroundImage: `url(${imgSrc})` });

    return (
      <li>
        <div className="books_cover">
          <div>
            <div className="books" style={imgStyle(image)}></div>
          </div>
          <div className="book_details">
            <h3 className="fish-name">{name}</h3>
            <h5>{desc}</h5>

            <div className="user_saves">
              <h3 className="price">{formatPrice(price)}</h3>
              <button className="icon_button">
                <div
                  className="heart_click"
                  onClick={() => this.props.addToWishlist(this.props.index)}
                ></div>
              </button>
            </div>

            <button
              className="cart_button"
              disabled={!isAvailable}
              onClick={this.handleClick}
            >
              {isAvailable ? "Add To Cart" : "Presently Unavaliable"}
            </button>
          </div>
        </div>

        {/*<img src={image} alt={name} />*/}
      </li>
    );
  }
}

export default Fish;
