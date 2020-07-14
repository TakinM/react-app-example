import React from "react";
class StorePicker extends React.Component {
  // this means that store picker is extending react component. it is using already defined stuff to do more

  render() {
    return (
      <form className="store-selector">
        <h2> Please enter a store </h2>
        <input type="text" required placeholder="Store Name" />
        <button type="submit"> Visit Store </button>
      </form>
    );
  }
}

export default StorePicker;
