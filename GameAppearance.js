/**
 * Created by drodger on 4/1/17.
 */

function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

var shark = [];
var shark_x =[];
var shark_y =[];

var blockSize = 25;
var ballSize = 15;

function drawLevel(level) {
    var skyColor = 'rgb(240,230,0)';
    var groundColor = 'rgb(0,146,69)';

    $("#canvas").empty();
    shark = [];
    shark_x = [];
    shark_y = [];
    for (var i = 0; i < levels[level].length; i++) {
        var x = i % levelWidth;
        var y = Math.floor(i / levelWidth);

        if (levels[level][i] == 1) {
            var block = makeSVG('rect', {
                x: x * blockSize,
                y: y * blockSize,
                width: blockSize,
                height: blockSize,
                fill: 'rgb(100,100,100)'
            });
            $("#canvas").append(block);
        }
        if (levels[level][i] == 2) {
            var block = makeSVG('rect', {
                x: x * blockSize,
                y: y * blockSize,
                width: blockSize,
                height: blockSize,
                fill: 'rgb(0,255,255)'
            });
            $("#canvas").append(block);
        }
        if (levels[level][i] == 3) {
            var block = makeSVG('rect', {
                x: x * blockSize,
                y: y * blockSize,
                width: blockSize,
                height: blockSize,
                fill: 'rgb(255,0,0)'
            });
            $("#canvas").append(block);
        }
         if (levels[level][i] == 4) {
            var block = makeSVG('rect', {
                x: x * blockSize,
                y: y * blockSize,
                width: blockSize,
                height: blockSize,
                opacity: 1/2,
                fill: 'rgb(0,144,255)'
            });
            $("#canvas").append(block);
        }
        if (levels[level][i] == 5) {
            var group = makeSVG('g', {
                transform: 'translate('+x*blockSize+' '+y*blockSize+') scale(5 5)'
            });
            var block;
            block = makeSVG('polygon', {
                points: '17,3 11,3 10,1 9,3 3,4 1,2 3,6 1,8 4,6 14,6 15,5 14,4 17,3',
                fill: 'rgb(50,50,50)'
            });
            group.appendChild(block);
            block = makeSVG('polyline', {
                points: '13,4 13,6',
                lineWidth: 0.5,
            });
            group.appendChild(block);
            $("#canvas").append(group);
            shark.push(group);
            shark_x.push(x);
            shark_y.push(y);

            // put water behind the shark
            block = makeSVG('rect', {
            x: x * blockSize,
            y: y * blockSize,
            width: blockSize,
            height: blockSize,
            opacity: 1/2,
            fill: 'rgb(0,144,255)'
            });
            $("#canvas").append(block);
        }
        if (levels[level][i] == 6) {
            var block = makeSVG('polygon', {
                points: (""+(x*blockSize)+","+((y+1)*blockSize)+" "+((x+1)*blockSize)+","+((y+1)*blockSize)+" "+((x+1/2)*blockSize)+","+(y*blockSize)),
                fill: 'rgb(0,255,0)'
            });
            $("#canvas").append(block);
        }
        if (levels[level][i] == 7) {
            var block = makeSVG('rect', {
                x: x * blockSize,
                y: y * blockSize,
                width: blockSize,
                height: blockSize,
                fill: 'rgb(255,83,0)',
                opacity: 3/4
            });
            $("#canvas").append(block);
        }
        if (levels[level][i] == 9) {
            ball = makeSVG('circle',
                {cx: 25+x*blockSize, cy: 25+y*blockSize,
                    r: ballSize, stroke: skyColor, 'stroke-width': 0.0, fill:skyColor});
            $("#canvas").append(ball);
        }
    }
}
