const assert = require('assert');
const { input, sampleInputs } = require('./input');
const decompress = require('./decompress');

// Tests
sampleInputs.forEach(({ str, decompressedStr }) => {
    let decompressed_test_str = decompress(str);

    assert.strictEqual(decompressed_test_str, decompressedStr);
});

let decompressed_str = decompress(input);

console.log(decompressed_str.length);
