const { groupBy, pickBy, flatten } = require('groupBy');
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
        let distances = this.points.map(point => ({ point, distance: point.getDistanceFromOrigin() }));
        // distances.sort((a, b) => {
        //     if (a.distance < b.distance) return -1;
        //     else if (a.distance > b.distance) return 1;
        //     else return 0;
        // });

        // Get duplicates distances, they have the possibility for collisions
        let points_groups_by_distance = groupBy(distances, obj => obj.distance);
        let points_that_may_have_collided = pickBy(points_groups_by_distance, points => points.length > 1);

        for (let points_arr of points_that_may_have_collided) {
            
        }

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
}

module.exports = PointCloud;
