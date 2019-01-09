const START_GARBAGE = '<';
const END_GARBAGE = '>';
const START_GROUP = '{';
const END_GROUP = '}';
const IGNORE_SYMBOL = '!';
const GROUP_SEPARATOR = ',';


class Stream {
    constructor(stream) {
        this.score = this.parseStream(stream);
    }

    parseStream(stream) {
        let group = 0;
        let groups = [];
        let garbage = false;
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
                }
            }
        }

        return groups.reduce((a, b) => a + b, 0);
    }
}

module.exports = Stream;