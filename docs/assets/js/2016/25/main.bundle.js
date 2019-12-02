function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// START - Program.js
const lineToString = line => {
  return line.op + ' ' + line.args[0] + ' ' + (line.args[1] || '');
};

const Program = ({
  program,
  instruction
} = {}) => {
  const rows = program.map((line, i) => {
    const active = i === instruction;
    const active_class = active ? 'active' : '';
    return React.createElement("tr", {
      className: active_class
    }, React.createElement("td", {
      className: active_class
    }, active ? React.createElement("b", {
      style: {
        color: 'maroon'
      }
    }, "*") : ''), React.createElement("td", {
      className: active_class,
      style: {
        textAlign: 'right',
        paddingRight: '1em'
      }
    }, active ? React.createElement("b", null, i) : i), React.createElement("td", {
      className: active_class
    }, lineToString(line)));
  });
  return React.createElement("div", {
    style: {
      flexGrow: 1
    }
  }, React.createElement("table", null, React.createElement("tbody", null, rows)), React.createElement("div", null, instruction > program.length - 1 ? React.createElement("b", {
    style: {
      color: 'green'
    }
  }, "Done") : null));
}; // END - Program.js
// START - Registers.js


const Registers = ({
  registers,
  signal
} = {}) => {
  const {
    a,
    b,
    c,
    d
  } = registers;
  return React.createElement(
		'div',
		null,
		'Registers:',
		React.createElement(
			'ul',
			{
				style: {
					margin: 0,
					paddingLeft: '10px',
				},
			},
			React.createElement('li', null, 'a: ', a),
			React.createElement('li', null, 'b: ', b),
			React.createElement('li', null, 'c: ', c),
			React.createElement('li', null, 'd: ', d)
		),
	  React.createElement("br", null),
	    'Signal: ',
	    signal
	);

}; // END - Registers.js
// START - BreakOn.js


class BreakOn extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.myRef.current.onchange = e => {
      this.props.setDeviceBreakOn(this.myRef.current.value);
    };
  }

  render() {
    return React.createElement("label", null, "Break on: ", React.createElement("input", {
      ref: this.myRef
    }));
  }

} // END - BreakOn.js
// START - Controls.js


const Button = ({
  step,
  steps,
  children
} = {}) => {
  const fn = () => step(steps);

  return React.createElement("button", {
    onClick: fn
  }, children);
};

const Controls = props => {
  return React.createElement("div", null, React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, React.createElement(Button, {
    step: props.runUntilBreak
  }, "\u25B6")), React.createElement("div", null, React.createElement(Button, {
    step: props.step,
    steps: 1
  }, ">"), React.createElement(Button, {
    step: props.step,
    steps: 10
  }, "\u226B"), React.createElement(Button, {
    step: props.step,
    steps: 100
  }, "\u22D9")));
}; // END - Controls.js
// START - Device.js

/**
 * `cpy x y` _copies_ `x` (either an integer or the _value_ of a register) into register `y`.
 * `inc x` _increases_ the value of register `x` by one.
 * `dec x` _decreases_ the value of register `x` by one.
 * `jnz x y` _jumps_ to an instruction `y` away (positive means forward; negative means backward), but only if `x` is _not zero_.
 *
 * `tgl x` _toggles_ the instruction `x` away (pointing at instructions like `jnz` does: positive means forward; negative means backward):
 *   - For _one-argument_ instructions, `inc` becomes `dec`, and all other one-argument instructions become `inc`.
 *   - For _two-argument_ instructions, `jnz` becomes `cpy`, and all other two-instructions become `jnz`.
 *   - The arguments of a toggled instruction are _not affected_.
 *   - If an attempt is made to toggle an instruction outside the program, _nothing happens_.
 *   - If toggling produces an _invalid instruction_ (like `cpy 1 2`) and an attempt is later made to execute that instruction, `skip it instead`.
 *   - If `tgl` toggles _itself_ (for example, if `a` is `0`, `tgl a` would target itself and become `inc a`), the resulting instruction is not executed until the next time it is reached.
 */


const TOGGLE_TRANSFORMS = {
  inc: 'dec',
  dec: 'inc',
  tgl: 'inc',
  jnz: 'cpy',
  cpy: 'jnz',
  out: 'inc'
};
const VALID_OPS = Object.keys(TOGGLE_TRANSFORMS);

