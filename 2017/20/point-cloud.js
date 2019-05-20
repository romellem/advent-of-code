const distance = require('manhattan');

const ORIGIN = [0, 0, 0];

class Point {
    // Args are arrays with three items representing x, y, and z values respectively. 
    constructor({ position, velocity, acceleration } = {}) {
        // Clone the arrays using `slice(0)` trick
        this.position = position.slice(0);
        this.velocity = velocity.slice(0);
        this.acceleration = acceleration.slice(0);
    }

    updateSpace() {
        // Update velocity
        this.velocity[0] += this.acceleration[0];
        this.velocity[1] += this.acceleration[1];
        this.velocity[2] += this.acceleration[2];

        // Update position
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[2] += this.velocity[2];
    }

    getDistanceFromOrigin() {
        return distance(this.position, ORIGIN);
    }
}

class PointCloud {
    /**
     * @param {Array} points - Array of objects with `position`, `velocity`, and `acceleration`.
     */
    constructor(points_orig) {
        this.points = [];
        points_orig.forEach(point => {
            this.points.push(new Point(point));
        });

        this.closest_point_index = undefined;
    }

    tick() {
        let shortest_distance = Number.MAX_SAFE_INTEGER;

        this.points.forEach((point, index) => {
            point.updateSpace();
            let distance = point.getDistanceFromOrigin();

            if (distance < shortest_distance) {
                shortest_distance = distance;
                this.closest_point_index = index;
            }
        });
    }

    /**
     * @param {Number} min_stable_runs 
     * @returns {Number} - Returns the index of the partible that eventually is closest to the origin
     */
    runUntilClosestPointIsStable(min_stable_runs = 1000) {
        let stable_runs = 0;
        while (stable_runs < min_stable_runs) {
            let old_closest_point_index = this.closest_point_index;

            this.tick();
            let new_closest_point_index = this.closest_point_index;

            if (old_closest_point_index !== new_closest_point_index) {
                stable_runs = 0;
            } else {
                stable_runs++;
            }
        }

        return this.closest_point_index;
    }
}

module.exports = PointCloud;