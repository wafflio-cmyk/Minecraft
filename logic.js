function v(x, y, z) {
    return new vec(x, y, z);
}

var oc = OCGL;
var c = create("canvas");
c.width = 800;
c.height = 780;
var width = c.width, height = c.height;
oc.applyGL(c);
var gl = oc.gl;
var can = create("canvas");
can.width = 800;
can.height = 780;
can.setAttribute("id", "display");
can.setAttribute("oncontextmenu", "return false");
var ctx = can.getContext("2d");
document.body.appendChild(can);
var frameCount = 0;
gl.viewport(0, 0, width, height);

var D2R = Math.PI/180;
var FPS = 0;
var CLIP_START = 0.1;
var PI = 3.14159265358979323;
var METER = 50;
var WALK = 3.5;
var SPRINT = 5.5;


var tris = [],
    vertices = [],
    indices = [];
var sun = v(1, -1, 1).inormalize();
var cam = v(-60, 59, -75),
    yaw = -41,
    pitch = -28;
var renderDistance = 9;
var FOV = 1;
var player = {
    x: 0,
    y: 0,
    z: 0,
    xVel: 0,
    yVel: 0,
    zVel: 0,
    width: 0.6 * METER,
    height: 1.8 * METER,
    depth: 0.6 * METER,
    onFloor: false,
    sprinting: false,
    col: function(xVel, yVel, zVel) {
        for(var x = ~~(this.x / METER) - 1; x < ~~(this.x / METER) + 2; x += 1) {
            for(var y = ~~(this.y / METER) - 2; y < ~~(this.y / METER) + 2; y += 1) {
                for(var z = ~~(this.z / METER) - 1; z < ~~(this.z / METER) + 2; z += 1) {
                    var b = world.get(x, y, z);
                    if(!b) {
                        continue;
                    }
                    if(!ccCol(this.x, this.y, this.z, this.width, this.height, this.depth, x * METER, y * METER, z * METER, METER, METER, METER)) {
                        continue;
                    }
                    if(xVel > 0) {
                        this.x = x * METER - METER / 2 - this.width / 2;
                        this.xVel = 0;
                    }
                    if(yVel > 0) {
                        this.y = y * METER - METER / 2 - this.height / 2;
                        this.yVel = 0;
                    }
                    if(zVel > 0) {
                        this.z = z * METER - METER / 2 - this.depth / 2;
                        this.zVel = 0;
                    }
                    if(xVel < 0) {
                        this.x = x * METER + METER / 2 + this.width / 2;
                        this.xVel = 0;
                    }
                    if(yVel < 0) {
                        this.y = y * METER + METER / 2 + this.height / 2;
                        this.yVel = 0;
                        this.onFloor = true;
                    }
                    if(zVel < 0) {
                        this.z = z * METER + METER / 2 + this.depth / 2;
                        this.zVel = 0;
                    }
                }
            }
        }
    },
    update: function() {
        this.xVel = this.zVel = 0;
        var spd = METER * WALK / 30;
        if(this.sprinting) {
            spd = METER * SPRINT / 30;
            if(keys.w || keys.s || keys.a || keys.d) {
                FOV += (1.3 - FOV) * 0.4;
            }
        }
        else {
            FOV += (1 - FOV) * 0.4;
        }
        if(keys.w) {
            this.xVel += Math.cos(yaw * D2R + PI / 2) * spd;
            this.zVel += Math.sin(yaw * D2R + PI / 2) * spd;
        }
        else {
            this.sprinting = false;
        }
        if(keys.s) {
            this.xVel += Math.cos(yaw * D2R - PI / 2) * spd;
            this.zVel += Math.sin(yaw * D2R - PI / 2) * spd;
        }
        if(keys.d) {
            this.xVel += Math.cos(yaw * D2R) * spd;
            this.zVel += Math.sin(yaw * D2R) * spd;
        }
        if(keys.a) {
            this.xVel += Math.cos(yaw * D2R + PI) * spd;
            this.zVel += Math.sin(yaw * D2R + PI) * spd;
        }
        if(keys[" "] && this.onFloor) {
            this.yVel = 12;
        }
        if(keys.shift) {
            
        }
        this.x += this.xVel;
        this.col(this.xVel);
        this.yVel -= 1;
        this.y += this.yVel;
        this.onFloor = false;
        this.col(0, this.yVel);
        this.z += this.zVel;
        this.col(0, 0, this.zVel);
        cam.x = this.x;
        cam.y = this.y - this.height / 2 + METER * 1.62;
        cam.z = this.z;
    }
};

