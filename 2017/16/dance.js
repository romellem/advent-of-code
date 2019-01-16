const { SPIN, EXCHANGE, PARTNER } = require('./input');

class Dance {
    constructor(steps, programs = 'abcdefghijklmnop') {
        this.programs = programs.split('');
        this.steps = JSON.parse(JSON.stringify(steps));
    }

    run() {
        this.steps.forEach(step => {
            let { move, arg } = step;
            if (move === SPIN) {
                // Cut off the last N elements, and move them to beginning
                let slice_count = arg;
                let last_n_programs = this.programs.slice(-1 * slice_count);
                this.programs = last_n_programs.concat(
                    this.programs.slice(0, this.programs.length - slice_count)
                );
            } else if (move === EXCHANGE) {
                // Swap elements at positions `a` and `b`
                let [a, b] = arg;
                let temp_a = this.programs[a];
                this.programs[a] = this.programs[b];
                this.programs[b] = temp_a;
            } else if (move === PARTNER) {
                // Swap elements `a` and `b`, and swap them
                let [el_a, el_b] = arg;
                let a = this.programs.indexOf(el_a);
                let b = this.programs.indexOf(el_b);

                this.programs[a] = el_b;
                this.programs[b] = el_a;
            } else {
                let error = `Unknown move "${move}`;
                throw error;
            }
        });
    }

    getOrder() {
        return this.programs.join('');
    }
}

module.exports = Dance;
