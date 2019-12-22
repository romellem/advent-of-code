Here is dicussion on a [reddit post](https://redd.it/ee56wh), with a comment explaining an alternate approach to solving this that doesn't require Number Theory knowledge. [Jump to the explanation on the alternate approach](#another-approach).

# [2019 Day 22 Part 2] So what's the purpose of this puzzle, exactly? + Feedback

From the sidebar:

> programming puzzles for a variety of skill sets and skill levels ... Code should be fun ... AoC is a fun, non-threatening way to work ...

Doing AoC rarely upsets me, and I think it should _not_ be an upsetting affair (unless of course one aims for the leaderboard) --- but this puzzle really takes the cake. Are we really expecting people to be fluent with university-level math to be able to do this puzzle? Oh, but you say: you can just google the algorithm and implement it!

Then I ask:

1.  is AoC a programming challenge or a googling challenge?
    
2.  AoC should feel like a net gain for one's programming/optimisation/problem-solving skills. Is copying an algorithm really a way to learn these skills?
    
3.  Modulo arithmetic is not intuitive, especially when dealing with congruences and modular inverses. I just took a discrete maths class this semester, and I was completely unable to wrap my head around that topic, and I don't expect the average programmer to be able to do something like that easily either. As someone else said in the solution thread, I think the main demographic of these puzzles are people who are (mostly) self-taught, with _practical_ programming skills --- not mathematicians.
    

At the end of the day, this isn't an optimisation problem, nor a pattern-finding problem, nor a disassemble-the-assembly-and-implement-it-yourself puzzle. It's a maths problem. This isn't Advent of Math. The icing on the cake, of course, is that you need to go fetch some bigint library to do this, because doing the multiplications naively result in u64 overflows (or so I heard).

as [/u/jrfondren](/u/jrfondren) said very nicely:

> after you spoil someone who couldn't get it, they will be angry. There was no possible way to do it at all. All the time they put into thinking about the problem was wasted, and any further time would've been wasted as well.

Feedback:

I really enjoyed AoC from 2015-2017 -- even though I was a far worse programmer back then than I am now. I had some troubles with the graph-search related problems (notably the one with lifts and things that couldn't be on the same floor), but it was fun. For me, 2018 had obtuse puzzles that were more about implementing a very specific specification than any "real" problem solving (recall day 15).

This year has been quite fun (the recurring intcode puzzles were a bit off-putting at first, but there were some stand-out puzzles -- like the breakout one, the donut one was a fun twist on maze-search without an explosive problem space) -- but I felt like I had to say something about this puzzle.

I get that topaz is trying to come up with more creative puzzles, under the impression that we don't want the "same old boring stuff" from past years. But my gut feeling after doing this for 5 years is that everything is getting more and more contrived for no real reason.

Just my 2 cents.

EDIT: for the benefit of people seeing this later, here are the main points myself and others have made:

1.  solving today's puzzle without explicit knowledge of modular arithmetic is nigh impossible. [/u/MegaGreenLightning](/u/MegaGreenLightning) has shown that it is not _actually_ impossible — y'all should read their post. For (most) other days, a naive implementation of DFS or BFS will get you a solution for the graph problems, even if it runs slow — not the case for today.
    
2.  modular arithmetic is not "common knowledge" among programmers, especially those that are self-taught or below undergrad level of education. not gonna split hairs about specific people's specific experiences. Other things that are perhaps not so common are generally led-up-to (eg. intcode), explicitly mentioned (see point 3), or are common components of prior AoC puzzles.
    
3.  the puzzle gives no hints, nor mentions explicitly by name, modular arithmetic. it is very difficult to search for this kind of thing without knowledge of what exactly it is. contrast this with things like pathfinding, or angles between points, which will get you BFS or A\* or atan2 in the first 5 results even with vague queries like "maze shortest path".
    
4.  AoC is, eponymously, advent of _Code_, and the puzzles should be focused on programming challenges — datastructures, algorithms, optimisation, etc. It is not a maths puzzle, and it shouldn't be one. this is my opinion, but I'd wager most people would stick to project euler for maths challenges.
    
5.  people who insist that this puzzle was easy are speaking from the high ground a position of knowledge. objectively, looking at the statistics, this has been one of the hardest puzzles of the year, if not of the past 4 years. there's nothing wrong with knowing exactly how to approach this problem, but it's disingenuous to expect that everybody who wants to have fun with AoC during the holidays has the same background.
    
6.  at the end of the day, we're all doing AoC to have fun, and i'm sure we all appreciate some free puzzles to nudge our brains on. this post is feedback that i personally, and some others, did not in fact find this fun, nor rewarding, to solve. it is _not_ a whiny complaint session.

-----

> [_source_](https://www.reddit.com/r/adventofcode/comments/ee56wh/2019_day_22_part_2_so_whats_the_purpose_of_this/fbr0vjb/)  
> [_Go code_](https://github.com/GreenLightning/aoc19/blob/ed5de84/day22/main.go)

## Another Approach

I disagree. As a disclaimer, I have 3 university math classes under my belt, BUT I solved it without seeing the connection between the puzzle and the math (might be caused by still being half-asleep when the puzzle is released at 6:00 AM local time...) and without any googling or looking at reddit or whatever. It was quite a surprise when I looked at the solution thread after I solved the puzzle.

My thought process for part 2 went something like this:

First, try allocating an array to hold one large deck of space cards. This fails horribly.

Try to find a repeating pattern after a short number of iterations, which also fails eventually. Experiment with small decks (~ 10 cards) and up to 100 iterations. Notice that the deck becomes sorted again after (count - 1) iterations (count being the number of cards in the deck), but that does not help because count is even bigger than the number of iterations.

Being more methodical, try to combine shuffles together, so we do not have to do so many of them.

Shuffles of the same kind can be combined quite easily (in each rule, the shuffles below the line have the same effect as the shuffles above the line):

    deal into new stack
    deal into new stack
    -------------------
    nothing
    
    cut x
    cut y
    ---
    cut (x+y) % count
    
    deal with increment x
    deal with increment y
    ---
    deal with increment (x*y) % count
    

(I am using the modulo operator here, but this can also be replaced by an if statement checking if the result is greater than the number of cards in the deck. I think it is easy to see that if you cut a deck of 10 by 8 and then by 7 you cut the whole deck around once and it is the same as if you cut once by 5 = 15 - 10. I hope you agree.)

But what about shuffles of different kinds? I don't see a way to combine them (at least I didn't at the time), but can we reorder them?

    deal into new stack
    cut x
    -------------------
    cut count-x
    deal into new stack
    

If you want to cut before you "reverse the deck", you have to cut the other chunk of cards. Now on to the other possibilities...

...

(1 hour later...)

    cut x
    deal with increment y
    ---
    deal with increment y
    cut (x*y) % count
    
    deal into new stack
    deal with increment x
    ---
    deal with increment x
    cut -(x-1) = count+1-x
    deal into new stack
    

(The last rule was found mainly by experimentation on small example decks of size 11 and 17.)

With these rules we can write a function that reorders shuffles to sort them by type and then combine the shuffles of each type. It returns a list with at most three shuffles (one of each kind) that has the same effect as an arbitrary long input list.

Now we have to deal with the fact that we have so many iterations. But we can reduce the input list of 100 shuffles to 3. We can also repeat it twice and then reduce the 6 to 3 again! These 3 have the same effect as 200 shuffles. Therefore we can double the effective number of shuffles/iterations without our list of shuffles getting longer. Doing some doublings we can create lists that represent 1 iteration, 2 iterations, 4 iterations, 8 iterations, ... and so on and build out the correct number of iterations from there (this is basically exponentiation by squaring).

Now we have three shuffles representing the gazillion of iterations we have to perform. How do we actually find out what number ends up at position 2020?

Fumble around with inverting the shuffles, but get stuck at the "deal with increment" shuffle (I really wish I would have thought of the modular inverse here, which I definitely know, but I didn't).

Remember the fact, that the deck becomes sorted again after (count - 1) iterations. Assume we start at our target number of iterations and do the remaining (count - target - 1) iterations while following the card at position 2020. Since the deck is sorted again at this point, the position will equal the card number. Implement this approach and get the right answer after a lot of debugging. (I do not have to invert anything, I only calculate how a shuffle changes a cards position in the forward direction).

-----

So there you have it. If you are interest, you can find my cleaned up code [here](https://github.com/GreenLightning/aoc19/blob/master/day22/main.go). It's not as elegant as the "mathy" solutions, but it works.

I still don't know why the deck becomes sorted again after (count - 1) iterations and not some even larger number (say the number of all permutations of count cards or something), but it certainly does. If anyone knows why, please let me know.

To get back to your post:

> Are we really expecting people to be fluent with university-level math to be able to do this puzzle?

I don't think you have to know university level math to be able to solve the puzzle (although if someone had told me what math to use, I probably could have solved it a lot faster).

> Is AoC a programming challenge or a googling challenge? AoC should feel like a net gain for one's programming/optimisation/problem-solving skills. Is copying an algorithm really a way to learn these skills?

You don't have to google if you don't want to. I think I improved my problem-solving skills by thinking hard about this puzzle. I also felt humbled after seeing the other solutions, which were certainly smarter than mine.

> Modulo arithmetic is not intuitive, especially when dealing with congruences and modular inverses. At the end of the day, this isn't an optimisation problem, nor a pattern-finding problem, nor a disassemble-the-assembly-and-implement-it-yourself puzzle. It's a maths problem. This isn't Advent of Math.

This is a subjective statement. Not every puzzle can be for everyone. But I think you should not exclude math from the list, as math is basically the core foundation of computer science. I think a math puzzle is fine.

> This year has been quite fun (the recurring intcode puzzles were a bit off-putting at first, but there were some stand-out puzzles -- like the breakout one, the donut one was a fun twist on maze-search without an explosive problem space) -- but I felt like I had to say something about this puzzle. I get that topaz is trying to come up with more creative puzzles, under the impression that we don't want the "same old boring stuff" from past years. But my gut feeling after doing this for 5 years is that everything is getting more and more contrived for no real reason.

I think a big part of the fun is that the difficulty level is not linear and each year has a few kicker problems that are really hard.