function tri(v1, v2, v3, n, img, c1, c2, c3, double, tex, x, y, z) {
    tris.push({
        v1: v1,
        v2: v2,
        v3: v3,
        normal: (n === -1 ? v2.sub(v1).cross(v3.sub(v2)).inormalize().ineg() : (n || v2.sub(v1).cross(v3.sub(v2)).inormalize())),
        img: img,
        c1: c1,
        c2: c2,
        c3: c3,
        double: double,
        tex: tex,
        x: x,
        y: y,
        z: z,
    });
}
function glVert(p, c, n, img, tex) {
    indices.push(vertices.length / 11);
    vertices.push(p.x, p.y, p.z);
    vertices.push(c.x, c.y, c.z);
    vertices.push(n.x, n.y, n.z);
    vertices.push(img);
    vertices.push(tex === 4 ? 1 : 0);
};
function glTri(v1, v2, v3, n, img, c1, c2, c3, tex) {
    glVert(v1, c1, n, img, tex);
    glVert(v2, c2, n, img, tex);
    glVert(v3, c3, n, img, tex);
};
function dispTri(t, c, ortho) {
    var d = t.v1.sub(c).dot(t.normal);
    if(!ortho && !t.double) {
        if(d >= 0) {
            return;
        }
    }
    glTri(t.v1, t.v2, t.v3, d >= 0 ? t.normal.neg() : t.normal, t.img, t.c1, t.c2, t.c3, t.tex);
}

