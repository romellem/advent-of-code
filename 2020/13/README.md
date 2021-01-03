# Answers

| Part 1 | Part 2 |
| ------ | ------ |
| ` ` | ` ` |

## --- Day 13: Shuttle Search ---

Your ferry can make it safely to a nearby port, but it won't get much further. When you call to book another ship, you discover that no ships embark from that port to your vacation island. You'll need to get from the port to the nearest airport.

Fortunately, a shuttle bus service is available to bring you from the sea port to the airport! Each bus has an ID number that also indicates _how often the bus leaves for the airport_.

Bus schedules are defined based on a _timestamp_ that measures the _number of minutes_ since some fixed reference point in the past. At timestamp `0`, every bus simultaneously departed from the sea port. After that, each bus travels to the airport, then various other locations, and finally returns to the sea port to repeat its journey forever.

The time this loop takes a particular bus is also its ID number: the bus with ID `5` departs from the sea port at timestamps `0`, `5`, `10`, `15`, and so on. The bus with ID `11` departs at `0`, `11`, `22`, `33`, and so on. If you are there when the bus departs, you can ride that bus to the airport!

Your notes (your puzzle input) consist of two lines. The first line is your estimate of the _earliest timestamp you could depart on a bus_. The second line lists the bus IDs that are in service according to the shuttle company; entries that show `x` must be out of service, so you decide to ignore them.

To save time once you arrive, your goal is to figure out _the earliest bus you can take to the airport_. (There will be exactly one such bus.)

For example, suppose you have the following notes:

    939
    7,13,x,x,59,x,31,19
    

Here, the earliest timestamp you could depart is `939`, and the bus IDs in service are `7`, `13`, `59`, `31`, and `19`. Near timestamp `939`, these bus IDs depart at the times marked `D`:

<pre><code>time   bus 7   bus 13  bus 59  bus 31  bus 19
929      .       .       .       .       .
930      .       .       .       D       .
931      D       .       .       .       D
932      .       .       .       .       .
933      .       .       .       .       .
934      .       .       .       .       .
935      .       .       .       .       .
936      .       D       .       .       .
937      .       .       .       .       .
938      D       .       .       .       .
<b>939      .       .       .       .       .</b>
940      .       .       .       .       .
941      .       .       .       .       .
942      .       .       .       .       .
943      .       .       .       .       .
<b>944      .       .       D       .       .</b>
945      D       .       .       .       .
946      .       .       .       .       .
947      .       .       .       .       .
948      .       .       .       .       .
949      .       D       .       .       .
</code></pre>

The earliest bus you could take is bus ID `59`. It doesn't depart until timestamp `944`, so you would need to wait `944 - 939 = 5` minutes before it departs. Multiplying the bus ID by the number of minutes you'd need to wait gives _`295`_.

_What is the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus?_

-----------------

## --- Part Two ---

The shuttle company is running a contest: one gold coin for anyone that can find the earliest timestamp such that the first bus ID departs at that time and each subsequent listed bus ID departs at that subsequent minute. (The first line in your input is no longer relevant.)

For example, suppose you have the same list of bus IDs as above:

    7,13,x,x,59,x,31,19

An `x` in the schedule means there are no constraints on what bus IDs must depart at that time.

This means you are looking for the earliest timestamp (called `t`) such that:

*   Bus ID `7` departs at timestamp `t`.
*   Bus ID `13` departs one minute after timestamp `t`.
*   There are no requirements or restrictions on departures at two or three minutes after timestamp `t`.
*   Bus ID `59` departs four minutes after timestamp `t`.
*   There are no requirements or restrictions on departures at five minutes after timestamp `t`.
*   Bus ID `31` departs six minutes after timestamp `t`.
*   Bus ID `19` departs seven minutes after timestamp `t`.

The only bus departures that matter are the listed bus IDs at their specific offsets from `t`. Those bus IDs can depart at other times, and other bus IDs can depart at those times. For example, in the list above, because bus ID `19` must depart seven minutes after the timestamp at which bus ID `7` departs, bus ID `7` will always _also_ be departing with bus ID `19` at seven minutes after timestamp `t`.

In this example, the earliest timestamp at which this occurs is _`1068781`_:

<pre><code>time     bus 7   bus 13  bus 59  bus 31  bus 19
1068773    .       .       .       .       .
1068774    D       .       .       .       .
1068775    .       .       .       .       .
1068776    .       .       .       .       .
1068777    .       .       .       .       .
1068778    .       .       .       .       .
1068779    .       .       .       .       .
1068780    .       .       .       .       .
<b>1068781</b>    <b>D</b>       .       .       .       .
<b>1068782</b>    .       <b>D</b>       .       .       .
<b>1068783</b>    .       .       .       .       .
<b>1068784</b>    .       .       .       .       .
<b>1068785</b>    .       .       <b>D</b>       .       .
<b>1068786</b>    .       .       .       .       .
<b>1068787</b>    .       .       .       <b>D</b>       .
<b>1068788</b>    D       .       .       .       <b>D</b>
1068789    .       .       .       .       .
1068790    .       .       .       .       .
1068791    .       .       .       .       .
1068792    .       .       .       .       .
1068793    .       .       .       .       .
1068794    .       .       .       .       .
1068795    D       D       .       .       .
1068796    .       .       .       .       .
1068797    .       .       .       .       .
</code></pre>

In the above example, bus ID `7` departs at timestamp `1068788` (seven minutes after `t`). This is fine; the only requirement on that minute is that bus ID `19` departs then, and it does.

Here are some other examples:

*   The earliest timestamp that matches the list `17,x,13,19` is _`3417`_.
*   `67,7,59,61` first occurs at timestamp _`754018`_.
*   `67,x,7,59,61` first occurs at timestamp _`779210`_.
*   `67,7,x,59,61` first occurs at timestamp _`1261476`_.
*   `1789,37,47,1889` first occurs at timestamp _`1202161486`_.

However, with so many bus IDs in your list, surely the actual earliest timestamp will be larger than `100000000000000`!

_What is the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list?_
