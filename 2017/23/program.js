// Helper, I use this a bit
const isStr = val => typeof val === 'string';
const default_registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
};

class Program {
    constructor(program, registers = default_registers) {
        this.program = JSON.parse(JSON.stringify(program));
        this.registers = registers;
        this.index = 0;
        this.finished = false;

        this.mul_instruction_count = 0;
    }

    set(register, value) {
        this.registers[register] = this.getValueAtRegister(value);
    }

    sub(register, value) {
        this.registers[register] -= this.getValueAtRegister(value);
    }

    mul(register, value) {
        this.mul_instruction_count++;
        this.registers[register] *= this.getValueAtRegister(value);
    }

    jnz(value, offset) {
        if (this.getValueAtRegister(value) !== 0) {
            this.index += this.getValueAtRegister(offset);
            return true;
        } else {
            return false;
        }
    }

    getValueAtRegister(value) {
        return isStr(value) ? this.registers[value] : value;
    }

    tick() {
        let { type, x, y } = this.program[this.index] || {};
        if (!type) return false;

        let value = this[type](x, y);
        if (type === 'jnz' && value === true) {
            // Do nothing, we jumped. Otherwise, skip the `jnz` instruction
        } else {
            this.index++;
        }
        return true;
    }

    run() {
        while (this.tick()) {
            // Do nothing...
        }

        return this.mul_instruction_count;
    }

    peekCurrentInstructionType() {
        return this.program[this.index].type;
    }
}

module.exports = Program;
