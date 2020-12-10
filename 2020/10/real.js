const { DiGraph } = require('./graph');
const { input } = require('./input');
input.sort((a, b) => a  - b)

function splitInputOnGapsOfThree(input) {
    let runs = [];
    let current_run = [];
    for (let i = 0; i < input.length; i++) {
        let a = input[i];
        current_run.push(a);

        let b = input[i + 1];
        if (b - a === 3) {
            runs.push(current_run);
            current_run = [];
        }
    }
    runs.push(current_run);
    // return runs;
    
    const normalized_runs = runs.map((run, i) => {
        let [a] = run;
        let step = a - 1;
        let normalized_run = run.map(v => v - step);
        if (normalized_run.length > 1 && i > 0) normalized_run.pop();
        return normalized_run;
    });
    return normalized_runs;
}

let total = splitInputOnGapsOfThree(input).map(run => {
    let g = new DiGraph(run);
    return g.countPaths();
}).reduce((prod, num) => prod * num, 1);
console.log(total)
