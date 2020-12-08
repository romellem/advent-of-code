class Computer {
	constructor(input) {
		this.raw_input = input.slice(0);
		this.reset();
	}

	reset() {
		this.program = this.parseInput(this.raw_input);
		this.accu = 0;
		this.instruction = 0;
		this.record = {};
	}

	parseInput(input) {
		return input.map((line) => {
			let [, command, arg] = /(\w+) (.+)$/.exec(line);
			arg = Number(arg);
			return { command, arg };
		});
	}
	acc(arg) {
		this.accu += arg;
		this.updateRecord();
		this.instruction++;
	}
	jmp(arg) {
		this.updateRecord();
		this.instruction += arg;
	}
	nop() {
		this.updateRecord();
		this.instruction++;
	}

	updateRecord() {
		if (!this.record[this.instruction]) {
			this.record[this.instruction] = 0;
		}
		this.record[this.instruction]++;
	}

	getMaxRecord() {
		let max = 0;
		let counts = Object.values(this.record);
		for (let count of counts) {
			if (count > max) max = count;
		}
		return max;
	}

	runUntil2nd() {
		let acc_before;
		do {
			let { command, arg } = this.program[this.instruction];
			acc_before = this.accu;
			this[command](arg);
		} while (this.getMaxRecord() < 2);
		return acc_before;
	}

	runUntilN(n) {
		do {
			let cmd = this.program[this.instruction];
			if (!cmd) {
				return this.accu;
			}
			let { command, arg } = cmd;
			this[command](arg);
		} while (this.getMaxRecord() < n);
		return null;
	}

	tryChanges() {
		this.reset();
		for (let i = 0; i < this.program.length; i++) {
			let cmd = this.program[i];
			if (cmd.command === 'jmp') {
				cmd.command = 'nop';
			} else if (cmd.command === 'nop') {
				cmd.command = 'jmp';
			} else {
				continue;
			}

			let val = this.runUntilN(2);
			if (val !== null) {
				return val;
			}
			this.reset();
		}
	}
}

module.exports = { Computer };
