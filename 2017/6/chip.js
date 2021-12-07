class Chip {
    constructor(memory) {
        this.memory = JSON.parse(JSON.stringify(memory));
    }

    runForOneCycle() {
        let seen_states = {};
        seen_states[this.memory.join(',')] = true;

        let steps = 0;
        while (true) {
            let largest_index = this.getLargestBlockIndex();

            let largest_val = this.memory[largest_index];
            this.memory[largest_index] = 0;
            for (let i = 0; i < largest_val; i++) {
                let index = (largest_index + i + 1) % this.memory.length;
                this.memory[index] += 1;
            }

            steps++;

            let state = this.memory.join(',');
            if (seen_states[state]) {
                return steps;
            } else {
                seen_states[state] = true;
            }
        }
    }

    getLargestBlockIndex() {
        let largest_block = Math.max(...this.memory);
        return this.memory.indexOf(largest_block);
    }
}

module.exports = Chip;
