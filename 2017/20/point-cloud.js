const { groupBy, pickBy, flatten } = require('lodash');
const distance = require('manhattan');

const ORIGIN = [0, 0, 0];

class Point {
    /**
     * @param id - The particle "index"
     * @param {Object} - 2nd args is an object with arraysm that have three numbers representing x, y, and z values respectively.
     */
    constructor(id, { position, velocity, acceleration } = {}) {
        this.id = id;

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

    /**
     * Returns whether or not two points overlap in their position
     * @param {Point} point
     */
    overlap(point) {
        return (
            this.position[0] === point.position[0] &&
            this.position[1] === point.position[1] &&
            this.position[2] === point.position[2]
        );
    }

    toString() {
        let [x, y, z] = this.position;
        return `${x},${y},${z}`;
    }
}

class PointCloud {
    /**
     * @param {Array} points - Array of objects with `position`, `velocity`, and `acceleration`.
     */
    constructor(points_orig) {
        this.points = [];
        points_orig.forEach((point, index) => {
            this.points.push(new Point(index, point));
        });

        this.closest_point_index = undefined;
    }

    getClosestPointIndexToOrigin() {
        let shortest_distance = Number.MAX_SAFE_INTEGER;
        let closest_point_index = undefined;
        this.points.forEach((point, index) => {
            let distance = point.getDistanceFromOrigin();

            if (distance < shortest_distance) {
                shortest_distance = distance;
                closest_point_index = index;
            }
        });

        return closest_point_index;
    }

    tick() {
        this.points.forEach((point, index) => {
            point.updateSpace();
        });
    }

    removeCollidedPoints() {
        // Get duplicate positions
        let points_by_position = groupBy(this.points, point => point.toString());
        let unique_points_obj = pickBy(points_by_position, group => group.length === 1);

        this.points = flatten(Object.values(unique_points_obj));
        return this.points;
    }

    /**
     * @param {Number} min_stable_runs
     * @returns {Number} - Returns the index of the partible that eventually is closest to the origin
     */
    runUntilClosestPointIsStable(min_stable_runs = 1000) {
        let stable_runs = 0;
        while (stable_runs < min_stable_runs) {
            // Save previous closest point
            let old_closest_point_index = this.closest_point_index;

            // Update all points
            this.tick();

            // Get new closest point
            let new_closest_point_index = this.getClosestPointIndexToOrigin();
            this.closest_point_index = new_closest_point_index;

            // COmpare the indeces, and reset our "stable runs" if the point changes
            if (old_closest_point_index !== new_closest_point_index) {
                stable_runs = 0;
            } else {
                stable_runs++;
            }
        }

        return this.closest_point_index;
    }

    runUntilNoPointsCollide(min_stable_runs = 1000) {
        let stable_runs = 0;
        while (stable_runs < min_stable_runs) {
            let old_amount_of_points = this.points.length;

            // Update all points and remove collisions
            this.tick();
            this.removeCollidedPoints();

            // Get new closest point
            let new_amount_of_points = this.points.length;

            // Compare amounts, and reset our "stable runs" if the value changes
            if (old_amount_of_points !== new_amount_of_points) {
                stable_runs = 0;
            } else {
                stable_runs++;
            }
        }

        return this.points.length;
    }
}

module.exports = PointCloud;
