const input = require('./input');
const traverse = require('traverse');

let paths_that_contain_red_lookup = {};

let traversed = traverse(input);

// Use a regular function so it can have its `this` keyword bound!
traversed.forEach(function(val) {
    // Don't blacklist a path if the parent is an array
    if (val === 'red' && !Array.isArray(this.parent.node)) {
        // Make a copy so we can modify it
        let parent_path = this.path.slice(0);

        // Remove the current node so we only have the parent path
        parent_path.pop();

        paths_that_contain_red_lookup[parent_path.join(',')] = true;
    }
});

// Now that we know all the paths with 'red', traverse our whole tree again,
// but skip any paths that contain 'red'

let paths_that_contain_red = Object.keys(paths_that_contain_red_lookup);

let sum = 0;
traversed.forEach(function(val) {
    // If we have a number, check that its sibling / parent doesn't have 'red' anywhere
    if (typeof val === 'number') {
        let path = this.path.join(',');

        let val_has_bad_parent_or_sibling = false;
        for (let i = 0; i < paths_that_contain_red.length; i++) {
            let bad_path = paths_that_contain_red[i];
            if (path.indexOf(bad_path) === 0) {
                val_has_bad_parent_or_sibling = true;
                break;
            }
        }

        if (!val_has_bad_parent_or_sibling) {
            sum += val;
        }
    }
});

console.log(sum);
