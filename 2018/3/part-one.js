const fs = require('fs');
const path = require('path');

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

// Last filter is to remove any empty lines
let input = raw_input.split('\n').filter(n => n);

/**
 * Represent the fabric as a 2-dimensional array of zeroes,
 * and just loop through all the possible cuts and increment
 * each coordinate wherever the area may lie. Next, loop back
 * through our 2-d array and count how many values are greater
 * than 1, and we'll have our answer.
 */
const FABRIC_SIZE = 1000;
let fabric = Array(FABRIC_SIZE)
    .fill()
    .map(row => Array(FABRIC_SIZE).fill(0));

// @example `#22 @ 433,548: 22x20`
const cut_regexp = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
input.forEach(cut => {
    // id, left_offset, top_offset, width, & height are all integers, so parse them after the match
    let [line, id, left_offset, top_offset, width, height] = Array.from(cut_regexp.exec(cut)).map(
        (v, i) => (i === 0 ? v : parseInt(v))
    );

    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
            // Increment the fabric coordinate by 1
            fabric[left_offset + w][top_offset + h] += 1;
        }
    }
});

// Next, loop through fabric and count how many spots are greater than 1
let spots_overlapping = 0;
fabric.forEach(row => {
    row.forEach(cell => {
        if (cell > 1) {
            spots_overlapping++;
        }
    });
});

console.log(`There are ${spots_overlapping} spots overlapping`);
