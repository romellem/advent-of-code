const crypto = require('crypto');

const THREE_CHARS_REGEX = /(\w)\1\1/;

class KeyGenerator {
    constructor(salt) {
        this.salt = salt;
        this.index = 0;

        this.keys = [];
        this.hashCache = {};
    }

    testHashForValidity(match) {
        // Take our 3 char match and convert it to a 5 char match
        match = match + match[0] + match[0];

        for (let i = 0; i < 1000; i++) {
            let input = `${this.salt}${this.index + i}`;
            let hash = this.md5(input);

            if (hash.includes(match)) {
                return true;
            }
        }

        return false;
    }

    static MD5(str) {
        return crypto
            .createHash('md5')
            .update(str)
            .digest('hex');
    }

    md5(str) {
        if (!this.hashCache[str]) {
            this.hashCache[str] = KeyGenerator.MD5(str);
        }

        return this.hashCache[str];
    }

    generateNextKeys(n = 64) {
        for (let key = 0; key < n; key++) {
            let found_key = false;

            while (found_key === false) {
                let input = `${this.salt}${this.index++}`;
                let hash = this.md5(input);

                if (THREE_CHARS_REGEX.test(hash)) {
                    // Hash has three repeating characters in a row!
                    let [match] = hash.match(THREE_CHARS_REGEX);

                    if (this.testHashForValidity(match)) {
                        this.keys.push({
                            hash,
                            index: this.index - 1,
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
