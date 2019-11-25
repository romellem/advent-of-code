import React from "react";
import Program from "./Program";
import Registers from "./Registers";
import BreakOn from "./BreakOn";
import Controls from "./Controls";

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

export const TOGGLE_TRANSFORMS = {
  inc: "dec",
  dec: "inc",
  tgl: "inc",
  jnz: "cpy",
  cpy: "jnz"
};

const VALID_OPS = Object.keys(TOGGLE_TRANSFORMS);

export const parseLine = line => {
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
      throw new Error(
        `Invalid number / register as arugment passed: "${raw_arg}" in line "${line}"`
      );
    }
  }

  args.push(parts[1]);

  if (parts[2] != null && !registers.includes(parts[2])) {
    const raw_arg = parts[2];
    parts[2] = parseInt(parts[2], 10);

    if (Number.isNaN(parts[2])) {
      throw new Error(
        `Invalid number / register as arugment passed: "${raw_arg}" in line "${line}"`
      );
    }
  }

  if (parts[2] != null) {
    args.push(parts[2]);
  }

  return { op: parts[0], args };
};

/**
 * I'm not really handling state "the React way"
 * because this component doesn't know when its props change.
 * So I run `forceUpdate` every time the program changes.
 * 🤷‍♂️
 */
export default class Device extends React.Component {
  constructor(props) {
    super(props);
    const {
      program = [],
      starting_registers = { a: 7, b: 0, c: 0, d: 0 },
      starting_instruction = 0
    } = props;

    // Clone the arrays we pass in
    this.program = JSON.parse(JSON.stringify(program));
    this.registers = JSON.parse(JSON.stringify(starting_registers));

    // Save for resets later
    this.starting_registers = starting_registers;
    this.starting_program = program;

    this.instruction = starting_instruction;
    this.state = {
      breakOn: "",
      toSet: "a",
      valueToSetTo: 12
    };
  }

  reset = () => {
    this.registers = JSON.parse(JSON.stringify(this.starting_registers));
    this.program = JSON.parse(JSON.stringify(this.starting_program));
    this.instruction = 0;
    this.forceUpdate();
  };

  run = (register_to_print = "a") => {
    let line = this.program[this.instruction];

    while (line) {
      let { op, args } = line;

      // Run the opcode
      this[op].apply(this, args);

      line = this.program[this.instruction];
    }

    return this.registers[register_to_print];
  };

  runUntilBreak = () => {
    let line = this.program[this.instruction];

    /* eslint-disable */
    while (line) {
      const { a, b, c, d } = this.registers;
      const i = this.instruction;

      try {
        if (eval(this.state.breakOn)) {
          this.forceUpdate();
          break;
        }
      } catch (e) {}

      let { op, args } = line;

      // Run the opcode
      this[op].apply(this, args);

      line = this.program[this.instruction];
    }
    /* eslint-enable */

    this.forceUpdate();
  };

  step = (n = 1) => {
    for (let i = 0; i < n; i++) {
      const { op, args } = this.program[this.instruction];

      // Run the opcode
      this[op].apply(this, args);
    }

    this.forceUpdate();
  };

  getValueOf = x => {
    return typeof x === "string" ? this.registers[x] : x;
  };

  /**
   * Opcodes
   */

  // Copy - copies `x` (either an integer or the value of a register) into register `y`.
  cpy = (x, y) => {
    this.instruction++;

    // Invalid instruction, skip
    if (typeof y !== "string") {
      return;
    }

    this.registers[y] = this.getValueOf(x);

    return this.registers;
  };

  // Increase - increases the value of register `x` by one.
  inc = x => {
    this.registers[x] += 1;

    this.instruction++;

    return this.registers;
  };

  // Decrease - decreases the value of register `x` by one.
  dec = x => {
    this.registers[x] -= 1;

    this.instruction++;

    return this.registers;
  };

  // Jump - jumps to an instruction `y` away (positive means forward; negative means backward), but only if `x` is not zero.
  jnz = (x, y) => {
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
  };

  // Toggle
  tgl = x => {
    x = this.getValueOf(x);

    let instruction_to_modify = this.instruction + x;
    if (this.program[instruction_to_modify]) {
      let current_op = this.program[instruction_to_modify].op;
      this.program[instruction_to_modify].op = TOGGLE_TRANSFORMS[current_op];
    }

    this.instruction++;
  };

  setDeviceBreakOn = breakOn => {
    this.setState({ breakOn });
  };

  handleSetToChange = e => {
    let toSet = e.target.value;
    if (toSet === "i") {
      toSet = "instruction";
    } else if (toSet === "l") {
      toSet = "line";
    }

    this.setState({ toSet });
  };

  handleValueChange = e => {
    this.setState({ valueToSetTo: e.target.value });
  };

  handleSetTo = () => {
    const { toSet: setTo, valueToSetTo } = this.state;

    if (setTo === "line") {
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
  };

  render() {
    return (
      <React.Fragment>
        <div>
          Set{" "}
          <input
            style={{ width: "9em" }}
            onChange={this.handleSetToChange}
            value={this.state.toSet}
          />{" "}
          ={" "}
          <input
            style={{ width: "9em" }}
            onChange={this.handleValueChange}
            value={this.state.valueToSetTo}
          />
          <button
            style={{
              fontSize: "13px",
              lineHeight: "13px",
              padding: "2px",
              color: "royalblue"
            }}
            onClick={() => this.handleSetTo()}
          >
            <span>✔</span>️ Set
          </button>
        </div>
        <div className="device">
          <div style={{ flexGrow: 2 }}>
            <Registers registers={this.registers} />
            <br />
            <BreakOn setDeviceBreakOn={this.setDeviceBreakOn} />
          </div>
          <Program program={this.program} instruction={this.instruction} />

          {this.instruction > this.program.length - 1 ? null : (
            <Controls step={this.step} runUntilBreak={this.runUntilBreak} />
          )}
        </div>
        <button style={{ fontSize: "1em" }} onClick={this.reset}>
          Reset
        </button>
      </React.Fragment>
    );
  }
}
