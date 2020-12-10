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
        let tips = [0];
        let sorted_input = input.sort((a, b) => a - b);
        sorted_input.push(this.max)
        let input_map = input.reduce((obj, v) => ((obj[v] = true), obj), {});
        for (let i = 0; i < sorted_input.length; i++) {
            for (let t = 0;t < tips.length; t++) {
                let tip = tips[t];
                let slice = sorted_input.slice(i, i + 3);
                let filtered = slice.filter(s => (s - tip <= 3) || s < tip);
                let 
            }
            
            slice.filter(s => )
            for (let s of slice) {
                
                    
                    if (s - tip <= 3) {
                        tips[t] = s;
                    }
                }
            }
        }
    }
}

module.exports = { Jolts}