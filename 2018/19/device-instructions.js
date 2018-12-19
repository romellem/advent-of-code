class DeviceInstructions {
    constructor(program, starting_registers = [0, 0, 0, 0, 0, 0]) {
        // Clone the arrays we pass in
        this.program = JSON.parse(JSON.stringify(program));
        this.registers = JSON.parse(JSON.stringify(starting_registers));

        this.input_pointer;
        this.instruction;
    }

    setInputPointer(val) {
        this.input_pointer = val;
    }

    printRegisters() {
        console.log(this.registers);
    }

    run(print_log = false) {
        this.instruction = this.registers[this.input_pointer];
        let line = this.program[this.instruction];

        let log;
        if (line) {
            let [opcode, a, b, c] = line;

            if (print_log) {
                log = `ip=${this.instruction} [${this.registers.join(', ')}] ${opcode} ${a} ${b} ${c} `;
            }

            // Run the opcode
            this[opcode](a, b, c);
            if (print_log) {
                log += `[${this.registers.join(', ')}]`;
                console.log(log);
            }

            // Increment out input pointer
            this.registers[this.input_pointer]++;

            return true;
        } else {
            // If we have no line, the program has halted
            return false;
        }
    }

    /**
     * Opcodes
     */

    // Add Register - stores into register C the result of adding register A and register B.
    addr(a, b, c) {
        this.registers[c] = this.registers[a] + this.registers[b];
        return this.registers;
    }

    // Add Immediate - stores into register C the result of adding register A and value B.
    addi(a, b, c) {
        this.registers[c] = this.registers[a] + b;
        return this.registers;
    }

    // Multiply Register - stores into register C the result of multiplying register A and register B.
    mulr(a, b, c) {
        this.registers[c] = this.registers[a] * this.registers[b];
        return this.registers;
    }

    // Multiply Immediate - stores into register C the result of multiplying register A and value B.
    muli(a, b, c) {
        this.registers[c] = this.registers[a] * b;
        return this.registers;
    }

    // Bitwise AND Register - stores into register C the result of the bitwise AND of register A and register B.
    banr(a, b, c) {
        this.registers[c] = this.registers[a] & this.registers[b];
        return this.registers;
    }

    // Bitwise AND Immediate - stores into register C the result of the bitwise AND of register A and value B.
    bani(a, b, c) {
        this.registers[c] = this.registers[a] & b;
        return this.registers;
    }

    // Bitwise OR Register - stores into register C the result of the bitwise OR of register A and register B.
    borr(a, b, c) {
        this.registers[c] = this.registers[a] | this.registers[b];
        return this.registers;
    }

    // Bitwise OR Immediate - stores into register C the result of the bitwise OR of register A and value B.
    bori(a, b, c) {
        this.registers[c] = this.registers[a] | b;
        return this.registers;
    }

    // Set Register - copies the contents of register A into register C. (Input B is ignored.)
    setr(a, b, c) {
        this.registers[c] = this.registers[a];
        return this.registers;
    }

    // Set Immediate - stores value A into register C. (Input B is ignored.)
    seti(a, b, c) {
        this.registers[c] = a;
        return this.registers;
    }

    // Greater-than Immediate/Register - sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
    gtir(a, b, c) {
        this.registers[c] = a > this.registers[b] ? 1 : 0;
        return this.registers;
    }

    // Greater-than Register/Immediate - sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
    gtri(a, b, c) {
        this.registers[c] = this.registers[a] > b ? 1 : 0;
        return this.registers;
    }

    // Greater-than Register/Register - sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
    gtrr(a, b, c) {
        this.registers[c] = this.registers[a] > this.registers[b] ? 1 : 0;
        return this.registers;
    }

    // Equal Immediate/Register - sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
    eqir(a, b, c) {
        this.registers[c] = a === this.registers[b] ? 1 : 0;
        return this.registers;
    }

    // Equal Register/Immediate - sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
    eqri(a, b, c) {
        this.registers[c] = this.registers[a] === b ? 1 : 0;
        return this.registers;
    }

    // Equal Register/Register - sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
    eqrr(a, b, c) {
        this.registers[c] = this.registers[a] === this.registers[b] ? 1 : 0;
        return this.registers;
    }
}

module.exports = DeviceInstructions;
