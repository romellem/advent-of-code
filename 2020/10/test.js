const { input } = require('./input');
const { Node, Graph } = require('./graph');
const s = [
    // 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19
    // 1,4,7,8,9,12,14,16
    1,2
    // 1,4,7,10,12,14,16
    // 1
    //  2,3,5
];



function reduceInput(o) {
    // debugger;
    let input = o.slice(0);
    let reduced = [0];
    let skipped;
    for (let i = input.length - 1; i > 1 ; i--) {
        let a = reduced[reduced.length - 1]
        let b = input[i]
        let c = input[i+1]
        if (a - c > 3) {
            
        } else {
            reduced.push(a);
        }
    }
    reduced.push(input[1]);
    
    return reduced;
}

let r = reduceInput(s);
r.shift();
console.log(r)
let g = new Graph(s);
console.log(g.print());