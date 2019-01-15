# Answers

| Part 1 | Part 2 |
|--------|--------|
|  `110` | ` ` |

\--- Day 7: Internet Protocol Version 7 ---
-------------------------------------------

While snooping around the local network of EBHQ, you compile a list of [IP addresses](https://en.wikipedia.org/wiki/IP_address) (they're IPv7, of course; [IPv6](https://en.wikipedia.org/wiki/IPv6) is much too limited). You'd like to figure out which IPs support _TLS_ (transport-layer snooping).

An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or _ABBA_. An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as `xyyx` or `abba`. However, the IP also must not have an ABBA within any hypernet sequences, which are contained by _square brackets_.

For example:

*   `abba[mnop]qrst` supports TLS (`abba` outside square brackets).
*   `abcd[bddb]xyyx` does _not_ support TLS (`bddb` is within square brackets, even though `xyyx` is outside square brackets).
*   `aaaa[qwer]tyui` does _not_ support TLS (`aaaa` is invalid; the interior characters must be different).
*   `ioxxoj[asdfgh]zxcvbn` supports TLS (`oxxo` is outside square brackets, even though it's within a larger string).

_How many IPs_ in your puzzle input support TLS?

-----------------

## --- Part Two ---

You would also like to know which IPs support _SSL_ (super-secret listening).

An IP supports SSL if it has an Area-Broadcast Accessor, or _ABA_, anywhere in the supernet sequences (outside any square bracketed sections), and a corresponding Byte Allocation Block, or _BAB_, anywhere in the hypernet sequences. An ABA is any three-character sequence which consists of the same character twice with a different character between them, such as `xyx` or `aba`. A corresponding BAB is the same characters but in reversed positions: `yxy` and `bab`, respectively.

For example:

*   `aba[bab]xyz` supports SSL (`aba` outside square brackets with corresponding `bab` within square brackets).
*   `xyx[xyx]xyx` does _not_ support SSL (`xyx`, but no corresponding `yxy`).
*   `aaa[kek]eke` supports SSL (`eke` in supernet with corresponding `kek` in hypernet; the `aaa` sequence is not related, because the interior character must be different).
*   `zazbz[bzb]cdb` supports SSL (`zaz` has no corresponding `aza`, but `zbz` has a corresponding `bzb`, even though `zaz` and `zbz` overlap).

_How many IPs_ in your puzzle input support SSL?
