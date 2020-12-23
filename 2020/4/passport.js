const REQUIRED_FIELDS_RULES = {
    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
    'byr:': {
        regex: /\bbyr:(\d+)\b/,
        extract(line) {
            let [, val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        },
        validate(byr) {
            return String(byr).length === 4 && byr >= 1920 && byr <= 2002;
        },
    },
    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    'iyr:': {
        regex: /\biyr:(\d+)\b/,
        extract(line) {
            let [, val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        },
        validate(iyr) {
            return String(iyr).length === 4 && iyr >= 2010 && iyr <= 2020;
        },
    },
    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    'eyr:': {
        regex: /\beyr:(\d+)\b/,
        extract(line) {
            let [, val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        },
        validate(eyr) {
            return String(eyr).length === 4 && eyr >= 2020 && eyr <= 2030;
        },
    },
    // hgt (Height) - a number followed by either cm or in:
    //     If cm, the number must be at least 150 and at most 193.
    //     If in, the number must be at least 59 and at most 76.
    'hgt:': {
        regex: /\bhgt:(\d+)(cm|in)\b/,
        extract(line) {
            let [, height, units] = this.regex.exec(line) || [];
            height = height ? parseInt(height) : 0;
            return [height, units];
        },
        validate([height, units]) {
            if (units === 'cm') {
                return height >= 150 && height <= 193;
            } else if (units === 'in') {
                return height >= 59 && height <= 76;
            } else {
                return false;
            }
        },
    },
    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    'hcl:': {
        regex: /\bhcl:#([0-9a-f]+)\b/,
        extract(line) {
            let [, val = ''] = this.regex.exec(line) || [];
            return val;
        },
        validate(hcl) {
            // Regex ensures it is a hex string
            return String(hcl).length === 6;
        },
    },
    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    'ecl:': {
        regex: /\becl:(amb|blu|brn|gry|grn|hzl|oth)\b/,
        extract(line) {
            let [, val = ''] = this.regex.exec(line) || [];
            return val;
        },
        validate(ecl) {
            // Regex ensures it is one of the valid colors
            return String(ecl).length === 3;
        },
    },
    // pid (Passport ID) - a nine-digit number, including leading zeroes.
    'pid:': {
        regex: /\bpid:(\d+)\b/,
        extract(line) {
            let [, val = ''] = this.regex.exec(line) || [];
            return val;
        },
        validate(pid) {
            // Regex ensures it is numbers only
            return String(pid).length === 9;
        },
    },
};
const REQUIRED_FIELDS = Object.keys(REQUIRED_FIELDS_RULES);
const REQUIRED_RULES = Object.values(REQUIRED_FIELDS_RULES);

// Part One
const includesAllRequiredFields = (entry) => {
    return REQUIRED_FIELDS.every((field) => entry.includes(field));
};

// Part Two
const allFieldsAreValid = (entry) => {
    return REQUIRED_RULES.every((rule) =>
        // Importantly, don't destructure the functions from the rule,
        // otherwise the `this` binding won't work
        rule.validate(rule.extract(entry))
    );
};

module.exports = {
    includesAllRequiredFields,
    allFieldsAreValid,
};
