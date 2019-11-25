import React from "react";
import ReactDOM from "react-dom";
import Device, { parseLine } from "./Device.js";

import "./styles.css";

const initial_data = `cpy a b
dec b
cpy a d
cpy 0 a
cpy b c
inc a
dec c
jnz c -2
dec d
jnz d -5
dec b
cpy b c
cpy c d
dec d
inc c
jnz d -2
tgl c
cpy -16 c
jnz 1 c
cpy 99 c
jnz 77 d
inc a
inc d
jnz d -2
inc c
jnz c -5`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.data_ref = React.createRef();
    this.state = {
      data: null,
      run: false,
      dataError: ""
    };
  }

  parseProgramAndRun = () => {
    let data_str = String(this.data_ref.current.value).trim();
    if (!data_str) {
      this.setState({ dataError: "Empty program passed in." });
      return;
    }

    let data_arr = data_str.split("\n");
    const data = [];

    // Run using for loop instead of `map` so I can catch errors
    try {
      for (let i = 0; i < data_arr.length; i++) {
        data.push(parseLine(data_arr[i]));
      }
    } catch (e) {
      this.setState({ dataError: e.toString() });
      return;
    }

    // If we are here, we have a valid data
    this.setState({
      data,
      run: true
    });
  };

  componentDidMount() {
    this.data_ref.current.value = initial_data;
  }

  render() {
    if (!this.state.run) {
      return (
        <div>
          <p>Enter the program input, separated by newlines:</p>
          <textarea
            rows="16"
            cols="46"
            ref={this.data_ref}
            onClick={() => this.setState({ dataError: null })}
          />
          <div>
            <button onClick={() => this.parseProgramAndRun()}>
              Run Program
            </button>
            {this.state.dataError ? (
              <p style={{ color: "red" }}>{this.state.dataError}</p>
            ) : null}
          </div>
        </div>
      );
    }

    return <Device program={this.state.data} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