const parseLine = line => {
  let parts = line.split(" ");

  if (!VALID_OPS.includes(parts[0])) {
    throw new Error(`Invalid op passed: "${parts[0]}" in line "${line}"`);
  }

  const registers = ["a", "b", "c", "d"];
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


class Device extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "reset", () => {
      this.registers = JSON.parse(JSON.stringify(this.starting_registers));
      this.program = JSON.parse(JSON.stringify(this.starting_program));
      this.instruction = 0;
      this.forceUpdate();
    });

    _defineProperty(this, "run", (register_to_print = 'a') => {
      let line = this.program[this.instruction];

      while (line) {
        let {
          op,
          args
        } = line; // Run the opcode

        this[op].apply(this, args);
        line = this.program[this.instruction];
      }

      return this.registers[register_to_print];
    });

    _defineProperty(this, "runUntilBreak", () => {
      let line = this.program[this.instruction];
      /* eslint-disable */

      while (line) {
        const {
          a,
          b,
          c,
          d
        } = this.registers;
        const i = this.instruction;

        try {
          if (eval(this.state.breakOn)) {
            this.forceUpdate();
            break;
          }
        } catch (e) {}

        let {
          op,
          args
        } = line; // Run the opcode

        this[op].apply(this, args);
        line = this.program[this.instruction];
      }
      /* eslint-enable */


      this.forceUpdate();
    });

    _defineProperty(this, "step", (n = 1) => {
      for (let i = 0; i < n; i++) {
        const {
          op,
          args
        } = this.program[this.instruction]; // Run the opcode

        this[op].apply(this, args);
      }

      this.forceUpdate();
    });

    _defineProperty(this, "getValueOf", x => {
      return typeof x === 'string' ? this.registers[x] : x;
    });

    _defineProperty(this, "cpy", (x, y) => {
      this.instruction++; // Invalid instruction, skip

      if (typeof y !== 'string') {
        return;
      }

      this.registers[y] = this.getValueOf(x);
      return this.registers;
    });

    _defineProperty(this, "inc", x => {
      this.registers[x] += 1;
      this.instruction++;
      return this.registers;
    });

    _defineProperty(this, "dec", x => {
      this.registers[x] -= 1;
      this.instruction++;
      return this.registers;
    });

    _defineProperty(this, "jnz", (x, y) => {
      x = this.getValueOf(x);
      y = this.getValueOf(y);

      if (x === 0) {
        // Then just move forward as normal
        this.instruction++;
      } else {
        // Otherwise, jump our instruction
        this.instruction += y;
      }

      return this.registers;
    });

    _defineProperty(this, "tgl", x => {
      x = this.getValueOf(x);
      let instruction_to_modify = this.instruction + x;

      if (this.program[instruction_to_modify]) {
        let current_op = this.program[instruction_to_modify].op;
        this.program[instruction_to_modify].op = TOGGLE_TRANSFORMS[current_op];
      }

      this.instruction++;
    });
    
    // Day 25 - Manually added `out` opcode
    _defineProperty(this, "out", x => {
      x = this.getValueOf(x);
		this.signal += x;

		this.instruction++;
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
      starting_registers = {
        a: 7,
        b: 0,
        c: 0,
        d: 0
      },
      starting_instruction = 0
    } = props; // Clone the arrays we pass in

    this.program = JSON.parse(JSON.stringify(program));
    this.registers = JSON.parse(JSON.stringify(starting_registers)); // Save for resets later
    
    this.signal = '';

    this.starting_registers = starting_registers;
    this.starting_program = program;
    this.instruction = starting_instruction;
    this.state = {
      breakOn: '',
      toSet: 'a',
      valueToSetTo: 12
    };
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("div", null, "Set", ' ', React.createElement("input", {
      style: {
        width: '9em'
      },
      onChange: this.handleSetToChange,
      value: this.state.toSet
    }), ' ', "=", ' ', React.createElement("input", {
      style: {
        width: '9em'
      },
      onChange: this.handleValueChange,
      value: this.state.valueToSetTo
    }), React.createElement("button", {
      style: {
        fontSize: '13px',
        lineHeight: '13px',
        padding: '2px',
        color: 'royalblue'
      },
      onClick: () => this.handleSetTo()
    }, React.createElement("span", null, "\u2714"), "\uFE0F Set")), React.createElement("div", {
      className: "device"
    }, React.createElement("div", {
      style: {
        flexGrow: 2
      }
    }, React.createElement(Registers, {
      registers: this.registers,
      signal: this.signal
    }), React.createElement("br", null), React.createElement(BreakOn, {
      setDeviceBreakOn: this.setDeviceBreakOn
    })), React.createElement(Program, {
      program: this.program,
      instruction: this.instruction
    }), this.instruction > this.program.length - 1 ? null : React.createElement(Controls, {
      step: this.step,
      runUntilBreak: this.runUntilBreak
    })), React.createElement("button", {
      style: {
        fontSize: '1em'
      },
      onClick: this.reset
    }, "Reset"));
  }

} // END - Device.js


const initial_data = `cpy a d
cpy 9 c
cpy 282 b
inc d
dec b
jnz b -2
dec c
jnz c -5
cpy d a
jnz 0 0
cpy a b
cpy 0 a
cpy 2 c
jnz b 2
jnz 1 6
dec b
dec c
jnz c -4
inc a
jnz 1 -7
cpy 2 b
jnz c 2
jnz 1 4
dec b
dec c
jnz 1 -4
jnz 0 0
out b
jnz a -19
jnz 1 -21`;

class App extends React.Component {
  constructor(props) {
    super(props);

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

    this.data_ref = React.createRef();
    this.state = {
      data: null,
      run: false,
      dataError: ""
    };
  }

  componentDidMount() {
    this.data_ref.current.value = initial_data;
  }

  render() {
    if (!this.state.run) {
      return React.createElement("div", null, React.createElement("p", null, "Enter the program input, separated by newlines:"), React.createElement("textarea", {
        rows: "16",
        cols: "46",
        ref: this.data_ref,
        onClick: () => this.setState({
          dataError: null
        })
      }), React.createElement("div", null, React.createElement("button", {
        onClick: () => this.parseProgramAndRun()
      }, "Run Program"), this.state.dataError ? React.createElement("p", {
        style: {
          color: "red"
        }
      }, this.state.dataError) : null));
    }

    return React.createElement(Device, {
      program: this.state.data
    });
  }

}

const rootElement = document.getElementById('root');
ReactDOM.render(React.createElement(App, null), rootElement);
