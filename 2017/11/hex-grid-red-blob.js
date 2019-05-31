// Generated code -- CC0 -- No Rights Reserved -- http://www.redblobgames.com/grids/hexagons/
// @see https://www.redblobgames.com/grids/hexagons/codegen/output/lib.js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Hex {
    constructor(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;
        if (Math.round(q + r + s) !== 0) throw 'q + r + s must be 0';
    }
    add(b) {
        return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
    }
    subtract(b) {
        return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
    }
    scale(k) {
        return new Hex(this.q * k, this.r * k, this.s * k);
    }
    rotateLeft() {
        return new Hex(-this.s, -this.q, -this.r);
    }
    rotateRight() {
        return new Hex(-this.r, -this.s, -this.q);
    }
    static direction(direction) {
        return Hex.directions[direction];
    }
    neighbor(direction) {
        return this.add(Hex.direction(direction));
    }
    diagonalNeighbor(direction) {
        return this.add(Hex.diagonals[direction]);
    }
    len() {
        return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
    }
    distance(b) {
        return this.subtract(b).len();
    }
    round() {
        var qi = Math.round(this.q);
        var ri = Math.round(this.r);
        var si = Math.round(this.s);
        var q_diff = Math.abs(qi - this.q);
        var r_diff = Math.abs(ri - this.r);
        var s_diff = Math.abs(si - this.s);
        if (q_diff > r_diff && q_diff > s_diff) {
            qi = -ri - si;
        } else if (r_diff > s_diff) {
            ri = -qi - si;
        } else {
            si = -qi - ri;
        }
        return new Hex(qi, ri, si);
    }
    lerp(b, t) {
        return new Hex(
            this.q * (1.0 - t) + b.q * t,
            this.r * (1.0 - t) + b.r * t,
            this.s * (1.0 - t) + b.s * t
        );
    }
    linedraw(b) {
        var N = this.distance(b);
        var a_nudge = new Hex(this.q + 0.000001, this.r + 0.000001, this.s - 0.000002);
        var b_nudge = new Hex(b.q + 0.000001, b.r + 0.000001, b.s - 0.000002);
        var results = [];
        var step = 1.0 / Math.max(N, 1);
        for (var i = 0; i <= N; i++) {
            results.push(a_nudge.lerp(b_nudge, step * i).round());
        }
        return results;
    }

    toString() {
        let { q, r, s } = this;
        return [q, r, s].join(',');
    }
}
Hex.directions = {
    n: new Hex(0, -1, 1),
    ne: new Hex(1, -1, 0),
    sw: new Hex(-1, 0, 1),
    s: new Hex(0, 1, -1),
    se: new Hex(1, 0, -1),
    nw: new Hex(-1, 1, 0),
};
Hex.diagonals = {
    e: new Hex(2, -1, -1),
    ne: new Hex(1, -2, 1),
    nw: new Hex(-1, -1, 2),
    w: new Hex(-2, 1, 1),
    sw: new Hex(-1, 2, -1),
    se: new Hex(1, 1, -2),
};

class OffsetCoord {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
    static qoffsetFromCube(offset, h) {
        var col = h.q;
        var row = h.r + (h.q + offset * (h.q & 1)) / 2;
        return new OffsetCoord(col, row);
    }
    static qoffsetToCube(offset, h) {
        var q = h.col;
        var r = h.row - (h.col + offset * (h.col & 1)) / 2;
        var s = -q - r;
        return new Hex(q, r, s);
    }
    static roffsetFromCube(offset, h) {
        var col = h.q + (h.r + offset * (h.r & 1)) / 2;
        var row = h.r;
        return new OffsetCoord(col, row);
    }
    static roffsetToCube(offset, h) {
        var q = h.col - (h.row + offset * (h.row & 1)) / 2;
        var r = h.row;
        var s = -q - r;
        return new Hex(q, r, s);
    }
}
OffsetCoord.EVEN = 1;
OffsetCoord.ODD = -1;

