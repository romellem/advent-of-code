const { uniq } = require('lodash');
const input = require('./input');

const isValid = phrase_array => {
    let sorted_phrase = phrase_array.map(p => {
        let s = p.split('');
        s.sort((a, b) => {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
        });

        return s.join('');
    });

    return uniq(sorted_phrase).length === phrase_array.length ? 1 : 0;
};

console.log(input.map(p => isValid(p)).reduce((a, b) => a + b, 0));
