// let spoken = {0:1,6:2,1:3,7:4,2:5,19:6};
let spoken = Array(30000000)
spoken[0] = 1;
spoken[6] = 2;
spoken[1] = 3;
spoken[7] = 4;
spoken[2] = 5;
spoken[19] = 6;
let next_spoken = 20

for (let turn = 7; turn < 30000000; turn++) {
  if (spoken[next_spoken]){
    last_turn = spoken[next_spoken]
    spoken[next_spoken] = turn
    next_spoken = turn - last_turn
  }else{
    spoken[next_spoken] = turn
    next_spoken = 0
  }
}
console.log(next_spoken)

let q = Object.keys(spoken).map(v => +v).sort((a, b) => a - b);
console.log('min', q[0])
console.log('max', q[q.length - 1])