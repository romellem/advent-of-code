const { samples } = require('./input');
const { isEqual } = require('lodash');
const DeviceInstructions = require('./device-instructions');

// Number of sample inputs that behave like three or more opcodes?
let answer = samples
    .map(line => {
        let { instruction, before, after } = line;

        // Trim off opcode from instruction (we don't know what it maps to yet)
        instruction = instruction.slice(1);

        return [
            new DeviceInstructions(before).addr(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).addi(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).mulr(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).muli(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).banr(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).bani(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).borr(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).bori(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).setr(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).seti(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).gtir(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).gtri(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).gtrr(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).eqir(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).eqri(...instruction).toString() === after.toString()
                ? 1
                : 0,
            new DeviceInstructions(before).eqrr(...instruction).toString() === after.toString()
                ? 1
                : 0,
        ].reduce((a, b) => a + b, 0);
    })
    .map(possibilites => (possibilites >= 3 ? 1 : 0))
    .reduce((a, b) => a + b, 0);

console.log(answer);
