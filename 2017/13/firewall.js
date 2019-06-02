const { mapValues, keyBy } = require('lodash');

class Layer {
    constructor(range = 0) {
        this.range = range;

        this.scanner = null;
        this.direction = null;

        if (this.range > 0) {
            // Initialize the scanner at position 0, going down (+1)
            this.scanner = 0;
            this.direction = 1;
        }
    }

    tick() {
        if (this.range > 0) {
            this.scanner += this.direction;

            // If we are at the end, or are at the beginning, the flip the direction
            if (
                (this.direction === 1 && this.scanner === this.range - 1) ||
                (this.direction === -1 && this.scanner === 0)
            ) {
                this.direction *= -1;
            }
        }

        return this.scanner;
    }
}

class Firewall {
    constructor(layers) {
        // Poor man's deep clone
        // let layers = JSON.parse(JSON.stringify(layers_orig));

        let max_depth = this.getMaxDepth(layers);
        let layers_lookup = this.convertLayersArrayToMap(layers);

        // `max_depth + 1` because the layers are zero-indexed
        this.layers = Array(max_depth + 1)
            .fill()
            .map((layer, depth) => new Layer(layers_lookup[depth]));
    }

    getMaxDepth(layers) {
        return Math.max.apply(null, layers.map(l => l.depth));
    }

    /**
     * @param {Array} layers - Array of { depth, range } objects
     * @returns {Object} - Returns an object, keyed by `depth`, with its value as the `range`
     */
    convertLayersArrayToMap(layers) {
        return mapValues(keyBy(layers, 'depth'), 'range');
    }

    /**
     * @param {Boolean} return_severity - When true, returns the "severity" score.
     *                                    When false, returns `true` if you _were_ caught, false if otherwise.
     * @returns {Number|Boolean}
     */
    moveThrough(return_severity = true) {
        let times_caught = [];
        for (let time = 0; time < this.layers.length; time++) {
            let layer = this.layers[time];
            /**
             * First, particle enters (determined by `time`),
             * so we see if the layer at `time` has the scanner
             * in position `0`.
             *
             * If we are "returning the severity score,"
             * then, push a "time_caught" into our array,
             * with `time` multiplied by the layers `range`.
             *
             * If we want to see if we are caught only, then
             * exit immediately.
             */
            if (layer.scanner === 0) {
                if (return_severity) {
                    times_caught.push(time * layer.range);
                } else {
                    return true;
                }
            }

            // Next, tick all layers' scanners forward
            this.tickAll();
        }

        return return_severity ? times_caught.reduce((a, b) => a + b, 0) : false;
    }

    tickAll(n = 1) {
        for (let i = 0; i < n; i++) {
            this.layers.forEach(l => l.tick());
        }
    }
}

module.exports = Firewall;
