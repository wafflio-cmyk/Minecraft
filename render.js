        var sky = new oc.Program(ih("sky.vsh"), ih("sky.fsh"));
        var color = new oc.Program(ih("color.vsh"), ih("color.fsh"));
        
        color.injectTexture("texture", 0, TEXIMG.width, TEXIMG.height, TEXIMG.data);
        
        oc.universalUniform("res", "2fv", [c.width, c.height]);
        
        var draw = function() {
            ctx.clearRect(0, 0, 800, 780);
            var view = xRotate(pitch, yRotate(yaw, v(0, 0, 1)));
            
            oc.universalUniform("yaw", "1fv", [yaw * D2R]);
            oc.universalUniform("pitch", "1fv", [pitch * D2R]);
            oc.universalUniform("time", "1fv", [frameCount]);
            oc.universalUniform("cam", "3fv", [cam.x, cam.y, cam.z]);
            oc.universalUniform("sun", "3fv", [sun.x, sun.y, sun.z]);
            oc.universalUniform("FOV", "1fv", [FOV]);
            
            oc.use(sky);
            oc.depthTest(false);
            oc.clearDepth();
            oc.clearColor();
            
            sky.fullscreen();
            ctx.drawImage(c, 0, 0, 800, 780);
            
            oc.use(color);
            oc.depthTest(true);
            oc.clearDepth();
            oc.clearColor();
            
            oc.setupBuffer(oc.ARRAY_BUFFER, new Float32Array(vertices), oc.STATIC_DRAW);
            oc.setupBuffer(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), oc.STATIC_DRAW);
            var bpe = new Float32Array(vertices).BYTES_PER_ELEMENT;
            color.setAttribute("vertPos", 3, oc.FLOAT, false, 11 * bpe, 0);
            color.setAttribute("vertCol", 3, oc.FLOAT, false, 11 * bpe, 3 * bpe);
            color.setAttribute("vertNor", 3, oc.FLOAT, false, 11 * bpe, 6 * bpe);
            color.setAttribute("vertImg", 1, oc.FLOAT, false, 11 * bpe, 9 * bpe);
            color.setAttribute("vertWavy", 1, oc.FLOAT, false, 11 * bpe, 10 * bpe);
            
            oc.renderElements(indices.length);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            ctx.drawImage(c, 0, 0, 800, 780);
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(300, 290);
            ctx.lineTo(300, 310);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(290, 300);
            ctx.lineTo(310, 300);
            ctx.stroke();
            ctx.font = "30px Helvetica";
            ctx.fillStyle = "white";
            ctx.fillText(Math.round(frameRate), 0, can.height);
        };