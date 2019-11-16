// https://www.reddit.com/r/adventofcode/comments/7kj35s/2017_day_18_solutions/drevodb/
const fs = require('fs');
const path = require('path');

let input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

var commands = [];
input.split('\n').forEach(d => {
    commands.push({"name": d.substring(0,3), "args": d.substring(4).split(' ')})
})

function Program(id) {
    this.registers = {};
    this.lastSound = "";
    this.index = 0;
    this.id = id;
    this.sendCount = 0;
    this.queue = [];
    this.registers['p'] = id;

    this.instP1 = {
        "set": (a,b) => { this.registers[a] = this.parse(b); this.index++; },
        "mul": (a,b) => { this.registers[a] *= this.parse(b); this.index++; },
        "add": (a,b) => { this.registers[a] += this.parse(b); this.index++; },
        "mod": (a,b) => { this.registers[a] = this.registers[a] % this.parse(b); this.index++; },
        "snd": a => { this.lastSound = this.parse(a); this.index++; },
        "jgz": (a,b) => { this.index += this.parse(a)>0 ? this.parse(b) : 1; },
        "rcv": a => { if(this.parse(a)>0) { console.log('recovered',this.lastSound); return true; } this.index++; }
    }
    this.instP2 = {
        "set": this.instP1.set,
        "mul": this.instP1.mul,
        "add": this.instP1.add,
        "mod": this.instP1.mod,
        "jgz": this.instP1.jgz,
        "snd": a => { programs[(this.id+1)%2].queue.push(this.parse(a)); this.index++; this.sendCount++; },
        "rcv": a => { if(this.queue.length>0) { this.registers[a] = this.queue.shift(); this.index++; } }
    }
    Program.prototype.executeP1 = function() {
        return this.instP1[commands[this.index].name](...commands[this.index].args);
    }
    Program.prototype.executeP2 = function() {
        return this.instP2[commands[this.index].name](...commands[this.index].args);
    }
    Program.prototype.parse = function(b) {
        return isNaN(b) ? this.registers[b] : parseInt(b);
    }
    Program.prototype.finished = function() {
        return this.index < 0 || this.index >= commands.length;
    }
    Program.prototype.finishedOrStalled = function() {
        return this.finished() || (commands[this.index].name == 'rcv' && this.queue.length == 0);
    }
}

// part 1
var prog = new Program(0);
while(!prog.executeP1());

// part 2
var programs = [new Program(0), new Program(1)]
do {
    programs.forEach(d => { if(!d.finished()) d.executeP2(); })
} while(!programs.reduce((a,b) => a && b.finishedOrStalled(),true))

console.log('program 1 send count:',programs[1].sendCount)