class DeviceInstructions {
    constructor(program, starting_registers = { a: 0, b: 0 }, starting_instruction = 0) {
        // Clone the arrays we pass in
        this.program = JSON.parse(JSON.stringify(program));
        this.registers = JSON.parse(JSON.stringify(starting_registers));

        this.instruction = starting_instruction;
    }

    run() {
        let line = this.program[this.instruction];
        if (line) {
            let { op, register, jump } = line;
            return this[op](register, jump);
        }

        return false;
    }

    /**
     * Opcodes
     */

    // hlf r sets register r to half its current value, then continues with the next instruction.
    hlf(register) {
        this.registers[register] /= 2;
        return ++this.instruction;
    }

    // tpl r sets register r to triple its current value, then continues with the next instruction.
    tpl(register) {
        this.registers[register] *= 3;
        return ++this.instruction;
    }

    // inc r increments register r, adding 1 to it, then continues with the next instruction.
    inc(register) {
        this.registers[register] += 1;
        return ++this.instruction;
    }

    // jmp offset is a jump; it continues with the instruction offset away relative to itself.
    jmp(register, jump) {
        this.instruction += jump;
        return this.instruction;
    }

    // jie r, offset is like jmp, but only jumps if register r is even ("jump if even").
    jie(register, jump) {
        if (this.registers[register] % 2 === 0) {
            this.instruction += jump;
        } else {
            this.instruction++;
        }
        return this.instruction;
    }

    // jio r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).
    jio(register, jump) {
        if (this.registers[register] === 1) {
            this.instruction += jump;
        } else {
            this.instruction++;
        }
        return this.instruction;
    }
}

module.exports = DeviceInstructions;
