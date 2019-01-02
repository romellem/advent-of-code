// const fs = require('fs')

const { parse } = require('./turing-lang/lib/turing-lang');

/*
Begin in state A.
Perform a diagnostic checksum after 12919244 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state C.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state D.

In state C:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state E.

In state D:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state B.

In state E:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state F.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state C.

In state F:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state D.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.

*/

// CURRENT_STATE READ_SYMBOL => NEXT_STATE WRITTEN_SYMBOL [LEFT | RIGHT]

/**
 * Q0: State A
 * Q1: State B
 * Q2: State C
 * Q3: State D
 * Q4: State E
 * Q5: State F
 */
const MACHINE_CODE = `
Q0 0 => Q1 1 RIGHT
Q0 1 => Q2 0 LEFT

Q1 0 => Q0 1 LEFT
Q1 1 => Q3 1 RIGHT

Q2 0 => Q0 1 RIGHT
Q2 1 => Q4 0 LEFT

Q3 0 => Q0 1 RIGHT
Q3 1 => Q1 0 RIGHT

Q4 0 => Q5 1 LEFT
Q4 1 => Q2 1 LEFT

Q5 0 => Q3 1 RIGHT
Q5 1 => Q0 1 RIGHT
`;

let machine = parse(MACHINE_CODE);
machine.running = true;

// console.log('Step 0', machine.tape.data);

for (let i = 0; i < 12919244; i++) {
  if (i % 7919 === 0) {
      process.stdout.write(i + '...\r');
  }
machine.step();
// console.log('Step ' + (i + 1), machine.tape.data);
}

let values = Object.values(machine.tape.data).filter(n => n === '1');


console.log('\n')
console.log(values.length)
console.log('')

// fs.writeFileSync('output2.json', JSON.stringify(values));

