const distance = require('manhattan');

// Empty spot to left-most part beyond wall
const d1 = distance([35, 18], [13, 7]);

// Just beyond wall to G
const d2 = distance([13, 7], [36, 0]);

// Then, it is 5 moves to inch G over by one spot to the left

/*
    Initial
    
    . G _
    . . .

    Step 1.
    
    . G .
    . . _

    Step 2.
    
    . G .
    . _ .

    Step 3.
    
    . G .
    _ . .

    Step 4.
    
    _ G .
    . . .

    Step 5.
    
    G _ .
    . . .
*/

// When the empty spot gets to G for the first time, switch G over to spot 35,0
const d3 = distance([35, 0], [0, 0]) * 5;

console.log(d1 + d2 + d3);
