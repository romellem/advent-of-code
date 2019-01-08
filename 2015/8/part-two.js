const fs = require('fs');
const path = require('path');

const _raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

const raw_input = _raw_input.split('\n').filter(n => n);

const raw_input_encoded_str = JSON.stringify(raw_input, null, '\t');
const raw_input_encoded_with_extra = raw_input_encoded_str.split('\n');

// Remove first and last elements, they are the opening '[' and closing ']'
raw_input_encoded_with_extra.shift();
raw_input_encoded_with_extra.pop();

// Remove leading spacing and (optional) trailing comma ','
line_regex = /^\s*([^,]+),?$/;
const raw_input_encoded = raw_input_encoded_with_extra.map(line => {
    let [match, str] = line_regex.exec(line);
    return str;
});

let raw_sum = raw_input.reduce((a, b) => a + b.length, 0);
let raw_encoded_sum = raw_input_encoded.reduce((a, b) => a + b.length, 0);

console.log(raw_encoded_sum - raw_sum);
