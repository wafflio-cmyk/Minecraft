function map(a, b, c, d, e) {
    return d + (e - d) * (a - b) / (c - b);
}
function ccCol(x, y, z, w, h, d, x2, y2, z2, w2, h2, d2) {
    x -= w / 2;
    y -= h / 2;
    z -= d / 2;
    x2 -= w2 / 2;
    y2 -= h2 / 2;
    z2 -= d2 / 2;
    return x > x2 - w && y > y2 - h && z > z2 - d && x < x2 + w2 && y < y2 + h2 && z < z2 + d2;
}
function constrain(a, b, c) {
    return Math.max(Math.min(a, c), b);
}
var fract = function(a) {
    return a % 1;
};
function hash(x, y, z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;
    return fract(Math.sin(x * 12.91898 + y * 78.212033 + z * 42.20125039) * 43758.545453123);
}
function smoothstep(x, a, b) {
    var t = constrain((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
}
function hermite(a, x1, x2, x3, x4) {
    var b = smoothstep(a, x1, x2);
    return x4 * b + x3 * (1 - b);
}
var vNoise = (function() {
    var v3 = function(x, y, z) {
        return {
            x: x,
            y: y,
            z: z,
            value: hash(x, y, z)
        };
    };
    return function(x, y, z) {
        x = x || 0;
        y = y || 0;
        z = z || 0;
        var fx = Math.floor(x);
        var cx = Math.ceil(x);
        var fy = Math.floor(y);
        var cy = Math.ceil(y);
        var fz = Math.floor(z);
        var cz = Math.ceil(z);
        var ftl = v3(fx, fy, fz);
        var ftr = v3(cx, fy, fz);
        var fbl = v3(fx, cy, fz);
        var fbr = v3(cx, cy, fz);
        var btl = v3(fx, fy, cz);
        var btr = v3(cx, fy, cz);
        var bbl = v3(fx, cy, cz);
        var bbr = v3(cx, cy, cz);
        return hermite(x, fx, cx - 0.0001,
            hermite(y, fy, cy - 0.0001,
                hermite(z, fz, cz - 0.0001, ftl.value, btl.value),
                hermite(z, fz, cz - 0.0001, fbl.value, bbl.value)),
            hermite(y, fy, cy - 0.0001,
                hermite(z, fz, cz - 0.0001, ftr.value, btr.value),
                hermite(z, fz, cz - 0.0001, fbr.value, bbr.value))
        );
    };
})();