class Generator {
    constructor({ startsWith, factor, divideBy } = {}) {
        this.starts_with = startsWith;
        this.factor = factor;
        this.divide_by = divideBy;

        this.value = this.nextValue(this.starts_with);
    }

    nextValue(value = this.value) {
        return (value * this.factor) % this.divide_by;
    }

    setNextValue(value = this.value) {
        this.value = this.nextValue(value);
        return this.value;
    }
}

module.exports = Generator;
