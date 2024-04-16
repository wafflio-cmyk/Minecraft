var TEXHEIGHT, TEXIMG = (function() {
    var SIZE = 16; // Size of textures
    
    // Textures
    var textures = [
        [[74,187,56],[74,187,56],[70,179,52],[65,167,49],[67,171,50],[72,183,54],[66,168,50],[78,175,62],[96,199,79],[84,190,67],[88,179,73],[65,167,49],[76,171,60],[58,152,46],[50,135,40],[80,179,64],[81,204,62],[69,175,52],[106,222,88],[109,211,93],[117,213,102],[90,56,35],[82,183,66],[63,163,48],[60,156,47],[120,224,104],[109,218,93],[76,191,58],[62,157,47],[76,191,58],[69,175,52],[75,169,60],[106,224,88],[90,56,35],[119,235,101],[71,179,54],[76,191,58],[90,56,35],[100,209,83],[90,56,35],[74,187,56],[81,204,62],[112,223,95],[128,225,113],[90,56,35],[56,146,44],[66,168,50],[90,56,35],[90,56,35],[103,105,105],[90,56,35],[90,56,35],[77,195,58],[90,56,35],[90,56,35],[90,56,35],[66,168,50],[90,56,35],[76,191,58],[90,56,35],[115,75,49],[90,56,35],[90,56,35],[115,75,49],[151,99,64],[115,75,49],[151,99,64],[192,135,86],[90,56,35],[151,99,64],[115,75,49],[115,75,49],[90,56,35],[90,56,35],[90,56,35],[103,105,105],[115,75,49],[151,99,64],[90,56,35],[115,75,49],[115,75,49],[90,56,35],[151,99,64],[151,99,64],[115,75,49],[151,99,64],[90,56,35],[90,56,35],[90,56,35],[115,75,49],[115,75,49],[90,56,35],[115,75,49],[115,75,49],[115,75,49],[192,135,86],[192,135,86],[90,56,35],[115,75,49],[115,75,49],[138,141,141],[115,75,49],[115,75,49],[192,135,86],[192,135,86],[115,75,49],[192,135,86],[192,135,86],[115,75,49],[151,99,64],[115,75,49],[151,99,64],[192,135,86],[115,75,49],[192,135,86],[192,135,86],[151,99,64],[151,99,64],[115,75,49],[115,75,49],[151,99,64],[90,56,35],[151,99,64],[151,99,64],[115,75,49],[115,75,49],[151,99,64],[151,99,64],[151,99,64],[115,75,49],[115,75,49],[151,99,64],[115,75,49],[151,99,64],[115,75,49],[90,56,35],[115,75,49],[151,99,64],[151,99,64],[115,75,49],[115,75,49],[115,75,49],[90,56,35],[115,75,49],[151,99,64],[151,99,64],[90,56,35],[115,75,49],[115,75,49],[90,56,35],[90,56,35],[115,75,49],[115,75,49],[115,75,49],[115,75,49],[115,75,49],[192,135,86],[192,135,86],[115,75,49],[151,99,64],[151,99,64],[151,99,64],[115,75,49],[192,135,86],[192,135,86],[115,75,49],[192,135,86],[151,99,64],[90,56,35],[192,135,86],[192,135,86],[115,75,49],[151,99,64],[151,99,64],[138,141,141],[115,75,49],[151,99,64],[115,75,49],[115,75,49],[151,99,64],[151,99,64],[192,135,86],[115,75,49],[151,99,64],[103,105,105],[151,99,64],[151,99,64],[115,75,49],[90,56,35],[151,99,64],[115,75,49],[90,56,35],[115,75,49],[90,56,35],[151,99,64],[115,75,49],[151,99,64],[151,99,64],[192,135,86],[115,75,49],[115,75,49],[115,75,49],[115,75,49],[115,75,49],[115,75,49],[115,75,49],[192,135,86],[192,135,86],[115,75,49],[151,99,64],[115,75,49],[115,75,49],[90,56,35],[115,75,49],[151,99,64],[151,99,64],[115,75,49],[90,56,35],[192,135,86],[90,56,35],[115,75,49],[192,135,86],[151,99,64],[151,99,64],[151,99,64],[115,75,49],[90,56,35],[192,135,86],[115,75,49],[90,56,35],[115,75,49],[90,56,35],[115,75,49],[115,75,49],[115,75,49],[90,56,35],[115,75,49],[115,75,49],[151,99,64],[151,99,64],[151,99,64],[115,75,49],[192,135,86],[151,99,64],[151,99,64],[115,75,49],[138,141,141],[151,99,64],[151,99,64],[151,99,64],[115,75,49],[115,75,49],[151,99,64],[151,99,64],[115,75,49],[90,56,35]], // Grass
        [[120,181,82],[121,182,82],[119,178,79],[107,166,67],[107,167,67],[113,175,73],[100,161,61],[113,175,73],[128,189,89],[121,180,81],[110,169,70],[107,167,67],[107,168,67],[100,162,59],[86,148,45],[115,177,75],[119,180,77],[111,171,67],[135,185,87],[126,175,78],[125,176,78],[97,159,54],[104,166,61],[99,161,56],[100,162,57],[142,193,95],[140,188,92],[114,176,72],[98,160,55],[109,171,66],[103,165,60],[112,172,68],[140,190,93],[158,209,110],[150,201,101],[103,163,60],[107,168,64],[105,168,63],[113,175,70],[113,175,70],[117,179,74],[129,191,86],[144,194,97],[146,197,97],[102,165,59],[90,150,46],[102,160,57],[158,207,110],[89,151,46],[103,166,61],[109,170,66],[119,180,76],[114,175,70],[120,180,76],[94,155,51],[94,155,50],[97,158,53],[103,164,59],[113,174,69],[120,181,77],[110,172,67],[108,169,65],[110,171,67],[99,160,58],[126,187,83],[103,165,60],[144,196,97],[102,164,60],[147,197,100],[144,195,98],[113,164,66],[146,196,99],[153,204,107],[87,146,43],[101,161,57],[142,192,94],[142,193,94],[95,156,52],[106,168,63],[112,173,70],[123,185,80],[118,181,76],[95,153,52],[138,186,90],[102,161,59],[121,181,78],[120,178,75],[129,179,82],[107,167,63],[116,178,73],[104,165,61],[103,163,60],[91,152,48],[104,166,61],[110,172,68],[118,179,76],[98,161,55],[132,181,85],[138,186,91],[116,175,73],[115,176,71],[102,163,59],[107,169,64],[97,159,54],[102,163,58],[107,169,65],[154,204,106],[144,194,96],[112,175,69],[140,191,91],[120,180,77],[122,170,74],[112,173,68],[107,167,66],[132,182,86],[110,170,67],[113,175,70],[97,158,53],[132,191,87],[103,164,60],[120,182,79],[142,194,96],[106,167,63],[99,162,57],[113,173,70],[134,185,89],[100,161,57],[145,192,97],[100,163,57],[129,180,82],[155,205,108],[143,192,95],[143,192,95],[102,162,59],[148,195,99],[131,179,83],[151,201,104],[142,193,95],[100,162,58],[113,175,70],[103,164,60],[122,171,75],[95,159,53],[100,162,57],[119,178,74],[105,162,60],[157,205,108],[112,173,70],[110,171,67],[127,177,80],[145,192,95],[100,160,56],[107,169,64],[117,175,72],[114,175,71],[135,196,92],[111,172,68],[152,200,105],[110,173,68],[100,162,57],[126,186,83],[131,181,83],[123,182,80],[137,187,90],[101,163,60],[153,203,106],[114,173,71],[126,175,78],[158,210,111],[95,155,51],[133,194,90],[101,163,58],[112,173,68],[110,167,65],[103,165,60],[114,174,71],[105,166,63],[146,195,98],[106,166,62],[138,187,88],[117,180,76],[104,164,61],[114,176,72],[108,169,65],[121,182,79],[114,175,71],[109,170,66],[93,154,49],[98,158,54],[97,158,53],[94,157,51],[109,170,67],[159,208,110],[119,180,77],[98,160,56],[108,169,65],[121,183,79],[112,173,69],[102,163,59],[90,151,46],[75,137,33],[113,175,70],[106,168,63],[96,158,54],[133,183,85],[137,185,89],[91,152,49],[105,166,63],[160,207,111],[140,189,92],[89,150,46],[88,149,44],[95,157,52],[97,159,54],[103,163,60],[163,213,116],[138,185,91],[171,219,124],[141,190,92],[124,185,81],[127,189,85],[107,167,65],[141,190,93],[151,198,104],[142,189,93],[137,185,88],[105,166,62],[94,156,51],[153,203,104],[144,194,97],[116,177,74],[116,176,73],[99,159,55],[122,181,78],[118,180,75],[106,168,63],[142,194,95],[129,181,84],[112,169,69],[139,187,90],[107,168,65],[121,181,77],[106,168,64],[84,147,42],[135,197,93],[124,185,81],[122,183,80],[155,205,108],[118,176,73],[161,212,115],[96,157,54],[100,163,58],[106,167,63],[115,177,73],[107,169,65],[131,192,89],], // Grass Top
        [[180,131,92],[151,108,73],[146,106,75],[121,86,58],[124,87,58],[179,130,94],[147,107,74],[147,107,75],[121,86,58],[118,84,57],[92,62,39],[120,85,59],[125,88,59],[180,132,92],[121,84,55],[180,131,93],[124,86,56],[146,107,74],[92,62,38],[119,85,57],[121,86,58],[92,61,39],[91,61,38],[92,61,40],[121,85,57],[92,61,41],[146,106,74],[124,87,57],[179,131,94],[148,108,75],[93,61,39],[92,61,40],[179,131,92],[120,86,58],[121,86,57],[94,63,41],[177,130,95],[150,107,74],[148,107,75],[125,87,57],[178,130,92],[92,61,39],[121,86,57],[118,84,58],[91,63,42],[141,133,125],[180,134,96],[121,85,56],[148,108,76],[113,106,100],[178,131,93],[122,85,57],[91,61,38],[148,107,76],[125,87,56],[179,131,92],[152,108,74],[146,106,73],[120,84,57],[95,63,40],[122,86,58],[180,132,93],[148,106,73],[121,85,56],[152,108,73],[119,85,59],[152,108,73],[179,129,91],[94,62,40],[148,107,74],[120,85,58],[120,86,57],[146,105,72],[94,62,38],[122,86,58],[175,130,92],[123,86,56],[149,106,76],[93,60,39],[122,87,60],[180,131,93],[92,62,38],[149,107,75],[148,106,71],[119,86,59],[147,106,74],[90,61,39],[93,62,39],[95,64,42],[121,86,58],[122,86,58],[94,63,40],[119,86,58],[123,86,57],[123,86,57],[181,132,94],[179,131,93],[121,85,58],[124,86,57],[123,87,59],[112,105,100],[121,86,59],[121,85,58],[180,132,94],[179,131,92],[123,86,58],[181,132,93],[178,131,93],[123,86,57],[146,108,78],[123,86,57],[152,107,74],[123,86,57],[124,86,59],[179,130,92],[181,131,91],[148,108,75],[148,106,74],[92,62,40],[121,85,57],[146,105,71],[95,63,41],[148,106,74],[123,85,56],[122,88,59],[139,133,126],[146,106,74],[150,107,74],[147,107,72],[121,86,57],[121,85,57],[148,106,74],[124,86,56],[146,106,73],[89,61,39],[91,62,41],[121,86,58],[146,106,75],[121,85,57],[120,85,58],[150,108,74],[149,108,76],[92,61,38],[122,86,56],[122,86,58],[149,107,74],[92,61,38],[123,86,56],[119,84,56],[93,62,38],[94,62,40],[120,86,60],[122,86,57],[149,108,73],[123,86,56],[93,63,40],[180,133,93],[180,131,92],[121,87,59],[148,108,75],[122,87,58],[148,106,73],[123,86,57],[180,131,93],[123,86,57],[150,108,75],[179,132,95],[149,106,74],[93,64,41],[182,133,94],[178,131,93],[93,62,40],[150,107,74],[150,109,76],[139,131,124],[118,85,59],[146,105,73],[121,85,56],[121,86,56],[149,107,74],[123,86,56],[148,106,74],[125,88,57],[147,106,75],[111,106,100],[146,106,74],[91,61,38],[95,63,42],[148,107,75],[148,107,74],[122,87,58],[94,62,41],[90,61,38],[92,61,38],[120,86,58],[146,106,74],[120,85,57],[124,86,58],[178,131,93],[122,85,56],[119,85,59],[119,85,57],[121,85,58],[146,106,74],[122,85,58],[125,87,56],[182,132,92],[182,132,93],[123,86,57],[147,107,76],[121,85,57],[124,86,56],[116,87,65],[120,86,59],[150,107,72],[147,107,75],[122,86,57],[91,61,38],[89,61,40],[94,61,38],[122,85,57],[180,131,93],[151,107,72],[151,107,74],[148,107,74],[122,85,56],[124,87,56],[180,132,93],[121,85,57],[92,61,39],[117,85,59],[94,62,38],[179,131,93],[122,86,57],[122,86,57],[147,107,76],[118,86,59],[122,85,55],[149,108,76],[149,108,74],[149,107,74],[122,86,58],[182,133,95],[151,108,74],[148,107,76],[121,87,62],[137,132,128],[123,86,61],[150,107,72],[148,107,74],[121,86,57],[121,88,61],[136,132,129],[148,107,75],[120,85,57],[89,60,38],], // dirt
        [[107,87,54],[70,57,38],[105,84,51],[109,88,55],[156,123,76],[62,49,30],[109,88,55],[150,118,70],[65,52,33],[102,81,48],[104,83,50],[103,82,49],[124,98,62],[109,88,55],[124,98,62],[106,85,52],[98,78,45],[63,50,31],[101,80,47],[110,89,56],[57,44,25],[66,53,32],[152,120,73],[65,52,33],[102,81,48],[153,121,74],[64,50,30],[104,83,50],[153,122,75],[76,61,38],[124,98,62],[79,63,39],[103,82,50],[57,45,26],[94,75,47],[99,78,46],[65,52,33],[106,84,51],[153,121,74],[61,48,30],[103,82,49],[152,120,73],[63,49,29],[103,82,49],[124,98,62],[76,61,38],[124,98,62],[78,63,39],[63,49,29],[109,88,55],[69,56,37],[98,77,45],[64,51,32],[124,98,62],[124,98,62],[61,48,30],[104,83,50],[152,120,73],[63,49,29],[104,83,50],[152,120,73],[60,47,28],[156,124,77],[70,56,36],[105,84,51],[106,85,52],[64,52,33],[108,87,54],[103,82,49],[124,98,62],[124,98,62],[108,87,54],[103,82,49],[110,89,56],[67,54,35],[106,85,52],[154,122,75],[60,47,28],[154,122,75],[65,51,30],[105,84,51],[108,87,54],[94,75,47],[108,87,54],[102,81,48],[153,121,74],[104,83,50],[102,81,48],[106,85,52],[107,86,53],[62,49,30],[105,84,51],[143,111,64],[61,48,30],[124,98,62],[67,53,33],[64,50,30],[104,83,50],[123,98,62],[78,62,39],[108,87,54],[150,118,71],[98,77,44],[104,83,50],[61,48,29],[144,112,66],[63,49,29],[124,98,62],[91,73,45],[55,42,23],[124,98,62],[65,51,32],[116,95,62],[107,86,53],[154,122,75],[63,50,31],[107,86,53],[153,121,75],[60,47,29],[155,122,75],[64,52,33],[153,121,74],[61,47,28],[124,98,62],[77,61,38],[102,81,48],[124,98,62],[66,52,32],[105,84,51],[105,84,51],[153,121,74],[64,51,32],[112,91,58],[146,115,68],[64,52,33],[105,84,51],[64,51,32],[105,84,51],[68,54,35],[147,115,68],[61,48,29],[108,87,54],[107,86,53],[65,52,32],[105,84,51],[105,84,51],[156,124,77],[71,58,38],[103,82,49],[110,89,55],[148,116,69],[65,52,34],[106,85,52],[106,85,52],[59,46,26],[149,117,70],[67,54,34],[107,86,53],[149,117,70],[69,55,35],[102,82,49],[70,57,37],[125,99,63],[65,52,33],[106,85,52],[105,83,50],[150,118,71],[57,44,26],[100,79,46],[63,50,30],[93,74,47],[159,127,80],[65,52,33],[106,85,52],[155,123,76],[71,57,37],[99,78,46],[62,49,30],[124,98,62],[64,51,31],[103,82,49],[113,91,58],[154,122,75],[65,52,33],[154,122,75],[56,43,24],[94,75,47],[157,125,78],[62,49,30],[108,87,54],[151,119,72],[64,50,30],[61,48,28],[59,46,27],[154,122,75],[58,45,26],[102,81,48],[109,87,54],[154,122,75],[55,42,23],[107,86,52],[63,50,31],[101,80,47],[151,119,72],[61,48,29],[106,85,52],[99,78,44],[65,52,32],[60,47,28],[65,52,33],[109,88,55],[94,75,47],[108,87,54],[105,83,50],[124,98,62],[76,61,38],[110,89,56],[109,88,55],[99,78,45],[103,82,49],[61,48,29],[106,85,52],[148,116,69],[156,124,77],[103,82,50],[58,45,26],[103,82,49],[149,118,71],[64,51,32],[108,86,53],[124,98,62],[76,61,38],[62,49,30],[146,114,67],[105,84,50],[152,120,73],[60,47,28],[101,80,47],[124,98,62],[65,51,31],[105,84,51],[93,74,46],[104,83,50],[124,98,62],[62,49,30],[101,80,47],[106,85,52],[103,82,50],[64,51,32],[107,85,52],[108,87,54],[105,84,50],[56,43,24],[103,82,49],[106,85,52],[100,79,47],], // Oak wood
        [[85,100,47],[85,100,47],[0,0,0,0],[158,188,90],[0,0,0,0],[127,153,70],[127,153,70],[0,0,0,0],[98,117,54],[98,117,54],[85,100,47],[127,153,70],[0,0,0,0],[0,0,0,0],[158,188,90],[98,117,54],[127,153,70],[0,0,0,0],[0,0,0,0],[0,0,0,0],[85,100,47],[85,100,47],[98,117,54],[127,153,70],[0,0,0,0],[127,153,70],[98,117,54],[127,153,70],[0,0,0,0],[158,188,90],[127,153,70],[158,188,90],[0,0,0,0],[0,0,0,0],[98,117,54],[98,117,54],[0,0,0,0],[127,153,70],[127,153,70],[98,117,54],[158,188,90],[0,0,0,0],[127,153,70],[0,0,0,0],[0,0,0,0],[158,188,90],[158,188,90],[158,188,90],[0,0,0,0],[127,153,70],[98,117,54],[85,100,47],[85,100,47],[0,0,0,0],[158,188,90],[127,153,70],[158,188,90],[85,100,47],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[158,188,90],[0,0,0,0],[127,153,70],[98,117,54],[127,153,70],[98,117,54],[0,0,0,0],[0,0,0,0],[127,153,70],[158,188,90],[0,0,0,0],[0,0,0,0],[0,0,0,0],[85,100,47],[127,153,70],[127,153,70],[0,0,0,0],[0,0,0,0],[127,153,70],[127,153,70],[98,117,54],[0,0,0,0],[0,0,0,0],[158,188,90],[98,117,54],[85,100,47],[85,100,47],[85,100,47],[0,0,0,0],[0,0,0,0],[85,100,47],[98,117,54],[127,153,70],[0,0,0,0],[98,117,54],[98,117,54],[0,0,0,0],[85,100,47],[158,188,90],[127,153,70],[158,188,90],[127,153,70],[0,0,0,0],[98,117,54],[98,117,54],[0,0,0,0],[127,153,70],[127,153,70],[98,117,54],[158,188,90],[98,117,54],[85,100,47],[85,100,47],[0,0,0,0],[158,188,90],[158,188,90],[158,188,90],[0,0,0,0],[85,100,47],[85,100,47],[98,117,54],[127,153,70],[0,0,0,0],[158,188,90],[98,117,54],[127,153,70],[158,188,90],[127,153,70],[0,0,0,0],[85,100,47],[85,100,47],[158,188,90],[127,153,70],[127,153,70],[0,0,0,0],[98,117,54],[127,153,70],[98,117,54],[127,153,70],[0,0,0,0],[127,153,70],[98,117,54],[158,188,90],[0,0,0,0],[0,0,0,0],[0,0,0,0],[85,100,47],[85,100,47],[85,100,47],[98,117,54],[127,153,70],[0,0,0,0],[127,153,70],[127,153,70],[127,153,70],[0,0,0,0],[158,188,90],[127,153,70],[0,0,0,0],[127,153,70],[127,153,70],[0,0,0,0],[85,100,47],[0,0,0,0],[127,153,70],[127,153,70],[98,117,54],[158,188,90],[0,0,0,0],[127,153,70],[0,0,0,0],[0,0,0,0],[0,0,0,0],[158,188,90],[158,188,90],[98,117,54],[85,100,47],[85,100,47],[0,0,0,0],[0,0,0,0],[0,0,0,0],[158,188,90],[127,153,70],[158,188,90],[0,0,0,0],[98,117,54],[127,153,70],[0,0,0,0],[0,0,0,0],[0,0,0,0],[98,117,54],[127,153,70],[127,153,70],[0,0,0,0],[127,153,70],[127,153,70],[0,0,0,0],[0,0,0,0],[158,188,90],[0,0,0,0],[85,100,47],[85,100,47],[98,117,54],[158,188,90],[0,0,0,0],[158,188,90],[127,153,70],[158,188,90],[0,0,0,0],[158,188,90],[98,117,54],[85,100,47],[85,100,47],[0,0,0,0],[0,0,0,0],[85,100,47],[0,0,0,0],[127,153,70],[158,188,90],[98,117,54],[127,153,70],[158,188,90],[158,188,90],[0,0,0,0],[158,188,90],[127,153,70],[158,188,90],[127,153,70],[0,0,0,0],[0,0,0,0],[98,117,54],[98,117,54],[0,0,0,0],[0,0,0,0],[158,188,90],[127,153,70],[158,188,90],[0,0,0,0],[127,153,70],[0,0,0,0],[158,188,90],[158,188,90],[158,188,90],[0,0,0,0],[0,0,0,0],[85,100,47],[85,100,47],[85,100,47],[98,117,54],[0,0,0,0],[0,0,0,0],[158,188,90],[0,0,0,0],[127,153,70],], // Oak leaves
    ];
    
    var data = new ImageData(SIZE, SIZE * textures.length);
    function point(x, y, r, g, b, a) {
        var i = ((x % SIZE) + y * SIZE) * 4;
        data.data[i + 0] = r;
        data.data[i + 1] = g;
        data.data[i + 2] = b;
        data.data[i + 3] = (a === 0 ? 0 : (a || 255));
    }
    
    for(var i = 0; i < textures.length; i += 1) {
        var t = textures[i];
        for(var j = 0; j < t.length; j += 1) {
            var b = t[j];
            var x = j % SIZE;
            var y = ~~(j / SIZE) + i * SIZE;
            point(x, y, b[0], b[1], b[2], (b[3] === 0 ? 0 : (b[3] || 255)));
        }
    }
    TEXHEIGHT = 1 / textures.length;
    return {
        data: data,
        width: SIZE,
        height: SIZE * textures.length,
    };
})();