const G = require('generatorics');
const input = require('./input');

const TOTAL_LITERS = 150;

let container_counts = {};
for (var subset of G.powerSet(input)) {
    let subset_total = subset.reduce((a, b) => a + b, 0);
    if (subset_total === TOTAL_LITERS) {
        if (!container_counts[subset.length]) {
            container_counts[subset.length] = 0;
        }

        container_counts[subset.length] += 1;
    }
}

let containers_sorted = Object.keys(container_counts);
containers_sorted.sort((a, b) => {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
});

let min_num_of_containers = containers_sorted[0];

console.log(container_counts[min_num_of_containers]);