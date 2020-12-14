const { input } = require('./input');

function applyMask(mask, num) {
    for (let i = 0; i < mask.length; i++){
        let m = mask[i];
        if (m === '1') {
            num[i] = 1;
        } else if  (m === '0') {
            num[i] = 0;
        }
    }
    return num;
}

function run(input) {
    let memory = {};
    let current_mask;
    for (line of input) {
        // console.log(line)
        const { type, address, value } = line;
        if (type === 'mask') {
            current_mask = value.split('');
        } else {
            let binary = value.toString(2).padStart(36, '0').split('').map(v => +v)
            applyMask(current_mask, binary);
            memory[address] = parseInt(binary.join(''), 2);
        }
    }

    return Object.values(memory).reduce((a, b) => a+b, 0);
}

console.log(run(input))