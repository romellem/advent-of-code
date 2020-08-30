import React from "react";
import ReactDOM from "react-dom";
import Device, { parseLine } from "./lib/Device.js";

const initial_data = `set b 67
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

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

  resetState = () => {
    this.setState({
      data: null,
      run: false,
      dataError: ""
    });
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
    if (this.data_ref?.current)
    this.data_ref.current.value = initial_data;
  }

  componentDidUpdate() {
    if (this.data_ref?.current) {
      this.data_ref.current.value = initial_data;
    }
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

    return <Device program={this.state.data} loadNewProgram={this.resetState} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
