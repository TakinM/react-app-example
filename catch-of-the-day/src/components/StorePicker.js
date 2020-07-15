import React from "react";
import { getFunName } from "../helpers";
// ./ means finding stuff from the same folder & ../ means finding stuff from a different folder

class StorePicker extends React.Component {
  // this means that store picker is extending the react component. it is using already defined stuff to do more

  myInput = React.createRef();

  goToStore = (event) => {
    //1. stop form from submitting
    event.preventDefault();

    //2. get the text from imput
    const storeName = this.myInput.current.value;

    //3. change the page to /store/user-store-url
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2> Please Enter A Store </h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit"> Visit Store </button>
      </form>
    );
  }
}

export default StorePicker;
