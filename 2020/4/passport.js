const REQUIRED_FIELDS_RULES = {
    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
    'byr:': {
        regex: /\bbyr:(\d+)\b/,
        extract(line) {
            let [,val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        },
        validate(byr) {
            return String(byr).length === 4 && byr >= 1920 && byr <= 2002
        }
    },
    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    'iyr:':{
        regex: /\biyr:(\d+)\b/,
        extract(line) {
            let [,val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        },
        validate(iyr) {
            return String(iyr).length === 4 && iyr >= 2010 && iyr <= 2020
        }
    },
    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    'eyr:':{
        regex: /\beyr:(\d+)\b/,
        extract(line) {
            let [,val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        },
        validate(eyr) {
            return String(eyr).length === 4 && eyr >= 2020 && eyr <= 2030
        }
    },
    // hgt (Height) - a number followed by either cm or in:
    //     If cm, the number must be at least 150 and at most 193.
    //     If in, the number must be at least 59 and at most 76.
    'hgt:':{
        regex: /\bhgt:(\d+)(cm|in)\b/,
        extract(line) {
            let [,height,units] = this.regex.exec(line) || [];
            height = height ? parseInt(height) : 0;
            return [height, units];
        },
        validate([height, units]) {
            if (units === 'cm') {
                return height >= 150 && eyr <= 193
            } else if (units === 'in') {
                
            } else {
                return false;
            }
        }
    },
    'hcl:':{
        regex: /\bbyr:(\d+)/,
        extract(line) {
            let [,val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        }
    },
    'ecl:':{
        regex: /byr:(\d+)/,
        extract(line) {
            let [,val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        }
    },
    'pid:':{
        regex: /byr:(\d+)/,
        extract(line) {
            let [,val] = this.regex.exec(line) || [];
            val = val ? parseInt(val) : 0;
            return val;
        }
    },
};
const REQUIRED_FIELDS = Object.keys(REQUIRED_FIELDS_RULES);
/**
 * Part One
 */
const includesAllRequiredFields = (entry) => {
	return REQUIRED_FIELDS.every((required_field) => entry.includes(required_field));
};



const allFieldsAreValid = (entry) => {

}

/*
.map((line) => {
		line = ' ' + line.split('\n').join(' ') + ' ';

		let [, byr] = / byr:(\d{4}) /.exec(line) || [];
		byr = byr ? parseInt(byr) : 0;
		let [, iyr] = / iyr:(\d{4}) /.exec(line) || [];
		iyr = iyr ? parseInt(iyr) : 0;
		let [, eyr] = / eyr:(\d{4}) /.exec(line) || [];
		eyr = eyr ? parseInt(eyr) : 0;
		let [, hgt, hgt_unit] = / hgt:(\d+)(cm|in) /.exec(line) || [];
		hgt = hgt ? parseInt(hgt) : 0;
		let [, hcl] = / hcl:#([0-9a-f]{6}) /.exec(line) || [];
		let [, ecl] = / ecl:(amb|blu|brn|gry|grn|hzl|oth) /.exec(line) || [];
		let [, pid] = / pid:(\d{9}) /.exec(line) || [];
		let cid = / cid:/.test(line);



        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        // hgt (Height) - a number followed by either cm or in:
        //     If cm, the number must be at least 150 and at most 193.
        //     If in, the number must be at least 59 and at most 76.
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        // cid (Country ID) - ignored, missing or not.


		let byr_b = byr >= 1920 && byr <= 2002;
		let iyr_b = iyr >= 2010 && iyr <= 2020;
		let eyr_b = eyr >= 2020 && eyr <= 2030;
		let hgt_b = false;
		if (hgt_unit === 'cm') {
			hgt_b = hgt >= 150 && hgt <= 193;
		} else if (hgt_unit === 'in') {
			hgt_b = hgt >= 59 && hgt <= 76;
		}
		let hcl_b = Boolean(hcl);
		let ecl_b = Boolean(ecl);
		let pid_b = Boolean(pid);

		const isValid = byr_b && iyr_b && eyr_b && hgt_b && ecl_b && hcl_b && pid_b;
		if (isValid) {
			console.log('+++ VALID: ', line, { pid }, '\n');
		} else {
			console.log('- INVALID: ', line,{ pid },'\n');
		}


		return isValid ? 1 : 0;
    }).reduce((a, b) => a+b)
    */

module.exports = {
    includesAllRequiredFields,
    allFieldsAreValid,
};
