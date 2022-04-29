import React, { Component } from "react";

import axios from "axios";

export default class AnimalList extends Component {
  state = {
    persons: [],
  };
  async componentDidMount() {
    await axios.get(`https://dummyjson.com/products/1`).then((res) => {
      const animals = res.data;
      console.log(animals);
      this.setState({ animals });
    });
  }
  render() {
    return (
      <div>
        <h1>Animals</h1>
      </div>
    );
  }
}
