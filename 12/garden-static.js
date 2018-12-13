module.exports = {
    getRandomIntialGardenState(length = 99) {
        // Always initialize starting pot to be filled.
        // Otherwise, its the same initial state jsut with things shifted a bit.
        let garden = '#';
        while (--length > 0) {
            garden += Math.random() > .5 ? '#' : '.';
        }

        return garden;
    },

    getRandomSpreadRules() {
        let rules = [];

        let num_rules = 0b11111;
        for (let i = 0; i < num_rules; i++) {
            let rule_binary = i.toString(2).padStart(5, '0');
            let rule = rule_binary.split('').map(n => n === '1' ? '#' : '.').join('');

            let result = Math.random() > .5 ? '#' : '.';

            rules.push(`${rule} => ${result}`);
        }

        return rules;
    }
}