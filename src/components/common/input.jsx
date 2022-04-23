import React from "react";

const Input = (props) => {
  const { lable, value, onChange, name, errors } = props;
  return (
    <div className="mb-6">
      <label
        className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        htmlFor={name}
      >
        {lable}
      </label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type="text"
        className="form-control shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      />
      {errors && (
        <div className="p-4 mb-4 text-left mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
          <span className="font-medium">{errors}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
