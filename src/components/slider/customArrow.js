import React from "react";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#60a5fa",
        borderRadius: "99999px",
      }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#60a5fa",
        borderRadius: "99999px",
      }}
      onClick={onClick}
    />
  );
};

export { PrevArrow, NextArrow };
