const Jimp = require('jimp');
const Garden = require('./garden');
const input = require('./input');

const { initialState, spreadRules } = input;

let garden = new Garden(initialState, spreadRules);

const DAYS_TO_SIMULATE = process.argv[2] || 250;

let unpadded_pixel_rows = [garden.getGardenAsString()];
for (let i = 0; i < DAYS_TO_SIMULATE; i++) {
    garden.tick();
    unpadded_pixel_rows.push(garden.getGardenAsString());
}

let max_row_lenth = Math.max.apply(null, unpadded_pixel_rows.map(r => r.length));
let padded_pixel_rows = unpadded_pixel_rows.map(row => row.padStart('.', max_row_lenth));

const BLACK = Jimp.rgbaToInt(0, 0, 0, 255);
const RED = Jimp.rgbaToInt(255, 0, 0, 255);

new Jimp(max_row_lenth, padded_pixel_rows.length, BLACK, (err, image) => {
    for (let y = 0; y < padded_pixel_rows.length; y++) {
        let row = padded_pixel_rows[y];
        for (let x = 0; x < row.length; x++) {
            let cell = row[x];
            if (cell === '#') {
                image.setPixelColor(RED, x, y);
            }
        }
    }

    const filename = `visualized-${DAYS_TO_SIMULATE}-days.png`;
    image.write(filename);
    console.log(`Wrote out ${filename}`)
});
