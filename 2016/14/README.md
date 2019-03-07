# Answers

| Part 1 | Part 2 |
|--------|--------|
|  ` ` |  ` ` |

## --- Day 14: One-Time Pad ---

In order to communicate securely with Santa while you're on this mission, you've been using a [one-time pad](https://en.wikipedia.org/wiki/One-time_pad) that you [generate](https://en.wikipedia.org/wiki/Security_through_obscurity) using a pre-agreed algorithm. Unfortunately, you've run out of keys in your one-time pad, and so you need to generate some more.

To generate keys, you first get a stream of random data by taking the [MD5](https://en.wikipedia.org/wiki/MD5) of a pre-arranged [salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) (your puzzle input) and an increasing integer index (starting with `0`, and represented in decimal); the resulting MD5 hash should be represented as a string of _lowercase_ hexadecimal digits.

However, not all of these MD5 hashes are _keys_, and you need `64` new keys for your one-time pad. A hash is a key _only if_:

*   It contains _three_ of the same character in a row, like `777`. Only consider the first such triplet in a hash.
*   One of the next `1000` hashes in the stream contains that same character _five_ times in a row, like `77777`.

Considering future hashes for five-of-a-kind sequences does not cause those hashes to be skipped; instead, regardless of whether the current hash is a key, always resume testing for keys starting with the very next hash.

For example, if the pre-arranged salt is `abc`:

*   The first index which produces a triple is `18`, because the MD5 hash of `abc18` contains `...cc38887a5...`. However, index `18` does not count as a key for your one-time pad, because none of the next thousand hashes (index `19` through index `1018`) contain `88888`.
*   The next index which produces a triple is `39`; the hash of `abc39` contains `eee`. It is also the first key: one of the next thousand hashes (the one at index 816) contains `eeeee`.
*   None of the next six triples are keys, but the one after that, at index `92`, is: it contains `999` and index `200` contains `99999`.
*   Eventually, index `22728` meets all of the criteria to generate the `64`th key.

So, using our example salt of `abc`, index `22728` produces the `64`th key.

Given the actual salt in your puzzle input, _what index_ produces your `64`th one-time pad key?
