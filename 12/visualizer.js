const Jimp = require('jimp');
const Garden = require('./garden');
const input = require('./input');

const { initialState, spreadRules } = input;

let garden = new Garden(initialState, spreadRules);

const DAYS_TO_SIMULATE = process.argv[2] || 300;

let unpadded_pixel_rows = [garden.getGardenAsBoolArray()];
for (let i = 0; i < DAYS_TO_SIMULATE; i++) {
    garden.tick();
    unpadded_pixel_rows.push(garden.getGardenAsBoolArray());
}

let max_row_lenth = Math.max.apply(null, unpadded_pixel_rows.map(r => r.length));

// image.setPixelColor(hex, x, y);
const BLACK = Jimp.rgbaToInt(0, 0, 0, 255);
const RED = Jimp.rgbaToInt(255, 0, 0, 255);

new Jimp(max_row_lenth, unpadded_pixel_rows.length, BLACK, (err, image) => {
    for (let y = 0; y < unpadded_pixel_rows.length; y++) {
        let row = unpadded_pixel_rows[y];
        for (let x = 0; x < max_row_lenth; x++) {
            let padded_index = row.length - max_row_lenth + x;
            if (padded_index > -1) {
                let cell = row[padded_index];
                if (cell) {
                    image.setPixelColor(RED, x, y);
                }
            }
        }
    }
    image.write(`visualized-${DAYS_TO_SIMULATE}-days.png`);
});
