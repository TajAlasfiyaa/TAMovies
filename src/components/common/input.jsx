import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input className="input" {...rest} name={name} id={name} />
      {error && <div className="alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Input;
