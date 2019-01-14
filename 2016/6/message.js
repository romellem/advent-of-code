const _getSortedLetterFrequencies = codes => {
    let cols = Array(codes[0].length)
        .fill()
        .map(c => {
            return {};
        });

    codes.forEach(code => {
        let letters = code.split('');
        letters.forEach((c, i) => {
            if (!cols[i][c]) {
                cols[i][c] = 0;
            }

            cols[i][c] += 1;
        });
    });

    let sorted_entires = cols.map(col => {
        let col_array = Object.entries(col);
        col_array.sort((a, b) => {
            if (a[1] < b[1]) return -1;
            else if (a[1] > b[1]) return 1;
            else return 0;
        });

        return col_array;
    });

    return sorted_entires;
};

const getMostCommonLetterInEachColumn = codes => {
    let sorted_entries = _getSortedLetterFrequencies(codes);

    let most_common_letters = sorted_entries.map(list => {
        return list.pop()[0];
    });

    return most_common_letters.join('');
};

const getLeastCommonLetterInEachColumn = codes => {
    let sorted_entries = _getSortedLetterFrequencies(codes);

    let most_common_letters = sorted_entries.map(list => {
        return list.shift()[0];
    });

    return most_common_letters.join('');
};

module.exports = {
    getMostCommonLetterInEachColumn,
    getLeastCommonLetterInEachColumn,
};
