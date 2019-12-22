// @source https://github.com/caderek/aoc2019/blob/1a0a9d4/src/day22/index.ts
//
// > https://old.reddit.com/r/adventofcode/comments/ee0rqi/2019_day_22_solutions/fbqdhef/
// >
// > Part one was pretty easy, part two was impossible for me to solve without
// > looking for clues on this thread. My solution to part two follows an
// > excellent u/mcpower_ explanation and translates his/her solution to TS/JS.
// > Not very proud of that, but I spent a lot of time trying to do it with my
// > limited maths skills and it was not fun at all ;/

import { readInput, arr } from "../utils/index"
import { modInv, modPow } from "bigint-crypto-utils"

const prepareInput = (rawInput: string, parse: Function) =>
  rawInput.split("\n").map((x) => {
    if (x.startsWith("deal with")) {
      return { type: "inc", val: parse(x.split("deal with increment ")[1]) }
    }
    if (x.startsWith("deal into")) {
      return { type: "rev" }
    }
    if (x.startsWith("cut")) {
      return { type: "cut", val: parse(x.split("cut")[1]) }
    }
  })

const goA = (rawInput: string) => {
  const moves = prepareInput(rawInput, Number)
  const cards = 10007

  let deck = arr.range_(0, cards)

  moves.forEach(({ type, val }) => {
    switch (type) {
      case "rev": {
        deck.reverse()
        break
      }
      case "cut": {
        const left = deck.slice(val)
        const right = deck.slice(0, val)
        deck = left.concat(right)
        break
      }
      case "inc": {
        const temp = new Array(cards)
        let originalIndex = 0
        let index = 0

        while (originalIndex < cards) {
          if (temp[index % cards] === undefined) {
            temp[index % cards] = deck[originalIndex]
            originalIndex++
          }

          index += val
        }

        deck = temp
        break
      }
    }
  })

  return deck.findIndex((x) => x === 2019)
}

const goB = (rawInput: string) => {
  const moves = prepareInput(rawInput, BigInt)
  const times = 101741582076661n
  const deckSize = 119315717514047n
  const cardPosition = 2020n

  let incMultiplier = 1n
  let offsetDiff = 0n

  moves.forEach(({ type, val }) => {
    switch (type) {
      case "rev": {
        incMultiplier = -incMultiplier % deckSize
        offsetDiff = (offsetDiff + incMultiplier) % deckSize
        break
      }
      case "cut": {
        offsetDiff = (offsetDiff + val * incMultiplier) % deckSize
        break
      }
      case "inc": {
        incMultiplier = (incMultiplier * modInv(val, deckSize)) % deckSize
        break
      }
    }
  })

  const inc: bigint = modPow(incMultiplier, times, deckSize)

  let offset =
    (offsetDiff *
      (1n - inc) *
      modInv((1n - incMultiplier) % deckSize, deckSize)) %
    deckSize

  return Number((offset + inc * cardPosition) % deckSize)
}

/* Results */

const input = readInput()

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA) // -> 8502
console.log("Solution to part 2:", resultB) // -> 41685581334351
