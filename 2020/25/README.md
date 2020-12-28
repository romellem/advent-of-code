# Answers

|   Part 1  |
| --------- |
| `3217885` |

## --- Day 25: Combo Breaker ---

You finally reach the check-in desk. Unfortunately, their registration systems are currently offline, and they cannot check you in. Noticing the look on your face, they quickly add that tech support is already on the way! They even created all the room keys this morning; you can take yours now and give them your room deposit once the registration system comes back online.

The room key is a small [RFID](https://en.wikipedia.org/wiki/Radio-frequency_identification) card. Your room is on the 25th floor and the elevators are also temporarily out of service, so it takes what little energy you have left to even climb the stairs and navigate the halls. You finally reach the door to your room, swipe your card, and - _beep_ - the light turns red.

Examining the card more closely, you discover a phone number for tech support.

"Hello! How can we help you today?" You explain the situation.

"Well, it sounds like the card isn't sending the right command to unlock the door. If you go back to the check-in desk, surely someone there can reset it for you." Still catching your breath, you describe the status of the elevator and the exact number of stairs you just had to climb.

"I see! Well, your only other option would be to reverse-engineer the cryptographic handshake the card does with the door and then inject your own commands into the data stream, but that's definitely impossible." You thank them for their time.

Unfortunately for the door, you know a thing or two about cryptographic handshakes.

The handshake used by the card and the door involves an operation that _transforms_ a _subject number_. To transform a subject number, start with the value `1`. Then, a number of times called the _loop size_, perform the following steps:

*   Set the value to itself multiplied by the _subject number_.
*   Set the value to the remainder after dividing the value by _`20201227`_.

The card always uses a specific, secret _loop size_ when it transforms a subject number. The door always uses a different, secret loop size.

The cryptographic handshake works like this:

*   The _card_ transforms the subject number of _`7`_ according to the _card's_ secret loop size. The result is called the _card's public key_.
*   The _door_ transforms the subject number of _`7`_ according to the _door's_ secret loop size. The result is called the _door's public key_.
*   The card and door use the wireless RFID signal to transmit the two public keys (your puzzle input) to the other device. Now, the _card_ has the _door's_ public key, and the _door_ has the _card's_ public key. Because you can eavesdrop on the signal, you have both public keys, but neither device's loop size.
*   The _card_ transforms the subject number of _the door's public key_ according to the _card's_ loop size. The result is the _encryption key_.
*   The _door_ transforms the subject number of _the card's public key_ according to the _door's_ loop size. The result is the same _encryption key_ as the _card_ calculated.

If you can use the two public keys to determine each device's loop size, you will have enough information to calculate the secret _encryption key_ that the card and door use to communicate; this would let you send the `unlock` command directly to the door!

For example, suppose you know that the card's public key is `5764801`. With a little trial and error, you can work out that the card's loop size must be _`8`_, because transforming the initial subject number of `7` with a loop size of `8` produces `5764801`.

Then, suppose you know that the door's public key is `17807724`. By the same process, you can determine that the door's loop size is _`11`_, because transforming the initial subject number of `7` with a loop size of `11` produces `17807724`.

At this point, you can use either device's loop size with the other device's public key to calculate the _encryption key_. Transforming the subject number of `17807724` (the door's public key) with a loop size of `8` (the card's loop size) produces the encryption key, _`14897079`_. (Transforming the subject number of `5764801` (the card's public key) with a loop size of `11` (the door's loop size) produces the same encryption key: _`14897079`_.)

_What encryption key is the handshake trying to establish?_

-----------------

## --- Part Two ---

The light turns green and the door unlocks. As you collapse onto the bed in your room, your pager goes off!

"It's an emergency!" the Elf calling you explains. "The [soft serve](https://en.wikipedia.org/wiki/Soft_serve) machine in the cafeteria on sub-basement 7 just failed and you're the only one that knows how to fix it! We've already dispatched a reindeer to your location to pick you up."

You hear the sound of hooves landing on your balcony.

The reindeer carefully explores the contents of your room while you figure out how you're going to pay the _50 stars_ you owe the resort before you leave. Noticing that you look concerned, the reindeer wanders over to you; you see that it's carrying a small pouch.

"Sorry for the trouble," a note in the pouch reads. Sitting at the bottom of the pouch is a gold coin with a little picture of a starfish on it.

Looks like you only needed _49 stars_ after all.

### Deposit Stars

You spend all ⭐️ **fifty stars** ⭐️ to cover the room deposit!

As you fix the soft serve machine, Santa offers you a ride in his sleigh; maybe the resort has a chimney you can use...
