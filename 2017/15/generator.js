class Generator {
    constructor({ startsWith, factor, divideBy, multiple } = {}) {
        this.starts_with = startsWith;
        this.factor = factor;
        this.divide_by = divideBy;

        this.multiple = multiple;

        this.value = this.nextValue(this.starts_with);
    }

    nextValue(value = this.value) {
        let calculated_value = (value * this.factor) % this.divide_by;
        if (typeof this.multiple === 'number') {
            // Part two, loop through our "next values" until it is a multiple of our configured `multiple` option
            while (calculated_value % this.multiple !== 0) {
                calculated_value = (calculated_value * this.factor) % this.divide_by;
            }
        }

        // For part one, just return what we previously calculated
        return calculated_value;
    }

    setNextValue(value = this.value) {
        this.value = this.nextValue(value);
        return this.value;
    }
}

module.exports = Generator;
