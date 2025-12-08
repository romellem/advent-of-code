import { readFileSync } from "fs";

// Load the puzzle input as a grid of characters.
const raw = readFileSync(new URL("./input.txt", import.meta.url), "utf8").trimEnd();
const lines = raw.split("\n");

type Grid = boolean[][];

const rows = lines.length;
const cols = lines[0].length;

// Build a mutable boolean grid for part two while preserving the raw
// characters for part one.
const grid: Grid = lines.map((line) => line.split("").map((ch) => ch === "@"));

// Offsets for the eight neighboring cells.
const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;

const inBounds = (r: number, c: number) => r >= 0 && r < rows && c >= 0 && c < cols;

const neighborCount = (g: Grid, r: number, c: number) =>
  dirs.reduce(
    (count, [dr, dc]) => count + (inBounds(r + dr, c + dc) && g[r + dr][c + dc] ? 1 : 0),
    0,
  );

// Part 1: count rolls that have strictly fewer than four neighboring rolls.
let part1 = 0;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!grid[r][c]) continue;
    if (neighborCount(grid, r, c) < 4) part1++;
  }
}

// Part 2: repeatedly remove accessible rolls.
// We rescan the whole grid after each wave of removals; the grid is only ~10k
// cells so this O(iterations * cells) approach stays fast and keeps the logic
// straightforward.
let removed = 0;
while (true) {
  const toRemove: Array<[number, number]> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!grid[r][c]) continue;
      if (neighborCount(grid, r, c) < 4) {
        toRemove.push([r, c]);
      }
    }
  }

  if (toRemove.length === 0) break;

  for (const [r, c] of toRemove) grid[r][c] = false;
  removed += toRemove.length;
}

const part2 = removed;

console.log("Part 1:", part1);
console.log("Part 2:", part2);
