const { range } = require('lodash');
const assert = require('assert')

class Knot {
    constructor(size, current_position = 0, skip = 0) {
        this.string = range(size);
        this.current_position = current_position;
        this.skip = skip;
    }

    performTwists(twists) {
        twists.forEach(twist => {
            let indices = range(twist).map(v => (v + this.current_position) % this.string.length);
            let points = indices.map(i => this.string[i]);
            points.reverse();
            indices.forEach((string_i, root_i) => (this.string[string_i] = points[root_i]));
            this.current_position =
                (this.current_position + twist + this.skip++) % this.string.length;
        });

        return this.string;
    }

    computeAnswer() {
        assert.ok(this.string.length >= 2);
        return this.string[0] * this.string[1];
    }
}

module.exports = Knot;
