const lookAndSay = num => {
    num_array = String(num).split('');

    // `.pop()` is much faster than `.shift()` for large arrays,
    // so reverse our array first to take advantage of that fact
    num_array.reverse();

    let said_nums = '';

    while (num_array.length) {
        let first = num_array.pop();
        let accumulated = first;
        while (num_array[num_array.length - 1] === first) {
            accumulated += num_array.pop();
        }

        said_nums += accumulated.length + first;
    }

    return said_nums;
};

module.exports = lookAndSay;
