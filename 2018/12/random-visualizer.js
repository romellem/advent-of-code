const Jimp = require('jimp');
const Garden = require('./garden');
const colors = require('colors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const { getRandomIntialGardenState, getRandomSpreadRules } = require('./garden-static');

let intial_state = getRandomIntialGardenState();
let spread_rules = getRandomSpreadRules();

// let intial_state = require('./input').initialState;
// let spread_rules = require('./input').spreadRules;

console.log('Using:\n');

let raw_input = `initial state: ${intial_state}

${spread_rules.join('\n')}
`;

console.log(raw_input.yellow);

let input_hash = crypto
    .createHash('md5')
    .update(raw_input)
    .digest('hex');

let garden = new Garden(intial_state, spread_rules);

let unpadded_pixel_rows = [garden.getGardenAsString()];

let total_days = 0;
let days_stabilized = 0;
let last_sum = garden.getSumOfAlivePlantsIds();
let last_sum_difference = last_sum; // last_sum - 0

process.stdout.write('Stabilizing');
const MAX_DAYS_SIMULATING = 1000;
while (days_stabilized < 50 && total_days < MAX_DAYS_SIMULATING) {
    garden.tick();
    unpadded_pixel_rows.push(garden.getGardenAsString());
    total_days++;

    if (total_days % 17 === 0) {
        process.stdout.write(`\rStabilizing ${total_days}`);
    }

    let new_sum = garden.getSumOfAlivePlantsIds();
    let current_sum_difference = new_sum - last_sum;

    // Save our sum to get ready for next tick, or to use when we break outside the loop
    last_sum = new_sum;

    if (current_sum_difference !== last_sum_difference) {
        days_stabilized = 0;
        last_sum_difference = current_sum_difference;
    } else {
        days_stabilized++;
    }
}

if (total_days >= MAX_DAYS_SIMULATING) {
    process.stdout.write('\rStabilizing... ');
    console.log(`could not stabilize, exiting after ${MAX_DAYS_SIMULATING} days`.red);
} else {
    console.log(` STABILIZED AFTER ${total_days}`.green);
}

let max_pad_start = Math.abs(Math.min(...unpadded_pixel_rows.map(r => r.min)));
let half_padded_pixel_rows = unpadded_pixel_rows.map(row => {
    let zero_index = Math.abs(row.min);
    let left_empty_pots = Array(max_pad_start - zero_index).fill('.').join('');
    return left_empty_pots + row.string;
});

let max_row_lenth = Math.max(...half_padded_pixel_rows.map(r => r.length));
let padded_pixel_rows = half_padded_pixel_rows.map(row => row.padEnd(max_row_lenth, '.'));

const BLACK = Jimp.rgbaToInt(0, 0, 0, 255);
const RED = Jimp.rgbaToInt(255, 0, 0, 255);
// const CYAN = Jimp.rgbaToInt(0, 255, 255, 255);
// const NAVY = Jimp.rgbaToInt(0, 0, 128, 255);
const GOLD = Jimp.cssColorToHex('#FFD700');
const DARK_GOLD = Jimp.cssColorToHex('#564800');

new Jimp(max_row_lenth, padded_pixel_rows.length, BLACK, (err, image) => {
    for (let y = 0; y < padded_pixel_rows.length; y++) {
        let row = padded_pixel_rows[y];
        for (let x = 0; x < row.length; x++) {
            let cell = row[x];
            if (cell === '#') {
                image.setPixelColor(RED, x, y);
            } else if (cell === '+') {
                // ID 0, on
                image.setPixelColor(GOLD, x, y);
            } else if (cell === '-') {
                // ID 0, but off
                image.setPixelColor(DARK_GOLD, x, y);
            }
        }
    }

    const image_filename = `${input_hash}-visualized.png`;
    const input_filename = `${input_hash}-input.txt`;

    const image_filepath = path.join(__dirname, '/visualizations', image_filename);
    const input_filepath = path.join(__dirname, '/visualizations/inputs/', input_filename);

    const image_filepath_relative = image_filepath.replace(process.cwd(), '');
    const input_filepath_relative = input_filepath.replace(process.cwd(), '');

    image.write(image_filepath);
    fs.writeFileSync(input_filepath, raw_input);

    console.log(`Wrote out .${image_filepath_relative.cyan}, .${input_filepath_relative.blue}`);
});
