# Answers

|     Part 1      |      Part 2     |
| --------------- | --------------- |
| `5060053676136` | `9695042567249` |

# --- Day 6: Trash Compactor ---

After helping the Elves in the kitchen, you were taking a break and helping them re-enact a movie scene when you over-enthusiastically jumped into the garbage chute!

A brief fall later, you find yourself in a garbage smasher. Unfortunately, the door's been magnetically sealed.

As you try to find a way out, you are approached by a family of cephalopods! They're pretty sure they can get the door open, but it will take some time. While you wait, they're curious if you can help the youngest cephalopod with her [math homework](https://adventofcode.com/2021/day/18).

Cephalopod math doesn't look that different from normal math. The math worksheet (your puzzle input) consists of a list of _problems_; each problem has a group of numbers that need to be either _added_ (`+`) or _multiplied_ (`*`) together.

However, the problems are arranged a little strangely; they seem to be presented next to each other in a very long horizontal list. For example:

    123 328  51 64 
     45 64  387 23 
      6 98  215 314
    *   +   *   +  
    

Each problem's numbers are arranged vertically; at the bottom of the problem is the symbol for the operation that needs to be performed. Problems are separated by a full column of only spaces. The left/right alignment of numbers within each problem can be ignored.

So, this worksheet contains four problems:

*   `123` \* `45` \* `6` = _`33210`_
*   `328` + `64` + `98` = _`490`_
*   `51` \* `387` \* `215` = _`4243455`_
*   `64` + `23` + `314` = _`401`_

To check their work, cephalopod students are given the _grand total_ of adding together all of the answers to the individual problems. In this worksheet, the grand total is `33210` + `490` + `4243455` + `401` = _`4277556`_.

Of course, the actual worksheet is _much_ wider. You'll need to make sure to unroll it completely so that you can read the problems clearly.

Solve the problems on the math worksheet. _What is the grand total found by adding together all of the answers to the individual problems?_

-----------------

## --- Part Two ---

The big cephalopods come back to check on how things are going. When they see that your grand total doesn't match the one expected by the worksheet, they realize they forgot to explain how to read cephalopod math.

Cephalopod math is written _right-to-left in columns_. Each number is given in its own column, with the most significant digit at the top and the least significant digit at the bottom. (Problems are still separated with a column consisting only of spaces, and the symbol at the bottom of the problem is still the operator to use.)

Here's the example worksheet again:

    123 328  51 64 
     45 64  387 23 
      6 98  215 314
    *   +   *   +  
    

Reading the problems right-to-left one column at a time, the problems are now quite different:

*   The rightmost problem is `4` + `431` + `623` = _`1058`_
*   The second problem from the right is `175` \* `581` \* `32` = _`3253600`_
*   The third problem from the right is `8` + `248` + `369` = _`625`_
*   Finally, the leftmost problem is `356` \* `24` \* `1` = _`8544`_

Now, the grand total is `1058` + `3253600` + `625` + `8544` = _`3263827`_.

Solve the problems on the math worksheet again. _What is the grand total found by adding together all of the answers to the individual problems?_
