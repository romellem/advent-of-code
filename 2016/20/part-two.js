const ranges = require('./ranges');

// Ranges is a sorted array of objects with `lower` and `upper` keys (inclusive)
const reduceRanges = _ranges => {
    let ranges = JSON.parse(JSON.stringify(_ranges));
    let accumulator = [];

    // Always add the first element to our accumulator
    accumulator.push(ranges.shift());

    for (let range of ranges) {
        // Get last added range
        let current_top_range = accumulator[accumulator.length - 1];
        if (range.lower > current_top_range.upper) {
            // Next range is outside the current range, possibly with a gap in between
            // @example
            // `range`:         |-------|
            // `current`: |-----|
            accumulator.push(range);
        } else if (range.lower <= current_top_range.upper && range.upper > current_top_range.upper) {
            // Next range partially overlaps the upper end, so extend the upper
            // @example
            // `range`:       |---------|
            // `current`: |----------|
            current_top_range.upper = range.upper;
        } else {
            // Otherwise, the next range is entirely inside the current, so skip it
            // @example
            // `range`:      |-----|
            // `current`: |----------|
        }
    }

    // So now `accumulator` is a list of ranges that do not overlap
    let total = 0;
    for (let i = 0; i < accumulator.length - 1; i++) {
        let a = accumulator[i];
        let b = accumulator[i + 1];

        // Minus 1 to count whole numbers in between
        total += b.lower - a.upper - 1;
    }

    return total;
}

console.log(reduceRanges(ranges));
