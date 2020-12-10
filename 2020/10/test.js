const { input } = require('./input');
const { Node, Graph } = require('./graph');
const s = [
    // 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19
    // 1,4,7,8,9,12,14,16
    // 1,4,5,6,9,12,13,14,15,18
    // 1,4,7,10,12,14,16
    // 1
     1,2,3,4
];



function reduceInput(o) {
    return o;
    // debugger;
    let input = o.slice(0);
    let reduced = [0];
    let next_interval;
    for (let i = 0; i< input.length; i++) {
        let a = reduced[reduced.length - 1]
        let b = input[i]
        let c = input[i+1]
        if (c - a > 3) {
            if (!next_interval)
                next_interval = b - a;
        } else {
            reduced.push(a + next_interval);
            next_interval = undefined;
        }
    }
    reduced.push(input[1]);
    
    return reduced;
}

// let r = reduceInput(s);
// r.shift();
// console.log(r)
let g = new Graph(s);
console.log(g.print());