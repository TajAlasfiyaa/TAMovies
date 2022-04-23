import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    acount: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };
  validate = () => {
    const result = Joi.validate(this.state.acount, this.schema, {
      abortEarly: false,
    });
    console.log(result);
    const errors = {};
    const { username, password } = this.state.acount;
    if (username.trim() === "") errors.username = "Username is required.";
    if (password.trim() === "") errors.password = "Password is required.";
    return Object.keys(errors).length === 0 ? null : errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
  };
  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const acount = { ...this.state.acount };
    acount[input.name] = input.value;
    this.setState({ acount, errors });
  };

  //handle form submission

  render() {
    const { acount, errors } = this.state;
    return (
      <div className="max-w-lg mx-auto justify-start text-left ">
        <h2 className="text-4xl font-bold mb-4    ">Login</h2>
        <form className="col-md-7 col-sm-11  " onSubmit={this.handleSubmit}>
          <Input
            lable="Username"
            value={acount.username}
            onChange={this.handleChange}
            name="username"
            errors={errors.username}
          />
          <Input
            lable="Password"
            value={acount.password}
            onChange={this.handleChange}
            name="password"
            errors={errors.password}
          />

          <button className="btn-default text-left">LogIn</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
