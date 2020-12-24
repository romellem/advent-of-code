const { input } = require('./input');
const { LoopedList } = require('looped-list');

const newinput = input.concat(Array(1000000 - 9).fill().map((v, i) => i + 10));

var list = new LoopedList(newinput);

let lookup = Array(1000001);
for (let i = 0; i < 1000000; i++) {
	lookup[list.head.value] = list.head;
	list.move();
}


for (let i = 0; i < 10000000; i++) {
	i %100 === 0 && process.stdout.write(i/10000000*100+ '%\r')
	let current_cup = list.head.value;
	list.move();
	let a = list.popHeadMoveNext();
	let b = list.popHeadMoveNext();
	let c = list.popHeadMoveNext();
	list.move(-1);


	let newval = current_cup - 1;
	if (newval < 1) newval = 1000000;
	while (a.value === newval || b.value === newval || c.value === newval) {
		newval--;
	}

	list.head = lookup[newval];

	list.insertNext(a);
	list.insertNext(b);
	list.insertNext(c);
	
	
	list.head = lookup[current_cup];
	list.move();
}

list.head = lookup[1];
list.move();

let a = list.head.value;
list.move();
let b= list.head.value;

console.log('\n')
console.log(a, '*', b)
console.log(a* b)