
const SPLIT_RE = /(?:\[|\])/;
const BRACKET_GROUP = /(\[\w+\])/g;

const MIRROR_RE = /(\w)(\w)\2\1/;
const strContainsMirroredPart = str => {
    let [match, a, b] = str.match(MIRROR_RE) || [];
    return match && a !== b;
};

const supportTLS = ip => {
    let chunks = ip.split(SPLIT_RE);
    let bracket_chunks = ip.match(BRACKET_GROUP);
    chunks = chunks.filter(c => !bracket_chunks.includes(c));

    return (
        chunks.some(c => strContainsMirroredPart(c)) &&
        bracket_chunks.every(c => !strContainsMirroredPart(c))
    );
};

module.exports = supportTLS;
