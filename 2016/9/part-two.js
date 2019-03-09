const assert = require('assert');
const { input, sampleInputsPartTwo } = require('./input');
const decompress = require('./decompress-alg-2');

// Tests
sampleInputsPartTwo.forEach(({ str, decompressedLength }) => {
    let decompressed_test_str_length = decompress(str);

    assert.strictEqual(decompressed_test_str_length, decompressedLength);
});

let decompressed_str_length = decompress(input);

console.log(decompressed_str_length);
