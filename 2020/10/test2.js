const { LinkedList } = require('./graph');


let q = new LinkedList();
q.add(1);
q.add(2);
q.add(4);
q.add(6);
q.add(7);

console.log(q.toString());

for (let v of q) {
    console.log('hey', v.value);
}
