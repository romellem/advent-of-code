class CPU {
    constructor(registers, initial_instruction = 0) {
        this.registers = JSON.parse(JSON.stringify(registers));
        this.instruction = initial_instruction;
    }

    execute() {
        let steps = 0;

        while (this.instruction < this.registers.length && this.instruction > -1) {
            let new_instruction = this.instruction + this.registers[this.instruction];
            this.registers[this.instruction] += 1;
            this.instruction = new_instruction;
            steps++;
        }

        return steps;
    }
}

module.exports = CPU;
