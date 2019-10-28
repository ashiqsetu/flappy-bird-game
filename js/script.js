'use strict';
const cvs = document.getElementById("floppy");
const ctx = cvs.getContext("2d");

// load images
const bgImage = new Image();
bgImage.src = "img/bg.png";

const birdImage = new Image();
birdImage.src = "img/bird.png";

const fgImage = new Image();
fgImage.src = "img/fg.png";

const pipeNorthImage = new Image();
pipeNorthImage.src = "img/pipeNorth.png";

const pipeSouthImage = new Image();
pipeSouthImage.src = "img/pipeSouth.png";

// Load Audio
const flySound = new Audio();
flySound.src = "sound/fly.mp3";

const scoreSound = new Audio();
scoreSound.src = "sound/score.mp3";

const deadSound = new Audio();
deadSound.src = "sound/dead.mp3";

let gap = 330;
let constant =  pipeNorthImage.height + gap;
let birdXPosition = 10;
let birdYPosition = 150;
let gravity = 1.5;
let score = 0;


// key press
document.addEventListener("keydown", moveUp);
function moveUp(){
	birdYPosition -= 25;
	flySound.play();
}

// pipe cordinates
var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}

// draw everything to the canvas
function draw() {
	ctx.drawImage(bgImage,0,0);

	for(let i=0;i<pipe.length;i++){
		ctx.drawImage(pipeNorthImage,pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeSouthImage,pipe[i].x, pipe[i].y + constant);

		pipe[i].x--;

		if(pipe[i].x == 125){
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random()*pipeNorthImage.height) - pipeNorthImage.height
			});
		}

		// detect collision
		if(birdXPosition + birdImage.width >= pipe[i].x && birdXPosition <= pipe[i].x + pipeNorthImage.width &&
			(birdYPosition <= pipe[i].y + pipeNorthImage.height || birdYPosition +  birdImage.height >= pipe[i].y + constant)
			|| birdYPosition +  birdImage.height >= cvs.height - fgImage.height){
				dead.play();
				location.reload();
			}

			if(pipe[i].x == 5){
				score++;
				scoreSound.play();
			}
	}

	ctx.drawImage(fgImage,0,cvs.height - fgImage.height);
	ctx.drawImage(birdImage, birdXPosition, birdYPosition);

	birdYPosition += gravity;

	ctx.fillStyle = "#333";
	ctx.font ="20px Verdana";
	ctx.fillText("Score: "+score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}
//draw();
//let game = setInterval(draw,150);
//setInterval(draw,150);
//setInterval(draw);
window.onload = draw;
