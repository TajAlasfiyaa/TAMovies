import React, { Component } from "react";
import Form from "./form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().min(3).max(30).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("submit");
  };

  render() {
    return (
      <div className="max-w-lg mx-auto justify-start text-left ">
        <h2 className="text-4xl font-bold mb-4    ">Register</h2>
        <form className="col-md-7 col-sm-11  " onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
