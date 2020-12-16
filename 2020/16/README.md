# Answers

|  Part 1 |     Part 2     |
| ------- | -------------- |
| `21081` | `314360510573` |

## --- Day 16: Ticket Translation ---

As you're walking to yet another connecting flight, you realize that one of the legs of your re-routed trip coming up is on a high-speed train. However, the train ticket you were given is in a language you don't understand. You should probably figure out what it says before you get to the train station after the next flight.

Unfortunately, you can't actually _read_ the words on the ticket. You can, however, read the numbers, and so you figure out _the fields these tickets must have_ and _the valid ranges_ for values in those fields.

You collect the _rules for ticket fields_, the _numbers on your ticket_, and the _numbers on other nearby tickets_ for the same train service (via the airport security cameras) together into a single document you can reference (your puzzle input).

The _rules for ticket fields_ specify a list of fields that exist _somewhere_ on the ticket and the _valid ranges of values_ for each field. For example, a rule like `class: 1-3 or 5-7` means that one of the fields in every ticket is named `class` and can be any value in the ranges `1-3` or `5-7` (inclusive, such that `3` and `5` are both valid in this field, but `4` is not).

Each ticket is represented by a single line of comma-separated values. The values are the numbers on the ticket in the order they appear; every ticket has the same format. For example, consider this ticket:

    .--------------------------------------------------------.
    | ????: 101    ?????: 102   ??????????: 103     ???: 104 |
    |                                                        |
    | ??: 301  ??: 302             ???????: 303      ??????? |
    | ??: 401  ??: 402           ???? ????: 403    ????????? |
    '--------------------------------------------------------'
    

Here, `?` represents text in a language you don't understand. This ticket might be represented as `101,102,103,104,301,302,303,401,402,403`; of course, the actual train tickets you're looking at are _much_ more complicated. In any case, you've extracted just the numbers in such a way that the first number is always the same specific field, the second number is always a different specific field, and so on - you just don't know what each position actually means!

Start by determining which tickets are _completely invalid_; these are tickets that contain values which _aren't valid for any field_. Ignore _your ticket_ for now.

For example, suppose you have the following notes:

<pre><code>class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,<b>4</b>,50
<b>55</b>,2,20
38,6,<b>12</b>
</code></pre>

It doesn't matter which position corresponds to which field; you can identify invalid _nearby tickets_ by considering only whether tickets contain _values that are not valid for any field_. In this example, the values on the first _nearby ticket_ are all valid for at least one field. This is not true of the other three _nearby tickets_: the values `4`, `55`, and `12` are are not valid for any field. Adding together all of the invalid values produces your _ticket scanning error rate_: `4 + 55 + 12` = _`71`_.

Consider the validity of the _nearby tickets_ you scanned. _What is your ticket scanning error rate?_

-----------------

## --- Part Two ---

Now that you've identified which tickets contain invalid values, _discard those tickets entirely_. Use the remaining valid tickets to determine which field is which.

Using the valid ranges for each field, determine what order the fields appear on the tickets. The order is consistent between all tickets: if `seat` is the third field, it is the third field on every ticket, including _your ticket_.

For example, suppose you have the following notes:

    class: 0-1 or 4-19
    row: 0-5 or 8-19
    seat: 0-13 or 16-19
    
    your ticket:
    11,12,13
    
    nearby tickets:
    3,9,18
    15,1,5
    5,14,9
    

Based on the _nearby tickets_ in the above example, the first position must be `row`, the second position must be `class`, and the third position must be `seat`; you can conclude that in _your ticket_, `class` is `12`, `row` is `11`, and `seat` is `13`.

Once you work out which field is which, look for the six fields on _your ticket_ that start with the word `departure`. _What do you get if you multiply those six values together?_
