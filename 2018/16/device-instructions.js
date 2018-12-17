const { isEqual } = require('lodash');
const { sample } = require('./input');

/**
 * Opcodes
 */

class DeviceInstructions
 {
    constructor(orig_sample_set) {
        let sample_set = JSON.parse(JSON.stringify(orig_sample_set));

        this.instructions = sample_set.map(i => i.instruction);
        this.before_and_after = sample_set.map(i => ({ before: i.before, after: i.after }));

        this.registers = [0, 0, 0, 0];
    }

    // Makes part one easier
    trimOpcodesFromAllInstructions() {
        return (this.instructions = this.instructions.map(i => i.slice(1)));
    }

    compareBeforeAfter(before, after, instruction, opcodeFn) {
        let cpu = new DeviceInstructions
        ()
    }

    mapInstructionsToPossibleOpCodes() {
        return this.instructions.map(instruction => {
            return [
                addr,
                addi,
                mulr,
                muli,
                banr,
                bani,
                borr,
                bori,
                setr,
                seti,
                gtir,
                gtri,
                gtrr,
                eqir,
                eqri,
                eqrr,
            ]
        });
    }

    /**
     * Opcodes
     */

    // Add Register - stores into register C the result of adding register A and register B.
    addr(a, b, c) {
        return (this.registers[c] = this.registers[a] + this.registers[b]);
    }

    // Add Immediate - stores into register C the result of adding register A and value B.
    addi(a, b, c) {
        return (this.registers[c] = this.registers[a] + b);
    }

    // Multiply Register - stores into register C the result of multiplying register A and register B.
    mulr(a, b, c) {
        return (this.registers[c] = this.registers[a] * this.registers[b]);
    }

    // Multiply Immediate - stores into register C the result of multiplying register A and value B.
    muli(a, b, c) {
        return (this.registers[c] = this.registers[a] * b);
    }

    // Bitwise AND Register - stores into register C the result of the bitwise AND of register A and register B.
    banr(a, b, c) {
        return (this.registers[c] = this.registers[a] & this.registers[b]);
    }

    // Bitwise AND Immediate - stores into register C the result of the bitwise AND of register A and value B.
    bani(a, b, c) {
        return (this.registers[c] = this.registers[a] & b);
    }

    // Bitwise OR Register - stores into register C the result of the bitwise OR of register A and register B.
    borr(a, b, c) {
        return (this.registers[c] = this.registers[a] | this.registers[b]);
    }

    // Bitwise OR Immediate - stores into register C the result of the bitwise OR of register A and value B.
    bori(a, b, c) {
        return (this.registers[c] = this.registers[a] | b);
    }

    // Set Register - copies the contents of register A into register C. (Input B is ignored.)
    setr(a, b, c) {
        return (this.registers[c] = this.registers[a]);
    }

    // Set Immediate - stores value A into register C. (Input B is ignored.)
    seti(a, b, c) {
        return (this.registers[c] = a);
    }

    // Greater-than Immediate/Register - sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
    gtir(a, b, c) {
        return (this.registers[c] = a > this.registers[b] ? 1 : 0);
    }

    // Greater-than Register/Immediate - sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
    gtri(a, b, c) {
        return (this.registers[c] = this.registers[a] > b ? 1 : 0);
    }

    // Greater-than Register/Register - sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
    gtrr(a, b, c) {
        return (this.registers[c] = this.registers[a] > this.registers[b] ? 1 : 0);
    }

    // Equal Immediate/Register - sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
    eqir(a, b, c) {
        return (this.registers[c] = a === this.registers[b] ? 1 : 0);
    }

    // Equal Register/Immediate - sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
    eqri(a, b, c) {
        return (this.registers[c] = this.registers[a] === b ? 1 : 0);
    }

    // Equal Register/Register - sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
    eqrr(a, b, c) {
        return (this.registers[c] = this.registers[a] === this.registers[b] ? 1 : 0);
    }
}

module.exports = DeviceInstructions
;
