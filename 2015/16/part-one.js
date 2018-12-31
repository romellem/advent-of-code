const { SUES, TICKER_TAPE } = require('./input');

let possible_aunts = SUES.filter(aunt => {
    for (let quality in aunt) {
        if (quality === 'number') continue;

        if (TICKER_TAPE[quality] !== aunt[quality]) {
            return false;
        }
    }

    return true;
});

console.log(possible_aunts[0].number);
