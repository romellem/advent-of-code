const assert = require('assert');
const { input, sampleInput } = require('./input');
const Firewall = require('./firewall');

// Tests
let test_firewall = new Firewall(sampleInput.config);
let test_severity = test_firewall.moveThrough();
assert.strictEqual(test_severity, sampleInput.severity);