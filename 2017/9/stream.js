const START_GARBAGE = '<';
const END_GARBAGE = '>';
const START_GROUP = '{';
const END_GROUP = '}';
const IGNORE_SYMBOL = '!';
const GROUP_SEPARATOR = ',';

class Stream {
    constructor(stream) {
        let parsed_stream = this.parse(stream);
        this.score = parsed_stream.score;
        this.garbageCleaned = parsed_stream.garbageCleaned;
    }

    parse(stream) {
        let group = 0;
        let groups = [];
        let garbage = false;
        let total_garbage = 0;

        for (let i = 0; i < stream.length; i++) {
            let char = stream[i];

            if (!garbage) {
                if (char === START_GROUP) {
                    ++group;
                } else if (char === END_GROUP) {
                    groups.push(group--);
                } else if (char === START_GARBAGE) {
                    garbage = true;
                }
            } else {
                if (char === IGNORE_SYMBOL) {
                    i++;
                } else if (char === END_GARBAGE) {
                    garbage = false;
                } else {
                    total_garbage++;
                }
            }
        }

        return {
            score: groups.reduce((a, b) => a + b, 0),
            garbageCleaned: total_garbage,
        };
    }
}

module.exports = Stream;
