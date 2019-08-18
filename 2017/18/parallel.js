// Helper, I use this a bit
const isStr = val => typeof val === 'string';

class Program {
    constructor(id, program) {
        this.id = id;
        this.queue = [];
        this.sibling;

        this.program = JSON.parse(JSON.stringify(program));
        this.registers = Program.getUniqueRegisters(this.program);
        this.index = 0;
        this.finished = false;
        this.sent_count = 0;
    }

    setSibling(sibling) {
        this.sibling = sibling;
    }

    addToQueue(value) {
        this.queue.push(value);
    }

    snd(value) {
        this.sent_count++;
        this.sibling.addToQueue(this.getValueAtRegister(value));
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

    canReceive() {
        return Boolean(this.queue.length);
    }

    rcv(register) {
        if (this.queue.length > 0) {
            // Set register to the value at top of the queue
            this.registers[register] = this.queue.pop();
            return false;
        } else {
            // Halt the program, nothing to receive
            this.finished = true;
            return true;
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

        // Adds program ID to register 'p'
        registers['p'] = this.id;

        return return_object ? registers : Object.keys(registers);
    }

    getValueAtRegister(value) {
        return isStr(value) ? this.registers[value] : value;
    }

    tick() {
        let { type, x, y } = this.program[this.index];
        let value = this[type](x, y);
        if (type === 'jgz' && value === true) {
            // Do nothing, we jumped. Otherwise, skip the `jgz` instruction
        } else {
            this.index++;
        }

        return this.last_sound_played;
    }

    peekCurrentInstructionType() {
        return this.program[this.index].type;
    }
}

class ParallelPrograms {
    constructor(program) {
        this.programs = [
            new Program(0, program),
            new Program(1, program),
        ];

        this.programs[0].setSibling(this.programs[1]);
        this.programs[1].setSibling(this.programs[0]);
    }

    orchestrateRun() {
        let current_program = 0;
        let flip_count = 0;
        let p = this.programs[current_program];

        do {
            if (p.peekCurrentInstructionType() === 'rcv' && !p.canReceive()) {
                flip_count++;

                if (flip_count >= 2) {
                    // Flipped twice, neither program can receive, so we should be deadlocked
                    p.tick();
                } else {
                    // Hackky way to toggle between 0 and 1
                    current_program = +!current_program;
                    p = this.programs[current_program];
                }
            } else {
                // I need to reset `flip_count`, but should I do it here?
                // flip_count = 0;
                p.tick();
            }
            
        } while (!this.programs[0].finished && !this.programs[1].finished);

        return this.programs[1].sent_count;
    }

}

module.exports = ParallelPrograms;
