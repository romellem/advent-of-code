import React from "react";

const Registers = ({ registers } = {}) => {
  const { a, b, c, d, e, f, g, h } = registers;
  return (
    <div>
      <b>Registers</b>
      <ul style={{ margin: 0, paddingLeft: "10px" }}>
        <li>a: {a}</li>
        <li>b: {b}</li>
        <li>c: {c}</li>
        <li>d: {d}</li>
        <li>e: {e}</li>
        <li>f: {f}</li>
        <li>g: {g}</li>
        <li>h: {h}</li>
      </ul>
    </div>
  );
};

export default Registers;
