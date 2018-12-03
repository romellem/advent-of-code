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
    .map(row => Array(FABRIC_SIZE).fill([]));

// If an attribute is `true`, it means it is not overlapping
let id_map = {};

// @example `#22 @ 433,548: 22x20`
const cut_regexp = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
input.forEach(cut => {
    // id, left_offset, top_offset, width, & height are all integers, so parse them after the match
    let [line, id, left_offset, top_offset, width, height] = Array.from(cut_regexp.exec(cut)).map(
        (v, i) => (i === 0 ? v : parseInt(v))
    );

    // Initialize it to not overlapping with anything else
    id_map[id] = true;

    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
            let list_of_ids_occupying_spot = fabric[left_offset + w][top_offset + h];
            list_of_ids_occupying_spot.push(id);

            if (list_of_ids_occupying_spot.length > 1) {
                list_of_ids_occupying_spot.forEach(overlapping_id => {
                    id_map[overlapping_id] = false;
                });
            }
        }
    }
});

// There should just be one item here, but just in case
let non_overlapping_ids = [];
for (let id in id_map) {
    if (id_map[id]) {
        non_overlapping_ids.push(id);
    }
}

non_overlapping_ids.forEach(non_overlapping_id => {
    console.log(`${non_overlapping_id} does not overlap with anything else`);
});
