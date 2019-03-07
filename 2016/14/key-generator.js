const crypto = require('crypto');

const THREE_CHARS_REGEX = /(\w)\1\1/;

class KeyGenerator {
    constructor(salt, use_stretch_hash = false) {
        this.salt = salt;
        this.index = 0;

        this.use_stretch_hash = use_stretch_hash;

        this.keys = [];
        this.hashCache = {};
    }

    static MD5(str) {
        return crypto
            .createHash('md5')
            .update(str)
            .digest('hex');
    }

    static MD5_STRETCH(str) {
        let hash = this.MD5(str);

        for (let i = 0; i < 2016; i++) {
            hash = this.MD5(hash);
        }

        return hash;
    }

    md5(str) {
        if (!this.hashCache[str]) {
            this.hashCache[str] = KeyGenerator.MD5(str);
        }

        return this.hashCache[str];
    }

    md5Stretch(str) {
        if (!this.hashCache[str]) {
            this.hashCache[str] = KeyGenerator.MD5_STRETCH(str);
        }

        return this.hashCache[str];
    }

    testHashForValidity(match) {
        // Take our 3 char match and convert it to a 5 char match
        match = match + match[0] + match[0];

        for (let i = 0; i < 1000; i++) {
            let input = `${this.salt}${this.index + i}`;
            let hash = this.use_stretch_hash ? this.md5Stretch(input) : this.md5(input);

            if (hash.includes(match)) {
                return true;
            }
        }

        return false;
    }

    generateNextKeys(n = 64) {
        for (let key = 0; key < n; key++) {
            let found_key = false;

            while (found_key === false) {
                let input = `${this.salt}${this.index++}`;
                let hash = this.use_stretch_hash ? this.md5Stretch(input) : this.md5(input);

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
