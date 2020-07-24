import React from "react";

class EditFishForm extends React.Component {
  handleChange = (event) => {
    //updating the fish
    // 1. take a copy of the current fish
    const updateFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    // 2.

    this.props.updateFish(this.props.index, updateFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          name="Image"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />

        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">In Stock</option>
          <option value="unavailable">Sold Out</option>
        </select>

        <input
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        {/* <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
       ></textarea> */}

        <button
          className="icon_button"
          onClick={() => this.props.deleteFish(this.props.index)}
        >
          <div className="delete"></div>
        </button>
      </div>
    );
  }
}

export default EditFishForm;
