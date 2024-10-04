import React from "react";

const Circle = ({ fill }) => {
  return (
    <svg height="30" width="30">
      <circle cx="10" cy="10" r="10" stroke="transperent" fill={fill} />
    </svg>
  );
};

export default Circle;
