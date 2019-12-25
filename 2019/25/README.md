# Answers

|   Part 1   |   Part 2    |
|------------|-------------|
| ` ` | ` ` |

## --- Day 25: Cryostasis ---

As you approach Santa's ship, your sensors report two important details:

First, that you might be too late: the internal temperature is `-40` degrees.

Second, that one faint life signature is somewhere on the ship.

The airlock door is locked with a code; your best option is to send in a small droid to investigate the situation. You attach your ship to Santa's, break a small hole in the hull, and let the droid run in before you seal it up again. Before your ship starts freezing, you detach your ship and set it to automatically stay within range of Santa's ship.

This droid can follow basic instructions and report on its surroundings; you can communicate with it through an [Intcode](9) program (your puzzle input) running on an [ASCII-capable](17) computer.

As the droid moves through its environment, it will describe what it encounters. When it says `Command?`, you can give it a single instruction terminated with a newline (ASCII code `10`). Possible instructions are:

*   _Movement_ via `north`, `south`, `east`, or `west`.
*   To _take_ an item the droid sees in the environment, use the command `take <name of item>`. For example, if the droid reports seeing a `red ball`, you can pick it up with `take red ball`.
*   To _drop_ an item the droid is carrying, use the command `drop <name of item>`. For example, if the droid is carrying a `green ball`, you can drop it with `drop green ball`.
*   To get a _list of all of the items_ the droid is currently carrying, use the command `inv` (for "inventory").

Extra spaces or other characters aren't allowed - instructions must be provided precisely.

Santa's ship is a _Reindeer-class starship_; these ships use pressure-sensitive floors to determine the identity of droids and crew members. The standard configuration for these starships is for all droids to weigh exactly the same amount to make them easier to detect. If you need to get past such a sensor, you might be able to reach the correct weight by carrying items from the environment.

Look around the ship and see if you can find the _password for the main airlock_.
