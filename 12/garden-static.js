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

    /**
     * @param {bool} force_null_death When true, the rule `.....` will always result in a death => `.`.
     *                                This leads to more interesting visualizations. Otherwise,
     *                                they just grow really fast outward.
     * @param {bool} force_semi_null_death See above, but for rule `#....`. Again, makes this more interesting.
     */
    getRandomSpreadRules(force_null_death = true, force_semi_null_death = true) {
        let rules = [];

        let num_rules = 0b11111;
        for (let i = 0; i < num_rules; i++) {
            let rule_binary = i.toString(2).padStart(5, '0');
            let rule = rule_binary.split('').map(n => n === '1' ? '#' : '.').join('');

            let result = Math.random() > .5 ? '#' : '.';

            if (i === 0 && force_null_death) {
                result = '.';
            }

            if (i === 0b10000 && force_semi_null_death) {
                result = '.';
            }

            rules.push(`${rule} => ${result}`);
        }

        return rules;
    }
}