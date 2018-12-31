const { SUES, TICKER_TAPE } = require('./input');

let possible_aunts = SUES.filter(aunt => {
    for (let quality in aunt) {
        if (quality === 'number') continue;

        // The `cats` and `trees` readings indicates that there are _greater than_ that many
        if (quality === 'cats' || quality === 'trees') {
            // If they have to be _greater than_ the ticker readings, exit if we are _less than or equal_
            if (aunt[quality] <= TICKER_TAPE[quality]) {
                return false;
            }
        
        // The `pomeranians` and `goldfish` readings indicate that there are _fewer than_ that many
        } else if (quality === 'pomeranians' || quality === 'goldfish') {
            // If they have to be _fewer than_ the ticker readings, exit if we are _greater than or equal_
            if (aunt[quality] >= TICKER_TAPE[quality]) {
                return false;
            }
        } else {
            if (TICKER_TAPE[quality] !== aunt[quality]) {
                return false;
            }
        }
    }

    return true;
});

console.log(possible_aunts[0].number);
