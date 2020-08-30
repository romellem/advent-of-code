import React from 'react';
import Program from './Program';
import Registers from './Registers';
import InstructionCount from './InstructionCount';
import BreakOn from './BreakOn';
import Controls from './Controls';

/**
 * - `set X Y` sets register `X` to the value of `Y`.
 * - `sub X Y` decreases register `X` by the value of `Y`.
 * - `mul X Y` sets register `X` to the result of multiplying the value contained
 *    in register `X` by the value of `Y`.
 * - `jnz X Y` jumps with an offset of the value of `Y`, but only if the value
 *    of `X` is not zero. (An offset of 2 skips the next instruction, an offset
 *    of -1 jumps to the previous instruction, and so on.)
 */

export const VALID_OPS = ['set', 'sub', 'mul', 'jnz'];
export const registers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const parseLine = (line) => {
	let parts = line.split(' ');
	if (!VALID_OPS.includes(parts[0])) {
		throw new Error(`Invalid op passed: "${parts[0]}" in line "${line}"`);
	}

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
			starting_registers = registers.reduce((obj, r) => {
				obj[r] = 0;
				return obj;
			}, {}),
			starting_instruction = 0,
		} = props;

		// Clone the arrays we pass in
		this.program = JSON.parse(JSON.stringify(program));
		this.registers = JSON.parse(JSON.stringify(starting_registers));

		// Save for resets later
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
			valueToSetTo: 1,
		};
	}

	reset = () => {
		this.registers = JSON.parse(JSON.stringify(this.starting_registers));
		this.program = JSON.parse(JSON.stringify(this.starting_program));
		this.instruction = this.starting_instruction;
		this.instruction_count = VALID_OPS.reduce((obj, r) => {
			obj[r] = 0;
			return obj;
		}, {});
		this.forceUpdate();
	};

	run = (register_to_print = 'h') => {
		let line = this.program[this.instruction];

		while (line) {
			this.step();

			line = this.program[this.instruction];
		}

		return this.registers[register_to_print];
	};

	runUntilBreak = () => {
		let line = this.program[this.instruction];
		let stepped_at_least_once = false;

		/* eslint-disable */
		while (line) {
			try {
				// Importantly, get variables in local scope so eval works
				let { a, b, c, d, e, f, g, h } = this.registers;
				let i = this.instruction;

				if (eval(this.state.breakOn)) {
					this.forceUpdate();

					if (stepped_at_least_once) {
						break;
					}
				}
			} catch (e) {}

			stepped_at_least_once = true
			this.step();

			line = this.program[this.instruction];
		}
		/* eslint-enable */

		this.forceUpdate();
	};

	step = (n = 1) => {
		for (let i = 0; i < n; i++) {
			if (!this.program[this.instruction]) {
				return false;
			}

			const { op, args } = this.program[this.instruction];

			// Run the opcode
			let value = this[op].apply(this, args);

			if (op === 'jnz' && value === true) {
				// Do nothing, we jumped. Otherwise, skip the `jnz` instruction
			} else {
				this.instruction++;
			}
		}

		this.forceUpdate();
	};

	getValueOf = (x) => {
		return typeof x === 'string' ? this.registers[x] : x;
	};

	/**
	 * START - Opcodes
	 */

	set = (register, value) => {
		++this.instruction_count.set;
		this.registers[register] = this.getValueOf(value);
	};

	sub = (register, value) => {
		++this.instruction_count.sub;
		this.registers[register] -= this.getValueOf(value);
	};

	mul = (register, value) => {
		++this.instruction_count.mul;
		this.registers[register] *= this.getValueOf(value);
	};

	jnz = (value, offset) => {
		++this.instruction_count.jnz;
		if (this.getValueOf(value) !== 0) {
			this.instruction += this.getValueOf(offset);
			return true;
		} else {
			return false;
		}
	};

	/**
	 * END - Opcodes
	 */

	setDeviceBreakOn = (breakOn) => {
		this.setState({ breakOn });
	};

	handleSetToChange = (e) => {
		let toSet = e.target.value;
		if (toSet === 'i') {
			toSet = 'instruction';
		} else if (toSet === 'l') {
			toSet = 'line';
		}

		this.setState({ toSet });
	};

	handleValueChange = (e) => {
		this.setState({ valueToSetTo: e.target.value });
	};

	handleSetTo = () => {
		const { toSet: setTo, valueToSetTo } = this.state;

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
	};

	render() {
		return (
			<React.Fragment>
				<div>
					Set{' '}
					<input
						style={{ width: '9em' }}
						onChange={this.handleSetToChange}
						value={this.state.toSet}
					/>{' '}
					={' '}
					<input
						style={{ width: '9em' }}
						onChange={this.handleValueChange}
						value={this.state.valueToSetTo}
					/>
					<button
						style={{
							fontSize: '13px',
							lineHeight: '13px',
							padding: '2px',
							color: 'royalblue',
						}}
						onClick={() => this.handleSetTo()}
					>
						<span>✔</span>️ Set
					</button>
				</div>
				<div className="device">
					<div style={{ flexGrow: 2 }}>
						<div style={{ display: 'flex' }}>
							<Registers registers={this.registers} />
							<InstructionCount intructionCount={this.instruction_count} />
						</div>
						<br />
						<BreakOn setDeviceBreakOn={this.setDeviceBreakOn} />
					</div>
					<Program program={this.program} instruction={this.instruction} />

					{this.instruction > this.program.length - 1 ? null : (
						<Controls step={this.step} runUntilBreak={this.runUntilBreak} />
					)}
				</div>
				<button style={{ fontSize: '1em' }} onClick={this.reset}>
					Reset
				</button>
				{' '}
				<button style={{ fontSize: '1em' }} onClick={this.props.loadNewProgram}>
					Load new Program
				</button>
			</React.Fragment>
		);
	}
}
