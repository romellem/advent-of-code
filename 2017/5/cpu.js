class CPU {
    constructor(registers, initial_instruction = 0) {
        this.registers = JSON.parse(JSON.stringify(registers));
        this.instruction = initial_instruction;
    }

    execute(part_two_increment = false) {
        let steps = 0;

        while (this.instruction < this.registers.length && this.instruction > -1) {
            let new_instruction = this.instruction + this.registers[this.instruction];

            if (part_two_increment) {
                // Part two has:
                // > After each jump, if the offset was _three or more_, instead _decrease_ it by `1`.
                // > Otherwise, increase it by `1` as before.
                this.registers[this.instruction] += this.registers[this.instruction] >= 3 ? -1 : 1;
            } else {
                // Part one has the instruction increment by one each time
                this.registers[this.instruction] += 1;
            }
            
            this.instruction = new_instruction;
            steps++;
        }

        return steps;
    }
}

module.exports = CPU;
