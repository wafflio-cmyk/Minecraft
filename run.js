window.performance = window.performance || {};
performance.now = (function() {
    return performance.now ||
        performance.mozNow ||
        performance.msNow ||
        performance.oNow ||
        performance.webkitNow ||
        Date.now;
})();
var pm = performance.now(), frameRate = performance.now() - pm;
function run() {

    setTimeout(function() {
        requestAnimationFrame(run);
        frameRate = 1000 / (performance.now() - pm);
        pm = performance.now();
        update();
        draw();
        frameCount += 1;
    }, 1000 / FPS);
}
// run();
requestAnimationFrame(run);