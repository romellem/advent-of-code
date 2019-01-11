const fs = require("fs");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function parse(line) {
  const data = line.replace(/[=>]/g, "").split(" ");
  return { from: data[2], to: data[0] };
}

function allTransforms(input, transform) {
  const result = [];
  const re = new RegExp(transform.from, "g");
  while (true) {
    const match = re.exec(input);
    if (!match) {
      break;
    }

    const out = [
      input.slice(0, match.index),
      transform.to,
      input.slice(match.index + transform.from.length)
    ].join("");

    result.push(out);
  }

  return result;
}

const uniq = input => {
  let res = {};
  for (i of input) {
    res[i] = 1;
  }

  return Object.keys(res);
};

function solve(input, data) {
  let result = [];
  for (const transform of data) {
    result = [...result, ...allTransforms(input, transform)];
  }

  return uniq(result);
}

// ===========================================================================

const file = fs
  .readFileSync(__dirname + "/19.txt")
  .toString()
  .split("\n");

const input = file.pop();
file.pop();

const testData = ["e => H", "e => O", "H => HO", "H => OH", "O => HH"].map(
  parse
);

const date = new Date();

function processMap(start, transforms, finish) {
  let gen = 0;
  let inputs = [start];

  while (inputs.length) {
    gen++;
    let outputs = [];
    console.log("gen", gen);
    if (gen >= 199) {
      gen;
    }

    // ct = 0;

    for (const input of inputs) {
      // ct++;
      // if (ct % 1000 === 0) {
      //   console.log(Math.floor((10000 * ct) / inputs.length));
      // }

      const results = solve(input, transforms);
      for (result of results) {
        outputs.push(result);
        if (result === finish) {
          console.log('FOUND IT\n\n')
          return gen;
        }
      }
    }

    console.log("len", outputs.length);
    outputs.sort((a, b) => a.length - b.length);

    inputs = outputs.slice(0, 1000); // we take 1000 shortest versions
    inputs = uniq(inputs);
  }
}

assert(processMap("HOH", testData, "e"), 3);
assert(processMap("HOHOHO", testData, "e"), 6);

console.log(processMap(input, file.map(parse), "e"));
