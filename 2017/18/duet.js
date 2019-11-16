// Helper, I use this a bit
const isStr = val => typeof val === 'string';

class Duet {
    constructor(program) {
        this.program = JSON.parse(JSON.stringify(program));
        this.registers = Duet.getUniqueRegisters(this.program);
        this.index = 0;
        this.finished = false;

        this.last_sound_played = null;
    }

    snd(value) {
        this.last_sound_played = this.getValueAtRegister(value);
    }

    set(register, value) {
        this.registers[register] = this.getValueAtRegister(value);
    }

    add(register, value) {
        this.registers[register] += this.getValueAtRegister(value);
    }

    mul(register, value) {
        this.registers[register] *= this.getValueAtRegister(value);
    }

    mod(register, value) {
        this.registers[register] %= this.getValueAtRegister(value);
    }

    /**
     * `rcv X` recovers the frequency of the last sound played,
     * but only when the value of `X` is not zero. (If it is zero,
     * the command does nothing.)
     *
     * In practice, this is what "halts" the program, where returning
     * `true` halts, and `false` continues.
     */
    rcv(value) {
        if (this.getValueAtRegister(value) !== 0) {
            this.finished = true;
            return true;
        } else {
            return false;
        }
    }

    jgz(value, offset) {
        if (this.getValueAtRegister(value) > 0) {
            this.index += this.getValueAtRegister(offset);
            return true;
        } else {
            return false;
        }
    }

    static getUniqueRegisters(program, return_object = true) {
        let registers = {};
        for (let instruction of program) {
            let { x, y } = instruction;
            if (isStr(x)) {
                registers[x] = 0;
            }
            if (isStr(y)) {
                registers[y] = 0;
            }
        }

        return return_object ? registers : Object.keys(registers);
    }

    getValueAtRegister(value) {
        return isStr(value) ? this.registers[value] : value;
    }

    run() {
        while (!this.finished) {
            let { type, x, y } = this.program[this.index];
            let value = this[type](x, y);
            if (type === 'jgz' && value === true) {
                // Do nothing, we jumped. Otherwise, skip the `jgz` instruction
            } else {
                this.index++;
            }
        }

        return this.last_sound_played;
    }
}

module.exports = Duet;
