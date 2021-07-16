# Answers

|  Part 1  |  Part 2 |
|----------|---------|
|  `22659` | ` ` |

## --- Day 23: Category Six ---

The droids have finished repairing as much of the ship as they can. Their report indicates that this was a _Category 6_ disaster - not because it was that bad, but because it destroyed the stockpile of [Category 6](https://en.wikipedia.org/wiki/Category_6_cable) network cables as well as most of the ship's network infrastructure.

You'll need to _rebuild the network from scratch_.

The computers on the network are standard [Intcode](https://adventofcode.com/2019/day/9) computers that communicate by sending _packets_ to each other. There are `50` of them in total, each running a copy of the same _Network Interface Controller_ (NIC) software (your puzzle input). The computers have _network addresses_ `0` through `49`; when each computer boots up, it will request its network address via a single input instruction. Be sure to give each computer a unique network address.

Once a computer has received its network address, it will begin doing work and communicating over the network by sending and receiving _packets_. All packets contain _two values_ named `X` and `Y`. Packets sent to a computer are queued by the recipient and read in the order they are received.

To _send_ a packet to another computer, the NIC will use _three output instructions_ that provide the _destination address_ of the packet followed by its `X` and `Y` values. For example, three output instructions that provide the values `10`, `20`, `30` would send a packet with `X=20` and `Y=30` to the computer with address `10`.

To _receive_ a packet from another computer, the NIC will use an _input instruction_. If the incoming packet queue is _empty_, provide `-1`. Otherwise, provide the `X` value of the next packet; the computer will then use a second input instruction to receive the `Y` value for the same packet. Once both values of the packet are read in this way, the packet is removed from the queue.

Note that these input and output instructions never [block](https://en.wikipedia.org/wiki/Blocking_(computing)). Specifically, output instructions do not wait for the sent packet to be received - the computer might send multiple packets before receiving any. Similarly, input instructions do not wait for a packet to arrive - if no packet is waiting, input instructions should receive `-1`.

Boot up all `50` computers and attach them to your network. _What is the `Y` value of the first packet sent to address `255`?_

-----------------

## --- Part Two ---

Packets sent to address `255` are handled by a device called a NAT (Not Always Transmitting). The NAT is responsible for managing power consumption of the network by blocking certain packets and watching for idle periods in the computers.

If a packet would be sent to address `255`, the NAT receives it instead. The NAT remembers only the _last_ packet it receives; that is, the data in each packet it receives overwrites the NAT's packet memory with the new packet's `X` and `Y` values.

The NAT also monitors all computers on the network. If all computers have _empty incoming packet queues_ and are _continuously trying to receive packets_ without sending packets, the network is considered _idle_.

Once the network is idle, the NAT sends _only the last packet it received_ to address `0`; this will cause the computers on the network to resume activity. In this way, the NAT can throttle power consumption of the network when the ship needs power in other areas.

Monitor packets released to the computer at address `0` by the NAT. _What is the first `Y` value delivered by the NAT to the computer at address `0` twice in a row?_
