const { input } = require('./input');

const input_encoded_str = JSON.stringify(input, null, '\t');
const input_encoded_with_extra = input_encoded_str.split('\n');

// Remove first and last elements, they are the opening '[' and closing ']'
input_encoded_with_extra.shift();
input_encoded_with_extra.pop();

// Remove leading spacing and (optional) trailing comma ','
line_regex = /^\s*([^,]+),?$/;
const input_encoded = input_encoded_with_extra.map(line => {
    let [, str] = line_regex.exec(line);
    return str;
});

let raw_sum = input.reduce((a, b) => a + b.length, 0);
let raw_encoded_sum = input_encoded.reduce((a, b) => a + b.length, 0);

console.log(raw_encoded_sum - raw_sum);
