# Answers

| Part 1 |
|--------|
| `4287` |

## --- Day 25: The Halting Problem ---

Following the twisty passageways deeper and deeper into the CPU, you finally reach the core of the computer. Here, in the expansive central chamber, you find a grand apparatus that fills the entire room, suspended nanometers above your head.

You had always imagined CPUs to be noisy, chaotic places, bustling with activity. Instead, the room is quiet, motionless, and dark.

Suddenly, you and the CPU's _garbage collector_ startle each other. "It's not often we get many visitors here!", he says. You inquire about the stopped machinery.

"It stopped milliseconds ago; not sure why. I'm a garbage collector, not a doctor." You ask what the machine is for.

"Programs these days, don't know their origins. That's the _Turing machine_! It's what makes the whole computer work." You try to explain that Turing machines are merely models of computation, but he cuts you off. "No, see, that's just what they _want_ you to think. Ultimately, inside every CPU, there's a Turing machine driving the whole thing! Too bad this one's broken. [We're doomed!](https://www.youtube.com/watch?v=cTwZZz0HV8I)"

You ask how you can help. "Well, unfortunately, the only way to get the computer running again would be to create a whole new Turing machine from scratch, but there's no _way_ you can-" He notices the look on your face, gives you a curious glance, shrugs, and goes back to sweeping the floor.

You find the _Turing machine blueprints_ (your puzzle input) on a tablet in a nearby pile of debris. Looking back up at the broken Turing machine above, you can start to identify its parts:

*   A _tape_ which contains `0` repeated infinitely to the left and right.
*   A _cursor_, which can move left or right along the tape and read or write values at its current position.
*   A set of _states_, each containing rules about what to do based on the current value under the cursor.

Each slot on the tape has two possible values: `0` (the starting value for all slots) and `1`. Based on whether the cursor is pointing at a `0` or a `1`, the current state says _what value to write_ at the current position of the cursor, whether to _move the cursor_ left or right one slot, and _which state to use next_.

For example, suppose you found the following blueprint:

    Begin in state A.
    Perform a diagnostic checksum after 6 steps.
    
    In state A:
      If the current value is 0:
        - Write the value 1.
        - Move one slot to the right.
        - Continue with state B.
      If the current value is 1:
        - Write the value 0.
        - Move one slot to the left.
        - Continue with state B.
    
    In state B:
      If the current value is 0:
        - Write the value 1.
        - Move one slot to the left.
        - Continue with state A.
      If the current value is 1:
        - Write the value 1.
        - Move one slot to the right.
        - Continue with state A.
    

Running it until the number of steps required to take the listed _diagnostic checksum_ would result in the following tape configurations (with the _cursor_ marked in square brackets):

    ... 0  0  0 [0] 0  0 ... (before any steps; about to run state A)
    ... 0  0  0  1 [0] 0 ... (after 1 step;     about to run state B)
    ... 0  0  0 [1] 1  0 ... (after 2 steps;    about to run state A)
    ... 0  0 [0] 0  1  0 ... (after 3 steps;    about to run state B)
    ... 0 [0] 1  0  1  0 ... (after 4 steps;    about to run state A)
    ... 0  1 [1] 0  1  0 ... (after 5 steps;    about to run state B)
    ... 0  1  1 [0] 1  0 ... (after 6 steps;    about to run state A)
    

The CPU can confirm that the Turing machine is working by taking a _diagnostic checksum_ after a specific number of steps (given in the blueprint). Once the specified number of steps have been executed, the Turing machine should pause; once it does, count the number of times `1` appears on the tape. In the above example, the _diagnostic checksum_ is _`3`_.

Recreate the Turing machine and save the computer! _What is the diagnostic checksum_ it produces once it's working again?
