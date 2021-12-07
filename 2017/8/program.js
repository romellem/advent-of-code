const assert = require('assert');

const LINE_RE = /^([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) ([!<>=]+) (-?\d+)$/;

class Instruction {
    constructor(line) {
        let program = this.parse(line);

        this.reg = program.reg;
        this.op = program.op;
        this.reg_amount = program.reg_amount;
        this.cond_reg = program.cond_reg;
        this.comp = program.comp;
        this.cond_amount = program.cond_amount;
    }

    parse(line) {
        //c dec -10 if a >= 1
        assert.strictEqual(LINE_RE.test(line), true);

        let [match, reg, op, reg_amount, cond_reg, comp, cond_amount] = LINE_RE.exec(line);
        reg_amount = parseInt(reg_amount);
        cond_amount = parseInt(cond_amount);

        return { reg, op, reg_amount, cond_reg, comp, cond_amount };
    }
}

const EQ = '==';
const NE = '!=';
const GT = '>';
const GE = '>=';
const LT = '<';
const LE = '<=';

const INCREMENT = 'inc';
const DECREMENT = 'dec';

class Program {
    constructor(instructions) {
        this.registers = {};
        this.instructions = instructions.map(i => {
            let instruction = new Instruction(i);
            this.registers[instruction.reg] = 0;
            this.registers[instruction.cond_reg] = 0;

            return instruction;
        });
    }

    executeLine(line) {
        let { reg, comp, cond_reg, cond_amount } = line;
        let conditional;

        if (comp === EQ) {
            conditional = this.registers[cond_reg] === cond_amount;
        } else if (comp === NE) {
            conditional = this.registers[cond_reg] !== cond_amount;
        } else if (comp === GT) {
            conditional = this.registers[cond_reg] > cond_amount;
        } else if (comp === GE) {
            conditional = this.registers[cond_reg] >= cond_amount;
        } else if (comp === LT) {
            conditional = this.registers[cond_reg] < cond_amount;
        } else if (comp === LE) {
            conditional = this.registers[cond_reg] <= cond_amount;
        } else {
            let error = `Unknown conditional comparison operator: "${comp}"`;
            console.error(line);
            throw error;
        }

        if (conditional) {
            let { op, reg_amount } = line;
            if (op === INCREMENT) {
                this.registers[reg] += reg_amount;
            } else if (op === DECREMENT) {
                this.registers[reg] -= reg_amount;
            } else {
                let error = `Unknown binary operator: "${op}"`;
                console.error(line);
                throw error;
            }
        }

        return this.registers[reg];
    }

    executeAndGetLargestRegister() {
        this.instructions.forEach(instruction => {
            this.executeLine(instruction);
        });

        return Math.max(...Object.values(this.registers));
    }

    executeAndGetLargestRegisterAtAnyTime() {
        let largest = Number.MIN_SAFE_INTEGER;
        this.instructions.forEach(instruction => {
            this.executeLine(instruction);

            let { reg, cond_reg } = instruction;

            let temp_max = Math.max(this.registers[reg], this.registers[cond_reg]);
            if (temp_max > largest) {
                largest = temp_max;
            }
        });

        return largest;
    }
}

module.exports = Program;
