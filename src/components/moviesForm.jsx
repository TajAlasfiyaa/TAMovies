import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MoviesForm = () => {
  let params = useParams();
  let navitate = useNavigate();
  function handleClick() {
    navitate("/movies");
  }
  return (
    <div className="content">
      <h2 className="text-3xl">
        {" "}
        Movies Form
        <span className="text-red-700">{params.id}</span>
      </h2>
      <button onClick={handleClick} className="btn-default">
        Save
      </button>
    </div>
  );
};

export default MoviesForm;
