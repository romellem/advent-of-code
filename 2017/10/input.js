const PART_TWO_TWIST_END_CONCAT = [17, 31, 73, 47, 23];

module.exports = {
    sampleInput: {
        size: 5,
        twists: [3, 4, 1, 5],
    },
    input: {
        size: 256,
        twists: [130, 126, 1, 11, 140, 2, 255, 207, 18, 254, 246, 164, 29, 104, 0, 224],
    },
    inputTwo: {
        size: 256,
        twists: `130,126,1,11,140,2,255,207,18,254,246,164,29,104,0,224`
            .split('')
            .map(v => v.charCodeAt())
            .concat(PART_TWO_TWIST_END_CONCAT),
    },
};
