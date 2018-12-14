const path = require('path');
const concurrently = require('concurrently');

// These all run is roughly the same amount of time
(async () => {
    await concurrently([
        'node 11/part-two.js 1 100',
        'node 11/part-two.js 101 150',
        'node 11/part-two.js 151 200',
        'node 11/part-two.js 201 300',
    ]);
})();

console.log('\n~~~~~~~~\nAll finished');
