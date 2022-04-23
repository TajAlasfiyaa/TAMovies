import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group mb-3">
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <select className="input" name={name} id={name} {...rest}>
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
