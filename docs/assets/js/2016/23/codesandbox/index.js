import React from "react";
import ReactDOM from "react-dom";
import Device from "./Device.js";
import data from "./data.js";

import "./styles.css";

function App() {
  return <Device program={data} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
