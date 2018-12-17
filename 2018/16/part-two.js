const { samples, testProgram } = require('./input');
const DeviceInstructions = require('./device-instructions');

/**
 * First, we need to loop through our samples to iteratively
 * determine what opcodes match to that functions.
 *
 * Once we've determined all opcodes, we can execute our test program.
 */

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
                // Skip this one, we already figured it out
                return null;
            }

            let unfiltered_possibilites = [
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
            ];

            let filtered_possibilites = unfiltered_possibilites.filter(i => {
                // Only include ones we haven't already solved (aka, they don't exist in our lookup yet)
                return i && fn_to_opcode[i.fn] === undefined;
            });

            return {
                instruction,
                possibilites: filtered_possibilites,
            };
        })
        .filter(i => i);

    for (let i = 0; i < samples_executed.length; i++) {
        let { instruction, possibilites } = samples_executed[i];

        if (possibilites.length === 1) {
            let answer = possibilites[0];

            if (!opcodes_to_fn[answer.opcode]) {
                console.log(
                    `Instruction: ${instruction.join(' ')} only had one possibility: "${answer.fn}"`
                );
                console.log(`\topcode ${answer.opcode} is "${answer.fn}"`);
                found_one_opcode_match = true;
                opcodes_to_fn[answer.opcode] = answer.fn;
                fn_to_opcode[answer.fn] = answer.opcode;
            }
        }
    }
} while (found_one_opcode_match);

let opcodes_determined = Object.keys(opcodes_to_fn).length;

if (opcodes_determined !== 16) {
    console.log('Failed to determine all opcodes, cannot proceed with the sample program');
    console.log(`(Only determined ${opcodes_determined} opcodes):`);
    console.log(opcodes_to_fn);
    process.exit(1);
}

// If we are here, run our test program.
console.log('\n\n=================\nExecuting Test Program:\n\n');

let program = new DeviceInstructions();
for (let i = 0; i < testProgram.length; i++) {
    let line = testProgram[i];
    let opcode = line[0];
    line.shift();

    program[opcodes_to_fn[opcode]](...line);
}

console.log(`Value contained in register 0 after execution is:\n${program.registers[0]}`);
