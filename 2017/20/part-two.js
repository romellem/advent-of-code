const assert = require('assert');
const { input } = require('./input');
const PointCloud = require('./point-cloud');

let cloud = new PointCloud(input);
let total_points_left = cloud.runUntilNoPointsCollide();

console.log(total_points_left);