function topFace(x, y, z, tex) {
    var t = world.get(x, y + 1, z);
    if(t && t !== 4) {
        return;
    }
    x *= METER;
    y *= METER;
    z *= METER;
    tri(
        v(x - METER / 2, y + METER / 2, z - METER / 2),
        v(x - METER / 2, y + METER / 2, z + METER / 2),
        v(x + METER / 2, y + METER / 2, z + METER / 2),
        v(0, 1, 0),
        1,
        v(1, tex * TEXHEIGHT),
        v(1, tex * TEXHEIGHT + TEXHEIGHT),
        v(0, tex * TEXHEIGHT + TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
    tri(
        v(x - METER / 2, y + METER / 2, z - METER / 2),
        v(x + METER / 2, y + METER / 2, z - METER / 2),
        v(x + METER / 2, y + METER / 2, z + METER / 2),
        v(0, 1, 0),
        1,
        v(1, tex * TEXHEIGHT),
        v(0, tex * TEXHEIGHT),
        v(0, tex * TEXHEIGHT + TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
}
function bottomFace(x, y, z, tex) {
    var t = world.get(x, y - 1, z);
    if(t && t !== 4) {
        return;
    }
    x *= METER;
    y *= METER;
    z *= METER;
    tri(
        v(x - METER / 2, y - METER / 2, z - METER / 2),
        v(x - METER / 2, y - METER / 2, z + METER / 2),
        v(x + METER / 2, y - METER / 2, z + METER / 2),
        v(0, -1, 0),
        1,
        v(0, tex * TEXHEIGHT),
        v(0, tex * TEXHEIGHT + TEXHEIGHT),
        v(1, tex * TEXHEIGHT + TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
    tri(
        v(x - METER / 2, y - METER / 2, z - METER / 2),
        v(x + METER / 2, y - METER / 2, z - METER / 2),
        v(x + METER / 2, y - METER / 2, z + METER / 2),
        v(0, -1, 0),
        1,
        v(0, tex * TEXHEIGHT),
        v(1, tex * TEXHEIGHT),
        v(1, tex * TEXHEIGHT + TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
}
function frontFace(x, y, z, tex) {
    var t = world.get(x, y, z - 1);
    if(t && t !== 4) {
        return;
    }
    x *= METER;
    y *= METER;
    z *= METER;
    tri(
        v(x - METER / 2, y + METER / 2, z - METER / 2),
        v(x + METER / 2, y + METER / 2, z - METER / 2),
        v(x - METER / 2, y - METER / 2, z - METER / 2),
        v(0, 0, -1),
        1,
        v(0, tex * TEXHEIGHT),
        v(1, tex * TEXHEIGHT),
        v(0, tex * TEXHEIGHT + TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
    tri(
        v(x + METER / 2, y - METER / 2, z - METER / 2),
        v(x + METER / 2, y + METER / 2, z - METER / 2),
        v(x - METER / 2, y - METER / 2, z - METER / 2),
        v(0, 0, -1),
        1,
        v(1, tex * TEXHEIGHT + TEXHEIGHT),
        v(1, tex * TEXHEIGHT),
        v(0, tex * TEXHEIGHT + TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
}
function backFace(x, y, z, tex) {
    var t = world.get(x, y, z + 1);
    if(t && t !== 4) {
        return;
    }
    x *= METER;
    y *= METER;
    z *= METER;
    tri(
        v(x - METER / 2, y + METER / 2, z + METER / 2),
        v(x + METER / 2, y + METER / 2, z + METER / 2),
        v(x - METER / 2, y - METER / 2, z + METER / 2),
        v(0, 0, 1),
        1,
        v(1, tex * TEXHEIGHT),
        v(0, tex * TEXHEIGHT),
        v(1, tex * TEXHEIGHT + TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
    tri(
        v(x + METER / 2, y - METER / 2, z + METER / 2),
        v(x + METER / 2, y + METER / 2, z + METER / 2),
        v(x - METER / 2, y - METER / 2, z + METER / 2),
        v(0, 0, 1),
        1,
        v(0, tex * TEXHEIGHT + TEXHEIGHT),
        v(0, tex * TEXHEIGHT),
        v(1, tex * TEXHEIGHT + TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
}
function leftFace(x, y, z, tex) {
    var t = world.get(x - 1, y, z);
    if(t && t !== 4) {
        return;
    }
    x *= METER;
    y *= METER;
    z *= METER;
    tri(
        v(x - METER / 2, y + METER / 2, z + METER / 2),
        v(x - METER / 2, y - METER / 2, z + METER / 2),
        v(x - METER / 2, y + METER / 2, z - METER / 2),
        v(-1, 0, 0),
        1,
        v(0, tex * TEXHEIGHT),
        v(0, tex * TEXHEIGHT + TEXHEIGHT),
        v(1, tex * TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
    tri(
        v(x - METER / 2, y - METER / 2, z - METER / 2),
        v(x - METER / 2, y - METER / 2, z + METER / 2),
        v(x - METER / 2, y + METER / 2, z - METER / 2),
        v(-1, 0, 0),
        1,
        v(1, tex * TEXHEIGHT + TEXHEIGHT),
        v(0, tex * TEXHEIGHT + TEXHEIGHT),
        v(1, tex * TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
}
function rightFace(x, y, z, tex) {
    var t = world.get(x + 1, y, z);
    if(t && t !== 4) {
        return;
    }
    x *= METER;
    y *= METER;
    z *= METER;
    tri(
        v(x + METER / 2, y + METER / 2, z + METER / 2),
        v(x + METER / 2, y - METER / 2, z + METER / 2),
        v(x + METER / 2, y + METER / 2, z - METER / 2),
        v(1, 0, 0),
        1,
        v(1, tex * TEXHEIGHT),
        v(1, tex * TEXHEIGHT + TEXHEIGHT),
        v(0, tex * TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
    tri(
        v(x + METER / 2, y - METER / 2, z - METER / 2),
        v(x + METER / 2, y - METER / 2, z + METER / 2),
        v(x + METER / 2, y + METER / 2, z - METER / 2),
        v(1, 0, 0),
        1,
        v(0, tex * TEXHEIGHT + TEXHEIGHT),
        v(1, tex * TEXHEIGHT + TEXHEIGHT),
        v(0, tex * TEXHEIGHT), false, tex, x / METER, y / METER, z / METER);
}

var ids = [
    {},
    {
        displayName: "Grass Block",
        name: "grass_block",
        endermanHoldable: true,
        bambooPlantableOn: true,
        top: 1,
        sides: 0,
        bottom: 2,
    },
    {
        displayName: "Dirt",
        name: "dirt",
        endermanHoldable: true,
        bambooPlantableOn: true,
        texture: 2,
    },
    {
        displayName: "Oak Wood",
        name: "oak_wood",
        texture: 3,
    },
    {
        displayName: "Oak Leaves",
        name: "oak_leaves",
        texture: 4,
    },
];

var world = {
    get: function(x, y, z) {
        if(!this[x]) {
            return false;
        }
        if(!this[x][y]) {
            return false;
        }
        return this[x][y][z];
    },
    set: function(x, y, z, id) {
        if(!this[x]) {
            this[x] = {};
        }
        if(!this[x][y]) {
            this[x][y] = {};
        }
        this[x][y][z] = id;
    }
};
function block(x, y, z, b) {
    var temp = ids[b];
    if(!temp.model) {
        if(temp.texture) {
            topFace(x, y, z, temp.texture);
            bottomFace(x, y, z, temp.texture);
            frontFace(x, y, z, temp.texture);
            backFace(x, y, z, temp.texture);
            leftFace(x, y, z, temp.texture);
            rightFace(x, y, z, temp.texture);
            return;
        }
        topFace(x, y, z, temp.top);
        bottomFace(x, y, z, temp.bottom);
        frontFace(x, y, z, temp.sides);
        backFace(x, y, z, temp.sides);
        leftFace(x, y, z, temp.sides);
        rightFace(x, y, z, temp.sides);
        return;
    }
}
function generateWorld(x, y, z) {
    for(var b = -renderDistance; b < renderDistance; b += 1) {
        for(var a = renderDistance; a >= -renderDistance; a -= 1) {
            var i = ~~(x / METER) + b, j = ~~(z / METER) + a;
            var y = Math.round(vNoise(i * 0.02 + SEED, j * 0.02, 0) * 50) - 50;
            if(world.get(i, y, j)) {
                continue;
            }
            world.set(i, y, j, 1);
            for(var k = 1; k < 4; k += 1) {
                world.set(i, y - k, j, 2);
            }
            var id = hash(i, j, 0);
            if(id >= -0.95) {
                continue;
            }
            var h = ~~Math.abs(id * 2) + 3;
            for(var k = 1; k <= h; k += 1) {
                world.set(i, y + k, j, 3);
            }
            world.set(i, y + k, j, 4);
            world.set(i + 1, y + k, j, 4);
            world.set(i - 1, y + k, j, 4);
            world.set(i, y + k, j + 1, 4);
            world.set(i, y + k, j - 1, 4);
            
            world.set(i + 1, y + k - 1, j, 4);
            world.set(i - 1, y + k - 1, j, 4);
            world.set(i, y + k - 1, j + 1, 4);
            world.set(i, y + k - 1, j - 1, 4);
            world.set(i + 1, y + k - 1, j + 1, 4);
            world.set(i + 1, y + k - 1, j - 1, 4);
            world.set(i - 1, y + k - 1, j - 1, 4);
            world.set(i - 1, y + k - 1, j + 1, 4);
        }
    }
}

function renderWorld() {
    for(var i = ~~(cam.x / METER) - renderDistance; i < ~~(cam.x / METER) + renderDistance; i += 1) {
        if(!world[i]) {
            continue;
        }
        for(var j = ~~(cam.y / METER) - renderDistance; j < ~~(cam.y / METER) + renderDistance; j += 1) {
            if(!world[i][j]) {
                continue;
            }
            for(var k = ~~(cam.z / METER) - renderDistance; k < ~~(cam.z / METER) + renderDistance; k += 1) {
                var b = world.get(i, j, k);
                if(!b) {
                    continue;
                }
                block(i, j, k, b);
            }
        }
    }
}
can.requestPointerLock = can.requestPointerLock || can.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
can.onclick = function() {
    can.requestPointerLock();
};

var mouseLocked = false;
function lockChangeAlert() {
    if(document.pointerLockElement === can || document.mozPointerLockElement === can) {
        mouseLocked = true;
    }
    else {
        mouseLocked = false;
    }
}
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
function updatePosition(e) {
    yaw -= e.movementX * 0.4;
    pitch -= e.movementY * 0.4;
    pitch = Math.min(Math.max(pitch, -90), 90)
}
addEventListener("mousemove", updatePosition, false);

function random(a, b) {
    if(!b && b !== 0) {
        return Math.random() * a;
    }
    return Math.min(a, b) + Math.random() * (Math.max(a, b) - Math.min(a, b));
}
var keys = {};
var sprintLast = 0;
addEventListener("keydown", function(e) {
    keys[e.key.toLowerCase()] = true;
    if(e.key.toLowerCase() === "w") {
        if(Date.now() - sprintLast <= 150) {
            player.sprinting = true;
        }
    }
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
});
addEventListener("keyup", function(e) {
    keys[e.key.toLowerCase()] = false;
    if(e.key.toLowerCase() === "w") {
        sprintLast = Date.now();
    }
});

function update() {
    player.update();
    
    if(player.xVel !== 0 || player.yVel !== 0 || player.zVel !== 0) {
        if(frameCount % 2 === 0) {
            generateWorld(cam.x, cam.y, cam.z);
            tris.length = 0;
            renderWorld();
        }
        vertices.length = indices.length = 0;
        for(var i = tris.length - 1; i >= 0; i -= 1) {
            var t = tris[i];
            dispTri(t, cam, false);
        }
    }
}