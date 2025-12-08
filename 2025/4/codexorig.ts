import fs from "fs";

const input = fs.readFileSync(new URL("./input.txt", import.meta.url), "utf8").trimEnd();
const lines = input.split("\n");

const rows = lines.length;
const cols = lines[0].length;

const grid: boolean[][] = lines.map((line) => line.split("").map((ch) => ch === "@"));
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const inBounds = (r: number, c: number) => r >= 0 && r < rows && c >= 0 && c < cols;

const neighborCount = (r: number, c: number, active: boolean[][]) => {
  let count = 0;
  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (inBounds(nr, nc) && active[nr][nc]) count++;
  }
  return count;
};

let part1 = 0;
let totalRolls = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!grid[r][c]) continue;
    totalRolls++;
    if (neighborCount(r, c, grid) < 4) part1++;
  }
}

// Compute the 4-core of the adjacency graph formed by touching (including diagonals) rolls.
const degrees: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!grid[r][c]) continue;
    degrees[r][c] = neighborCount(r, c, grid);
  }
}

const removed: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
const queue: Array<[number, number]> = [];

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (grid[r][c] && degrees[r][c] < 4) queue.push([r, c]);
  }
}

let removedCount = 0;

while (queue.length) {
  const [r, c] = queue.pop()!;
  if (removed[r][c]) continue;
  removed[r][c] = true;
  removedCount++;

  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (!inBounds(nr, nc)) continue;
    if (!grid[nr][nc] || removed[nr][nc]) continue;
    degrees[nr][nc]--;
    if (degrees[nr][nc] === 3) queue.push([nr, nc]);
  }
}

const part2 = removedCount;

console.log("Part 1:", part1);
console.log("Part 2:", part2);
