module.exports = {
    sampleInput: [
        { op: 'inc', register: 'a' },   // 0
{ op: 'jio', register: 'a', jump: +2 }, // 1
        { op: 'tpl', register: 'a' },   // 2
        { op: 'inc', register: 'a' },   // 3
    ],
    input: [
        { op: 'jio', register: 'a', jump: +16 },  // 0
        { op: 'inc', register: 'a' }, // . . . . . . 1
        { op: 'inc', register: 'a' }, // . . . . . . 2
        { op: 'tpl', register: 'a' }, // . . . . . . 3
        { op: 'tpl', register: 'a' }, // . . . . . . 4
        { op: 'tpl', register: 'a' }, // . . . . . . 5
        { op: 'inc', register: 'a' }, // . . . . . . 6
        { op: 'inc', register: 'a' }, // . . . . . . 7
        { op: 'tpl', register: 'a' }, // . . . . . . 8
        { op: 'inc', register: 'a' }, // . . . . . . 9
        { op: 'inc', register: 'a' }, // . . . . . . 10
        { op: 'tpl', register: 'a' }, // . . . . . . 11
        { op: 'tpl', register: 'a' }, // . . . . . . 12
        { op: 'tpl', register: 'a' }, // . . . . . . 13
        { op: 'inc', register: 'a' }, // . . . . . . 14
        { op: 'jmp', jump: +23 },     // . . . . . . 15
        { op: 'tpl', register: 'a' }, // . . . . . . 16
        { op: 'inc', register: 'a' }, // . . . . . . 17
        { op: 'inc', register: 'a' }, // . . . . . . 18
        { op: 'tpl', register: 'a' }, // . . . . . . 19
        { op: 'inc', register: 'a' }, // . . . . . . 20
        { op: 'inc', register: 'a' }, // . . . . . . 21
        { op: 'tpl', register: 'a' }, // . . . . . . 22
        { op: 'tpl', register: 'a' }, // . . . . . . 23
        { op: 'inc', register: 'a' }, // . . . . . . 24
        { op: 'inc', register: 'a' }, // . . . . . . 25
        { op: 'tpl', register: 'a' }, // . . . . . . 26
        { op: 'inc', register: 'a' }, // . . . . . . 27
        { op: 'tpl', register: 'a' }, // . . . . . . 28
        { op: 'inc', register: 'a' }, // . . . . . . 29
        { op: 'tpl', register: 'a' }, // . . . . . . 30
        { op: 'inc', register: 'a' }, // . . . . . . 31
        { op: 'inc', register: 'a' }, // . . . . . . 32
        { op: 'tpl', register: 'a' }, // . . . . . . 33
        { op: 'inc', register: 'a' }, // . . . . . . 34
        { op: 'tpl', register: 'a' }, // . . . . . . 35
        { op: 'tpl', register: 'a' }, // . . . . . . 36
        { op: 'inc', register: 'a' }, // . . . . . . 37
        { op: 'jio', register: 'a', jump: +8 }, // . 38
        { op: 'inc', register: 'b' }, // . . . . . . 39
        { op: 'jie', register: 'a', jump: +4 }, // . 40
        { op: 'tpl', register: 'a' }, // . . . . . . 41
        { op: 'inc', register: 'a' }, // . . . . . . 42
        { op: 'jmp', jump: +2 },      // . . . . . . 43
        { op: 'hlf', register: 'a' }, // . . . . . . 44
        { op: 'jmp', jump: -7 },      // . . . . . . 45
    ],
};
