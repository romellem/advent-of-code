import fs from "fs";

type Segment = {
  start: number;
  end: number;
  op: "+" | "*";
};

/**
 * Break the worksheet into contiguous column ranges, using any fully blank
 * column as a separator. The operator is read from the bottom row of each
 * range.
 */
function findSegments(grid: string[]): Segment[] {
  const width = grid[0].length;
  const opRow = grid[grid.length - 1];
  const segments: Segment[] = [];
  let inSegment = false;
  let start = 0;

  const columnHasContent = (col: number) => grid.some((row) => row[col] !== " ");
  const extractOp = (s: number, e: number): Segment["op"] => {
    for (let c = s; c < e; c++) {
      const ch = opRow[c];
      if (ch === "+" || ch === "*") return ch;
    }
    throw new Error(`No operator found in columns ${s}-${e}`);
  };

  for (let c = 0; c < width; c++) {
    const hasContent = columnHasContent(c);
    if (!inSegment && hasContent) {
      inSegment = true;
      start = c;
    } else if (inSegment && !hasContent) {
      segments.push({ start, end: c, op: extractOp(start, c) });
      inSegment = false;
    }
  }
  if (inSegment) {
    segments.push({ start, end: width, op: extractOp(start, width) });
  }
  return segments;
}

/**
 * Part 1: each row (except the operator row) is a whole number; combine them
 * in top-to-bottom order using the operator.
 */
function evaluateRowWise(grid: string[], segment: Segment): bigint {
  const opRowIndex = grid.length - 1;
  const values: bigint[] = [];
  for (let r = 0; r < opRowIndex; r++) {
    const text = grid[r].slice(segment.start, segment.end).trim();
    if (text) values.push(BigInt(text));
  }
  if (values.length === 0) return 0n;
  return values.reduce((acc, val) =>
    segment.op === "+" ? acc + val : acc * val
  );
}

/**
 * Part 2: each column within a segment forms a number when read top-to-bottom.
 * Problems are read right-to-left, so we iterate columns from right to left.
 */
function evaluateColumnWise(grid: string[], segment: Segment): bigint {
  const opRowIndex = grid.length - 1;
  const values: bigint[] = [];

  for (let c = segment.end - 1; c >= segment.start; c--) {
    let digits = "";
    for (let r = 0; r < opRowIndex; r++) {
      const ch = grid[r][c];
      if (ch !== " ") digits += ch;
    }
    if (digits) values.push(BigInt(digits));
  }

  if (values.length === 0) return 0n;
  return values.reduce((acc, val) =>
    segment.op === "+" ? acc + val : acc * val
  );
}

function main() {
  const raw = fs.readFileSync(new URL("./input.txt", import.meta.url), "utf8");
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  // Drop any trailing blank lines without disturbing intentional spaces.
  while (lines.length && lines[lines.length - 1] === "") lines.pop();

  const width = Math.max(...lines.map((line) => line.length));
  const grid = lines.map((line) => line.padEnd(width, " "));

  const segments = findSegments(grid);

  let part1 = 0n;
  let part2 = 0n;
  for (const segment of segments) {
    part1 += evaluateRowWise(grid, segment);
    part2 += evaluateColumnWise(grid, segment);
  }

  console.log(`Part 1: ${part1}`);
  console.log(`Part 2: ${part2}`);
}

main();
