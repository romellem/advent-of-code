(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  const lineToString = ({
    op,
    args
  }) => {
    return op + ' ' + args[0] + ' ' + (args[1] ?? '');
  };

  const Program = ({
    program,
    instruction
  } = {}) => {
    const rows = program.map((line, i) => {
      const active = i === instruction;
      const active_class = active ? 'active' : '';
      return /*#__PURE__*/React__default['default'].createElement("tr", {
        className: active_class
      }, /*#__PURE__*/React__default['default'].createElement("td", {
        className: active_class
      }, active ? /*#__PURE__*/React__default['default'].createElement("b", {
        style: {
          color: 'maroon'
        }
      }, "*") : ''), /*#__PURE__*/React__default['default'].createElement("td", {
        className: active_class,
        style: {
          textAlign: 'right',
          paddingRight: '1em'
        }
      }, active ? /*#__PURE__*/React__default['default'].createElement("b", null, i) : i), /*#__PURE__*/React__default['default'].createElement("td", {
        className: active_class
      }, lineToString(line)));
    });
    return /*#__PURE__*/React__default['default'].createElement("div", {
      style: {
        flexGrow: 1
      }
    }, /*#__PURE__*/React__default['default'].createElement("table", null, /*#__PURE__*/React__default['default'].createElement("tbody", null, rows)), /*#__PURE__*/React__default['default'].createElement("div", null, instruction > program.length - 1 ? /*#__PURE__*/React__default['default'].createElement("b", {
      style: {
        color: 'green'
      }
    }, "Done") : null));
  };

  const Registers = ({
    registers
  } = {}) => {
    const {
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h
    } = registers;
    return /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("b", null, "Registers"), /*#__PURE__*/React__default['default'].createElement("ul", {
      style: {
        margin: 0,
        paddingLeft: "10px"
      }
    }, /*#__PURE__*/React__default['default'].createElement("li", null, "a: ", a), /*#__PURE__*/React__default['default'].createElement("li", null, "b: ", b), /*#__PURE__*/React__default['default'].createElement("li", null, "c: ", c), /*#__PURE__*/React__default['default'].createElement("li", null, "d: ", d), /*#__PURE__*/React__default['default'].createElement("li", null, "e: ", e), /*#__PURE__*/React__default['default'].createElement("li", null, "f: ", f), /*#__PURE__*/React__default['default'].createElement("li", null, "g: ", g), /*#__PURE__*/React__default['default'].createElement("li", null, "h: ", h)));
  };

  const InstructionCount = ({
    intructionCount
  } = {}) => {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      style: {
        marginLeft: '1em'
      }
    }, /*#__PURE__*/React__default['default'].createElement("b", null, "Instruction Count"), /*#__PURE__*/React__default['default'].createElement("ul", {
      style: {
        margin: 0,
        paddingLeft: '10px'
      }
    }, VALID_OPS?.map(v => /*#__PURE__*/React__default['default'].createElement("li", {
      key: v
    }, v, ": ", intructionCount[v]))));
  };

  class BreakOn extends React__default['default'].Component {
    constructor(props) {
      super(props);
      this.myRef = /*#__PURE__*/React__default['default'].createRef();
    }

    componentDidMount() {
      this.myRef.current.onchange = e => {
        this.props.setDeviceBreakOn(this.myRef.current.value);
      };
    }

    render() {
      return /*#__PURE__*/React__default['default'].createElement("label", null, "Break on: ", /*#__PURE__*/React__default['default'].createElement("input", {
        ref: this.myRef
      }));
    }

  }

  const Button = ({
    step,
    steps,
    children
  } = {}) => {
    const fn = () => step(steps);

    return /*#__PURE__*/React__default['default'].createElement("button", {
      title: steps ? `Tick forward ${steps} steps` : null,
      onClick: fn
    }, children);
  };

  const Controls = props => {
    return /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default['default'].createElement(Button, {
      step: props.runUntilBreak
    }, "\u25B6")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement(Button, {
      step: props.step,
      steps: 1
    }, ">"), /*#__PURE__*/React__default['default'].createElement(Button, {
      step: props.step,
      steps: 100
    }, "\u226B"), /*#__PURE__*/React__default['default'].createElement(Button, {
      step: props.step,
      steps: 10000
    }, "\u22D9")));
  };

  /**
   * - `set X Y` sets register `X` to the value of `Y`.
   * - `sub X Y` decreases register `X` by the value of `Y`.
   * - `mul X Y` sets register `X` to the result of multiplying the value contained
   *    in register `X` by the value of `Y`.
   * - `jnz X Y` jumps with an offset of the value of `Y`, but only if the value
   *    of `X` is not zero. (An offset of 2 skips the next instruction, an offset
   *    of -1 jumps to the previous instruction, and so on.)
   */

  const VALID_OPS = ['set', 'sub', 'mul', 'jnz'];
  const registers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const parseLine = line => {
    let parts = line.split(' ');

    if (!VALID_OPS.includes(parts[0])) {
      throw new Error(`Invalid op passed: "${parts[0]}" in line "${line}"`);
    }

    const args = [];

    if (!registers.includes(parts[1])) {
      const raw_arg = parts[1];
      parts[1] = parseInt(parts[1], 10);

      if (Number.isNaN(parts[1])) {
        throw new Error(`Invalid number / register as arugment passed: "${raw_arg}" in line "${line}"`);
      }
    }

    args.push(parts[1]);

    if (parts[2] != null && !registers.includes(parts[2])) {
      const raw_arg = parts[2];
      parts[2] = parseInt(parts[2], 10);

      if (Number.isNaN(parts[2])) {
        throw new Error(`Invalid number / register as arugment passed: "${raw_arg}" in line "${line}"`);
      }
    }

    if (parts[2] != null) {
      args.push(parts[2]);
    }

    return {
      op: parts[0],
      args
    };
  };
  /**
   * I'm not really handling state "the React way"
   * because this component doesn't know when its props change.
   * So I run `forceUpdate` every time the program changes.
   * 🤷‍♂️
   */

  class Device extends React__default['default'].Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "reset", () => {
        this.registers = JSON.parse(JSON.stringify(this.starting_registers));
        this.program = JSON.parse(JSON.stringify(this.starting_program));
        this.instruction = this.starting_instruction;
        this.instruction_count = VALID_OPS.reduce((obj, r) => {
          obj[r] = 0;
          return obj;
        }, {});
        this.forceUpdate();
      });

      _defineProperty(this, "run", (register_to_print = 'h') => {
        let line = this.program[this.instruction];

        while (line) {
          this.step();
          line = this.program[this.instruction];
        }

        return this.registers[register_to_print];
      });

      _defineProperty(this, "runUntilBreak", () => {
        let line = this.program[this.instruction];
        let stepped_at_least_once = false;
        /* eslint-disable */

        while (line) {
          try {
            // Importantly, get variables in local scope so eval works
            let {
              a,
              b,
              c,
              d,
              e,
              f,
              g,
              h
            } = this.registers;
            let i = this.instruction;

            if (eval(this.state.breakOn)) {
              this.forceUpdate();

              if (stepped_at_least_once) {
                break;
              }
            }
          } catch (e) {}

          stepped_at_least_once = true;
          this.step();
          line = this.program[this.instruction];
        }
        /* eslint-enable */


        this.forceUpdate();
      });

      _defineProperty(this, "step", (n = 1) => {
        for (let i = 0; i < n; i++) {
          if (!this.program[this.instruction]) {
            return false;
          }

          const {
            op,
            args
          } = this.program[this.instruction]; // Run the opcode

          let value = this[op].apply(this, args);

          if (op === 'jnz' && value === true) ; else {
            this.instruction++;
          }
        }

        this.forceUpdate();
      });

      _defineProperty(this, "getValueOf", x => {
        return typeof x === 'string' ? this.registers[x] : x;
      });

      _defineProperty(this, "set", (register, value) => {
        ++this.instruction_count.set;
        this.registers[register] = this.getValueOf(value);
      });

      _defineProperty(this, "sub", (register, value) => {
        ++this.instruction_count.sub;
        this.registers[register] -= this.getValueOf(value);
      });

      _defineProperty(this, "mul", (register, value) => {
        ++this.instruction_count.mul;
        this.registers[register] *= this.getValueOf(value);
      });

      _defineProperty(this, "jnz", (value, offset) => {
        ++this.instruction_count.jnz;

        if (this.getValueOf(value) !== 0) {
          this.instruction += this.getValueOf(offset);
          return true;
        } else {
          return false;
        }
      });

      _defineProperty(this, "setDeviceBreakOn", breakOn => {
        this.setState({
          breakOn
        });
      });

      _defineProperty(this, "handleSetToChange", e => {
        let toSet = e.target.value;

        if (toSet === 'i') {
          toSet = 'instruction';
        } else if (toSet === 'l') {
          toSet = 'line';
        }

        this.setState({
          toSet
        });
      });

      _defineProperty(this, "handleValueChange", e => {
        this.setState({
          valueToSetTo: e.target.value
        });
      });

      _defineProperty(this, "handleSetTo", () => {
        const {
          toSet: setTo,
          valueToSetTo
        } = this.state;

        if (setTo === 'line') {
          let line = parseLine(valueToSetTo);
          this.program[this.instruction] = line;
        } else {
          const value = parseInt(valueToSetTo, 10);

          if (Number.isNaN(value)) {
            return;
          }

          if (this[setTo] !== undefined) {
            this[setTo] = value;
          }

          if (this.registers[setTo] !== undefined) {
            this.registers[setTo] = value;
          }
        }

        this.forceUpdate();
      });

      const {
        program = [],
        starting_registers = registers.reduce((obj, r) => {
          obj[r] = 0;
          return obj;
        }, {}),
        starting_instruction = 0
      } = props; // Clone the arrays we pass in

      this.program = JSON.parse(JSON.stringify(program));
      this.registers = JSON.parse(JSON.stringify(starting_registers)); // Save for resets later

      this.starting_registers = starting_registers;
      this.starting_program = program;
      this.starting_instruction = starting_instruction;
      this.instruction = starting_instruction;
      this.instruction_count = VALID_OPS.reduce((obj, r) => {
        obj[r] = 0;
        return obj;
      }, {});
      this.state = {
        breakOn: '',
        toSet: 'a',
        valueToSetTo: 1
      };
    }

    render() {
      return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", null, "Set", ' ', /*#__PURE__*/React__default['default'].createElement("input", {
        style: {
          width: '9em'
        },
        onChange: this.handleSetToChange,
        value: this.state.toSet
      }), ' ', "=", ' ', /*#__PURE__*/React__default['default'].createElement("input", {
        style: {
          width: '9em'
        },
        onChange: this.handleValueChange,
        value: this.state.valueToSetTo
      }), /*#__PURE__*/React__default['default'].createElement("button", {
        style: {
          fontSize: '13px',
          lineHeight: '13px',
          padding: '2px',
          color: 'royalblue'
        },
        onClick: () => this.handleSetTo()
      }, /*#__PURE__*/React__default['default'].createElement("span", null, "\u2714"), "\uFE0F Set")), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "device"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        style: {
          flexGrow: 2
        }
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        style: {
          display: 'flex'
        }
      }, /*#__PURE__*/React__default['default'].createElement(Registers, {
        registers: this.registers
      }), /*#__PURE__*/React__default['default'].createElement(InstructionCount, {
        intructionCount: this.instruction_count
      })), /*#__PURE__*/React__default['default'].createElement("br", null), /*#__PURE__*/React__default['default'].createElement(BreakOn, {
        setDeviceBreakOn: this.setDeviceBreakOn
      })), /*#__PURE__*/React__default['default'].createElement(Program, {
        program: this.program,
        instruction: this.instruction
      }), this.instruction > this.program.length - 1 ? null : /*#__PURE__*/React__default['default'].createElement(Controls, {
        step: this.step,
        runUntilBreak: this.runUntilBreak
      })), /*#__PURE__*/React__default['default'].createElement("button", {
        style: {
          fontSize: '1em'
        },
        onClick: this.reset
      }, "Reset"), ' ', /*#__PURE__*/React__default['default'].createElement("button", {
        style: {
          fontSize: '1em'
        },
        onClick: this.props.loadNewProgram
      }, "Load new Program"));
    }

  }

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

  class App extends React__default['default'].Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "resetState", () => {
        this.setState({
          data: null,
          run: false,
          dataError: ""
        });
      });

      _defineProperty(this, "parseProgramAndRun", () => {
        let data_str = String(this.data_ref.current.value).trim();

        if (!data_str) {
          this.setState({
            dataError: "Empty program passed in."
          });
          return;
        }

        let data_arr = data_str.split("\n");
        const data = []; // Run using for loop instead of `map` so I can catch errors

        try {
          for (let i = 0; i < data_arr.length; i++) {
            data.push(parseLine(data_arr[i]));
          }
        } catch (e) {
          this.setState({
            dataError: e.toString()
          });
          return;
        } // If we are here, we have a valid data


        this.setState({
          data,
          run: true
        });
      });

      this.data_ref = /*#__PURE__*/React__default['default'].createRef();
      this.state = {
        data: null,
        run: false,
        dataError: ""
      };
    }

    componentDidMount() {
      if (this.data_ref?.current) this.data_ref.current.value = initial_data;
    }

    componentDidUpdate() {
      if (this.data_ref?.current) {
        this.data_ref.current.value = initial_data;
      }
    }

    render() {
      if (!this.state.run) {
        return /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("p", null, "Enter the program input, separated by newlines:"), /*#__PURE__*/React__default['default'].createElement("textarea", {
          rows: "16",
          cols: "46",
          ref: this.data_ref,
          onClick: () => this.setState({
            dataError: null
          })
        }), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("button", {
          onClick: () => this.parseProgramAndRun()
        }, "Run Program"), this.state.dataError ? /*#__PURE__*/React__default['default'].createElement("p", {
          style: {
            color: "red"
          }
        }, this.state.dataError) : null));
      }

      return /*#__PURE__*/React__default['default'].createElement(Device, {
        program: this.state.data,
        loadNewProgram: this.resetState
      });
    }

  }

  const rootElement = document.getElementById("root");
  ReactDOM__default['default'].render( /*#__PURE__*/React__default['default'].createElement(App, null), rootElement);

}(React, ReactDOM));
//# sourceMappingURL=main.bundle.js.map
