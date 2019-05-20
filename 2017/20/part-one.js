const assert = require('assert');
const input = require('./input');
const PointCloud = require('./point-cloud');

let cloud = new PointCloud(input);
let closest_point = cloud.runUntilClosestPointIsStable();

console.log(closest_point);
