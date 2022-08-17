
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var gap = 90;

document.addEventListener("keydown", moveUp);
function moveUp() {
    yPos -= 25;
}


var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0 // //
}

var score = 0;
var xPos = 100;
var yPos = 150;
var grav = 0.8;


function draw() { 
    ctx.drawImage(bg, 0, 0); // Отрисовка фона
    for (var i = 0; i < pipe.length; i++) { 
        // ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        let num = 10
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x -= num; 
        
        if (pipe[i].x == 5) { 
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        
        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
            &&
            (yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height || yPos <= 0) {
                location.reload(); 
            }
    
            if (pipe[i].x == 5) { 
                score++;
            }
        }

    ctx.drawImage(fg, 0, cvs.height - fg.height); 
    ctx.drawImage(bird, xPos, yPos); 
    
    yPos += grav; 

    ctx.fillStyle = "#000"; 
    ctx.font = "24px Verdana"; 
    ctx.fillText("Счет: " + score, 10, cvs.height - 20); 

    requestAnimationFrame(draw); 
}


pipeBottom.onload = draw; 
