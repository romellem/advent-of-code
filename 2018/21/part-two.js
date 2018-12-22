const colors = require('colors');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');

let instruction_pointer = program.shift();
instruction_pointer = instruction_pointer[1];

let device = new DeviceInstructions(program);
device.setInputPointer(instruction_pointer);

let stops = {};
let stops_length = 0;
let num_of_executions = 0;

// Each time we find a value that'll halt the program, store it.
// The first time we see a value we've seen before, the stop before
// that duplicate is our answer
let last_stop_seen = -1;

// Line 28 is first line where we can exit the program
const LINE_TO_CHECK = 28;

while (device.run()) {
    num_of_executions++;
    let d = device.registers[3];

    if (device.registers[instruction_pointer] === LINE_TO_CHECK) {
        if (!stops[d]) {
            last_stop_seen = d;
            stops[d] = num_of_executions;
            stops_length++;
            process.stdout.write(
                'Running, found ' +
                    stops_length.toLocaleString().cyan +
                    ' values of A where the program will halt\r'
            );
        } else {
            console.log('\n\n');
            console.log('Register D started looping, so we can exit!\n');
            console.log('Last unique possible value that\'d halt the program was:');
            console.log(last_stop_seen.toString().green);
            break;
        }
    }
}