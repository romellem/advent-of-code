const { input, sampleInputs } = require('./input');
const { Hex } = require('./hex-grid-red-blob');
const assert = require('assert');

// Tests
for (let { path, distance } of sampleInputs) {
    let route = new Hex(0, 0, 0);
    path.forEach(step => {
        route = route.add(Hex.direction(step));
    });

    assert.strictEqual(route.len(), distance);
}

let route = new Hex(0, 0, 0);
input.forEach(step => {
    route = route.add(Hex.direction(step));
});

console.log(route.len());