class DoubledCoord {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
    static qdoubledFromCube(h) {
        var col = h.q;
        var row = 2 * h.r + h.q;
        return new DoubledCoord(col, row);
    }
    qdoubledToCube() {
        var q = this.col;
        var r = (this.row - this.col) / 2;
        var s = -q - r;
        return new Hex(q, r, s);
    }
    static rdoubledFromCube(h) {
        var col = 2 * h.q + h.r;
        var row = h.r;
        return new DoubledCoord(col, row);
    }
    rdoubledToCube() {
        var q = (this.col - this.row) / 2;
        var r = this.row;
        var s = -q - r;
        return new Hex(q, r, s);
    }
}

class Orientation {
    constructor(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
        this.f0 = f0;
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
        this.b0 = b0;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.start_angle = start_angle;
    }
}

class Layout {
    constructor(orientation, size, origin) {
        this.orientation = orientation;
        this.size = size;
        this.origin = origin;
    }
    hexToPixel(h) {
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
        var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
        return new Point(x + origin.x, y + origin.y);
    }
    pixelToHex(p) {
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        var q = M.b0 * pt.x + M.b1 * pt.y;
        var r = M.b2 * pt.x + M.b3 * pt.y;
        return new Hex(q, r, -q - r);
    }
    hexCornerOffset(corner) {
        var M = this.orientation;
        var size = this.size;
        var angle = (2.0 * Math.PI * (M.start_angle - corner)) / 6.0;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }
    polygonCorners(h) {
        var corners = [];
        var center = this.hexToPixel(h);
        for (var i = 0; i < 6; i++) {
            var offset = this.hexCornerOffset(i);
            corners.push(new Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    }
}
Layout.pointy = new Orientation(
    Math.sqrt(3.0),
    Math.sqrt(3.0) / 2.0,
    0.0,
    3.0 / 2.0,
    Math.sqrt(3.0) / 3.0,
    -1.0 / 3.0,
    0.0,
    2.0 / 3.0,
    0.5
);
Layout.flat = new Orientation(
    3.0 / 2.0,
    0.0,
    Math.sqrt(3.0) / 2.0,
    Math.sqrt(3.0),
    2.0 / 3.0,
    0.0,
    -1.0 / 3.0,
    Math.sqrt(3.0) / 3.0,
    0.0
);

class Tests {
    constructor() {}
    static equalHex(name, a, b) {
        if (!(a.q === b.q && a.s === b.s && a.r === b.r)) {
            console.log('FAIL', name);
        }
    }
    static equalOffsetcoord(name, a, b) {
        if (!(a.col === b.col && a.row === b.row)) {
            console.log('FAIL', name);
        }
    }
    static equalDoubledcoord(name, a, b) {
        if (!(a.col === b.col && a.row === b.row)) {
            console.log('FAIL', name);
        }
    }
    static equalInt(name, a, b) {
        if (!(a === b)) {
            console.log('FAIL', name);
        }
    }
    static equalHexArray(name, a, b) {
        Tests.equalInt(name, a.length, b.length);
        for (var i = 0; i < a.length; i++) {
            Tests.equalHex(name, a[i], b[i]);
        }
    }
    static testHexArithmetic() {
        Tests.equalHex('hex_add', new Hex(4, -10, 6), new Hex(1, -3, 2).add(new Hex(3, -7, 4)));
        Tests.equalHex('hex_subtract', new Hex(-2, 4, -2), new Hex(1, -3, 2).subtract(new Hex(3, -7, 4)));
    }
    static testHexDirection() {
        Tests.equalHex('hex_direction', new Hex(0, -1, 1), Hex.direction(2));
    }
    static testHexNeighbor() {
        Tests.equalHex('hex_neighbor', new Hex(1, -3, 2), new Hex(1, -2, 1).neighbor(2));
    }
    static testHexDiagonal() {
        Tests.equalHex('hex_diagonal', new Hex(-1, -1, 2), new Hex(1, -2, 1).diagonalNeighbor(3));
    }
    static testHexDistance() {
        Tests.equalInt('hex_distance', 7, new Hex(3, -7, 4).distance(new Hex(0, 0, 0)));
    }
    static testHexRotateRight() {
        Tests.equalHex('hex_rotate_right', new Hex(1, -3, 2).rotateRight(), new Hex(3, -2, -1));
    }
    static testHexRotateLeft() {
        Tests.equalHex('hex_rotate_left', new Hex(1, -3, 2).rotateLeft(), new Hex(-2, -1, 3));
    }
    static testHexRound() {
        var a = new Hex(0.0, 0.0, 0.0);
        var b = new Hex(1.0, -1.0, 0.0);
        var c = new Hex(0.0, -1.0, 1.0);
        Tests.equalHex(
            'hex_round 1',
            new Hex(5, -10, 5),
            new Hex(0.0, 0.0, 0.0).lerp(new Hex(10.0, -20.0, 10.0), 0.5).round()
        );
        Tests.equalHex('hex_round 2', a.round(), a.lerp(b, 0.499).round());
        Tests.equalHex('hex_round 3', b.round(), a.lerp(b, 0.501).round());
        Tests.equalHex(
            'hex_round 4',
            a.round(),
            new Hex(
                a.q * 0.4 + b.q * 0.3 + c.q * 0.3,
                a.r * 0.4 + b.r * 0.3 + c.r * 0.3,
                a.s * 0.4 + b.s * 0.3 + c.s * 0.3
            ).round()
        );
        Tests.equalHex(
            'hex_round 5',
            c.round(),
            new Hex(
                a.q * 0.3 + b.q * 0.3 + c.q * 0.4,
                a.r * 0.3 + b.r * 0.3 + c.r * 0.4,
                a.s * 0.3 + b.s * 0.3 + c.s * 0.4
            ).round()
        );
    }
    static testHexLinedraw() {
        Tests.equalHexArray(
            'hex_linedraw',
            [
                new Hex(0, 0, 0),
                new Hex(0, -1, 1),
                new Hex(0, -2, 2),
                new Hex(1, -3, 2),
                new Hex(1, -4, 3),
                new Hex(1, -5, 4),
            ],
            new Hex(0, 0, 0).linedraw(new Hex(1, -5, 4))
        );
    }
    static testLayout() {
        var h = new Hex(3, 4, -7);
        var flat = new Layout(Layout.flat, new Point(10.0, 15.0), new Point(35.0, 71.0));
        Tests.equalHex('layout', h, flat.pixelToHex(flat.hexToPixel(h)).round());
        var pointy = new Layout(Layout.pointy, new Point(10.0, 15.0), new Point(35.0, 71.0));
        Tests.equalHex('layout', h, pointy.pixelToHex(pointy.hexToPixel(h)).round());
    }
    static testOffsetRoundtrip() {
        var a = new Hex(3, 4, -7);
        var b = new OffsetCoord(1, -3);
        Tests.equalHex(
            'conversion_roundtrip even-q',
            a,
            OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, a))
        );
        Tests.equalOffsetcoord(
            'conversion_roundtrip even-q',
            b,
            OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, b))
        );
        Tests.equalHex(
            'conversion_roundtrip odd-q',
            a,
            OffsetCoord.qoffsetToCube(OffsetCoord.ODD, OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, a))
        );
        Tests.equalOffsetcoord(
            'conversion_roundtrip odd-q',
            b,
            OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, OffsetCoord.qoffsetToCube(OffsetCoord.ODD, b))
        );
        Tests.equalHex(
            'conversion_roundtrip even-r',
            a,
            OffsetCoord.roffsetToCube(OffsetCoord.EVEN, OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, a))
        );
        Tests.equalOffsetcoord(
            'conversion_roundtrip even-r',
            b,
            OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, OffsetCoord.roffsetToCube(OffsetCoord.EVEN, b))
        );
        Tests.equalHex(
            'conversion_roundtrip odd-r',
            a,
            OffsetCoord.roffsetToCube(OffsetCoord.ODD, OffsetCoord.roffsetFromCube(OffsetCoord.ODD, a))
        );
        Tests.equalOffsetcoord(
            'conversion_roundtrip odd-r',
            b,
            OffsetCoord.roffsetFromCube(OffsetCoord.ODD, OffsetCoord.roffsetToCube(OffsetCoord.ODD, b))
        );
    }
    static testOffsetFromCube() {
        Tests.equalOffsetcoord(
            'offset_from_cube even-q',
            new OffsetCoord(1, 3),
            OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, new Hex(1, 2, -3))
        );
        Tests.equalOffsetcoord(
            'offset_from_cube odd-q',
            new OffsetCoord(1, 2),
            OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, new Hex(1, 2, -3))
        );
    }
    static testOffsetToCube() {
        Tests.equalHex(
            'offset_to_cube even-',
            new Hex(1, 2, -3),
            OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, new OffsetCoord(1, 3))
        );
        Tests.equalHex(
            'offset_to_cube odd-q',
            new Hex(1, 2, -3),
            OffsetCoord.qoffsetToCube(OffsetCoord.ODD, new OffsetCoord(1, 2))
        );
    }
    static testDoubledRoundtrip() {
        var a = new Hex(3, 4, -7);
        var b = new DoubledCoord(1, -3);
        Tests.equalHex(
            'conversion_roundtrip doubled-q',
            a,
            DoubledCoord.qdoubledFromCube(a).qdoubledToCube()
        );
        Tests.equalDoubledcoord(
            'conversion_roundtrip doubled-q',
            b,
            DoubledCoord.qdoubledFromCube(b.qdoubledToCube())
        );
        Tests.equalHex(
            'conversion_roundtrip doubled-r',
            a,
            DoubledCoord.rdoubledFromCube(a).rdoubledToCube()
        );
        Tests.equalDoubledcoord(
            'conversion_roundtrip doubled-r',
            b,
            DoubledCoord.rdoubledFromCube(b.rdoubledToCube())
        );
    }
    static testDoubledFromCube() {
        Tests.equalDoubledcoord(
            'doubled_from_cube doubled-q',
            new DoubledCoord(1, 5),
            DoubledCoord.qdoubledFromCube(new Hex(1, 2, -3))
        );
        Tests.equalDoubledcoord(
            'doubled_from_cube doubled-r',
            new DoubledCoord(4, 2),
            DoubledCoord.rdoubledFromCube(new Hex(1, 2, -3))
        );
    }
    static testDoubledToCube() {
        Tests.equalHex(
            'doubled_to_cube doubled-q',
            new Hex(1, 2, -3),
            new DoubledCoord(1, 5).qdoubledToCube()
        );
        Tests.equalHex(
            'doubled_to_cube doubled-r',
            new Hex(1, 2, -3),
            new DoubledCoord(4, 2).rdoubledToCube()
        );
    }
    static testAll() {
        Tests.testHexArithmetic();
        Tests.testHexDirection();
        Tests.testHexNeighbor();
        Tests.testHexDiagonal();
        Tests.testHexDistance();
        Tests.testHexRotateRight();
        Tests.testHexRotateLeft();
        Tests.testHexRound();
        Tests.testHexLinedraw();
        Tests.testLayout();
        Tests.testOffsetRoundtrip();
        Tests.testOffsetFromCube();
        Tests.testOffsetToCube();
        Tests.testDoubledRoundtrip();
        Tests.testDoubledFromCube();
        Tests.testDoubledToCube();
    }
}

module.exports = {
    Point,
    Hex,
    OffsetCoord,
    DoubledCoord,
    Orientation,
    Layout,
    Tests,
};
