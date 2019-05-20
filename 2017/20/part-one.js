const assert = require('assert');
const { input, sampleInput } = require('./input');
const PointCloud = require('./point-cloud');

// Tests
let test_cloud = new PointCloud(sampleInput);
let test_closest_point = test_cloud.runUntilClosestPointIsStable();
assert.strictEqual(0, test_closest_point);

let cloud = new PointCloud(input);
let closest_point = cloud.runUntilClosestPointIsStable();

console.log(closest_point);
