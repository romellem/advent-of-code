import React from "react";

const Registers = ({ registers } = {}) => {
  const { a, b, c, d } = registers;
  return (
    <div>
      <ul style={{ margin: 0, paddingLeft: "10px" }}>
        <li>a: {a}</li>
        <li>b: {b}</li>
        <li>c: {c}</li>
        <li>d: {d}</li>
      </ul>
    </div>
  );
};

export default Registers;
