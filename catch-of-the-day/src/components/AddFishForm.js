import React from "react";
class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    //1. stop default form from submiting
    event.preventDefault();

    //2. collect form data into an object
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };

    //console.log(fish);
    //3. send to the app component in storre in state
    this.props.addFish(fish);

    //4. reset the form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input
          name="Image"
          type="text"
          placeholder="Image"
          ref={this.imageRef}
        />
        <input name="Name" type="text" placeholder="Name" ref={this.nameRef} />
        <input
          name="Price"
          type="text"
          placeholder="Price"
          ref={this.priceRef}
        />

        <select name="Status" ref={this.statusRef}>
          <option value="available">In Stock</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <input
          name="desc"
          type="text"
          placeholder="Book Author"
          ref={this.descRef}
        />
        {/*<textarea
          name="desc"
          placeholder="Description"
          ref={this.descRef}
        ></textarea>*/}

        <button type="submit">Add New Book</button>
      </form>
    );
  }
}

export default AddFishForm;
