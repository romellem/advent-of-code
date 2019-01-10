const { range } = require('lodash');
const assert = require('assert');

class Knot {
    constructor(size, current_position = 0, skip = 0) {
        this.string = range(size);
        this.current_position = current_position;
        this.skip = skip;
    }

    static stringToInputArray(str) {
        return str
            .split('')
            .map(v => v.charCodeAt())
            .concat([17, 31, 73, 47, 23]);
    }

    performTwists(twists, iterations = 1) {
        for (let iteration = 0; iteration < iterations; iteration++) {
            twists.forEach(twist => {
                let indices = range(twist).map(
                    v => (v + this.current_position) % this.string.length
                );
                let points = indices.map(i => this.string[i]);
                points.reverse();
                indices.forEach((string_i, root_i) => (this.string[string_i] = points[root_i]));
                this.current_position =
                    (this.current_position + twist + this.skip++) % this.string.length;
            });
        }

        return this.string;
    }

    denseHash() {
        let hash = [];
        for (let i = 0; i < 16; i++) {
            let slice = this.string.slice(i * 16, (i + 1) * 16);
            hash.push(slice.reduce((a, b) => a ^ b));
        }

        return hash.map(v => v.toString(16).padStart(2, '0')).join('');
    }

    partOneAnswer() {
        assert.ok(this.string.length >= 2);
        return this.string[0] * this.string[1];
    }

    partTwoAnswer() {
        return this.denseHash();
    }
}

module.exports = Knot;
