const { samples } = require('./input');
const { isEqual } = require('lodash');
const DeviceInstructions = require('./device-instructions');

// If we find them all, we should have 16 opcodes
let opcodes_to_fn = {};
let fn_to_opcode = {};

let found_one_opcode_match;

do {
    found_one_opcode_match = false;
    let samples_executed = samples
        .map(line => {
            let { instruction, before, after } = line;

            let trimmed_instruction = instruction.slice(1);
            let opcode = instruction[0];

            if (opcodes_to_fn[opcode]) {
                console.log(`Skipping ${opcode}, we already know it is ${opcodes_to_fn[opcode]}`);
                // Skip this one, we already figured it out
                return null;
            }

            return {
                instruction,
                possibilites: [
                    new DeviceInstructions(before).addr(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'addr' }
                        : null,
                    new DeviceInstructions(before).addi(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'addi' }
                        : null,
                    new DeviceInstructions(before).mulr(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'mulr' }
                        : null,
                    new DeviceInstructions(before).muli(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'muli' }
                        : null,
                    new DeviceInstructions(before).banr(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'banr' }
                        : null,
                    new DeviceInstructions(before).bani(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'bani' }
                        : null,
                    new DeviceInstructions(before).borr(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'borr' }
                        : null,
                    new DeviceInstructions(before).bori(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'bori' }
                        : null,
                    new DeviceInstructions(before).setr(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'setr' }
                        : null,
                    new DeviceInstructions(before).seti(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'seti' }
                        : null,
                    new DeviceInstructions(before).gtir(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'gtir' }
                        : null,
                    new DeviceInstructions(before).gtri(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'gtri' }
                        : null,
                    new DeviceInstructions(before).gtrr(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'gtrr' }
                        : null,
                    new DeviceInstructions(before).eqir(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'eqir' }
                        : null,
                    new DeviceInstructions(before).eqri(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'eqri' }
                        : null,
                    new DeviceInstructions(before).eqrr(...trimmed_instruction).toString() ===
                    after.toString()
                        ? { opcode, fn: 'eqrr' }
                        : null,
                ].filter(i => {
                    // Filter out the opcodes we've already figured out
                    return i && fn_to_opcode[i.fn] !== undefined;
                }),
            };
        })
        .filter(i => i);

    for (let i = 0; i < samples_executed.length; i++) {
        let { instruction, possibilites } = samples_executed[i];

        if (possibilites.length === 1) {
            let answer = possibilites[0];
            console.log(
                `Instruction: ${instruction.join(' ')} only had one possibility: "${answer.fn}"`
            );
            console.log(`So opcode ${answer.opcode} is "${answer.fn}"`);
            found_one_opcode_match = true;
            opcodes_to_fn[answer.opcode] = answer.fn;
            fn_to_opcode[answer.fn] = answer.opcode;
        }
    }
} while (found_one_opcode_match);

let opcodes_determined = Object.keys(opcodes_to_fn).length;

console.log('=====================\n');
console.log(opcodes_determined);
console.log('=====================\n');
console.log(opcodes_to_fn);
