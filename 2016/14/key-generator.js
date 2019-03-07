const crypto = require('crypto');
const md5 = str =>
    crypto
        .createHash('md5')
        .update(str)
        .digest('hex');

const THREE_CHARS_REGEX = /(\w)\1\1/g;

class KeyGenerator {
    constructor(salt) {
        this.salt = salt;
        this.index = 0;

        this.keys = [];
    }

    static testHashForValidity(salt, index, matches) {
        // Take our matches and convert them to 5 char strings
        matches = matches.map(s =>
            Array(5)
                .fill(s[0])
                .join('')
        );

        for (let i = 0; i < 1000; i++) {
            let input = `${salt}${index + i}`;
            let hash = md5(input);

            for (let m = 0; m < matches.length; m++) {
                let match = matches[m];
                if (hash.includes(match)) {
                    return true;
                }
            }
        }

        return false;
    }

    generateNextKeys(n = 64) {
        for (let key = 0; key < n; key++) {
            let found_key = false;

            while (found_key === false) {
                let input = `${this.salt}${this.index++}`;
                let hash = md5(input);

                if (THREE_CHARS_REGEX.test(hash)) {
                    // Hash has three repeating characters in a row!
                    let matches = hash.match(THREE_CHARS_REGEX);

                    if (KeyGenerator.testHashForValidity(this.salt, this.index, matches)) {
                        this.keys.push({
                            hash,
                            index: this.index - 1
                        });
                        found_key = true;
                    }
                }
            }
        }

        // Return the last index where we generated our key (conveniently the answer to the riddle)
        return this.index - 1;
    }
}

module.exports = KeyGenerator;
