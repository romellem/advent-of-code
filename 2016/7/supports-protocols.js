const SPLIT_RE = /(?:\[|\])/;
const BRACKET_GROUP = /\[(\w+)\]/g;

const ABBA_RE = /(\w)(\w)\2\1/;
const strContainsABBA = str => {
    let [match, a, b] = str.match(ABBA_RE) || [];
    return match && a !== b;
};

const ABA_RE = /(\w)(\w)\1/g;
const reverseABAMatch = str => {
    let [a, b] = str;
    return b + a + b;
};
const strContainsABA = str => {
    let matches = [];
    for (let i = 0; i < str.length - 2; i++) {
        let a = str[i];
        let b = str[i + 1];
        let _a = str[i + 2];

        if (a === _a && a !== b) {
            matches.push(a + b + a);
        }
    }

    return matches.length ? matches : false;
};

const supportTLS = ip => {
    let chunks = ip.split(SPLIT_RE);
    let bracket_chunks = ip.match(BRACKET_GROUP).map(c => c.substr(1, c.length - 2));
    chunks = chunks.filter(c => !bracket_chunks.includes(c));

    return chunks.some(c => strContainsABBA(c)) && bracket_chunks.every(c => !strContainsABBA(c));
};

const supportSSL = ip => {
    let chunks = ip.split(SPLIT_RE);
    let bracket_chunks = ip.match(BRACKET_GROUP).map(c => c.substr(1, c.length - 2));
    chunks = chunks.filter(c => !bracket_chunks.includes(c));

    let chunks_aba = chunks.map(c => strContainsABA(c)).filter(v => v).flat();
    let bracket_chunks_aba = bracket_chunks.map(c => strContainsABA(c)).filter(v => v).flat();
    if (chunks_aba.length > 0 && bracket_chunks_aba.length > 0) {
        for (let i = 0; i < chunks_aba.length; i++) {
            let a = chunks_aba[i];
            for (let j = 0; j < bracket_chunks_aba.length; j++) {
                let b = bracket_chunks_aba[j];

                if (reverseABAMatch(a) === b) {
                    return true;
                }
            }
        }
    }

    // If we are here, it doesn't support "SSL"
    return false;
};

module.exports = {
    supportTLS,
    supportSSL,
};
