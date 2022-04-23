import React from "react";
import Joi from "joi-browser";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Usernamme"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log("submit");
  };

  //handle form submission

  render() {
    return (
      <div className="max-w-lg mx-auto justify-start text-left ">
        <h2 className="text-4xl font-bold mb-4    ">Login</h2>
        <form className="col-md-7 col-sm-11  " onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
