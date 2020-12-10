class Jolts {
    constructor(input) {
       this.input_copy = input.slice(0);
        this.max = -Number.MAX_SAFE_INTEGER;
        for (let num of input) {
            if (num > this.max) this.max = num;
        }
        this.max += 3;

        console.log(this.buildGraph(input.slice(0)))

    }

    buildGraph(input) {
        let sorted_input = input.sort((a, b) => a - b);
        let input_map = input.reduce((obj, v) => ((obj[v] = true), obj), {});
        let start = 0;
        let counts = [0,0,0,0];
        for (let num of sorted_input) {
            // console.log(num)
            if (num - start <= 3) {
                counts[num - start]++;

                start = num;
            } else {
                console.log('ear')
                return counts[1] * counts[3];
            }
        }

        console.log(counts)
        return counts[1] * (counts[3] + 1);
    }
}

module.exports = { Jolts}