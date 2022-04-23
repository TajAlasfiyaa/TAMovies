import React from "react";
const Like = (props) => {
  let classes = " like bi bi-heart";
  props.liked ? (classes += "-fill") : (classes += "");

  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
