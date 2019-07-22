//Thanks to Mt. Ford Studios for their video that helped inspire this approach: https://www.youtube.com/channel/UCYGcMtRTLWQHgLq4V3bP3sA
//This game was created for www.TheExpanseLives.com
//Developer: Mikhail Thomas - me@mikhailthomas.com
const FPS = 30;
const SCALE = 30; // Res(H*W/69120)
const TURN_SPEED = 360;
const SHIP_THRUST = 5;
const BULLET_SPEED = 10;
const AST_NUM = 6;
const AST_SIZE = 100;
const AST_VELOCITY = 50;
const AST_VERT = 12;
const AST_JAG = 0.2; //Jaggedness (0 = none)
const AST_HP = 200;
const HITBOX = false;
const MAX_AMMO = 200;
const RELOAD_TIME = 2000;


// color pallete
const asteroidColor = 'deepskyblue';
const innerThrustColor = 'lightcyan';
const outerThrustColor = 'deepskyblue';
const bulletColor = 'gold';

//canvas settings
var canv = document.getElementById('space'),
	ctx = canv.getContext('2d');
	ctx.canvas.width  = window.innerWidth - 200;
  	ctx.canvas.height = window.innerHeight;

var curFrame = 0;
var cakeCount = 0;

var ship = new Ship();
var world = new World();

// Create Asteroids
function createAsteroids(){
	for(var i = 0; i < (AST_NUM * world.level)/2; i++){
		world.asteroids.create();
	}
}

createAsteroids();
calcScore();
document.getElementById('patch').innerHTML = ' v' + world.version;

messageIngest('Starting Level: ' + world.level, 'console');

function explode(x, y, type){
 //build this please!
}

function distBetweenPoints(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x2 -x1, 2) + Math.pow(y2 - y1, 2));
}

//Game Tick
setInterval(update, 1000/FPS);

function frameCount(){
	curFrame++;
}

//event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('mousemove', target);
document.addEventListener('mousedown', function(e){
	ship.firing = true;
	e.preventDefault();
	if(currentState === State.GameOver){
		resetGame();
	}
});
document.addEventListener('mouseup', function(e){
	ship.firing = false;
	e.preventDefault();
});

window.addEventListener('resize', function(){
  canv.width = w = window.innerWidth;
  canv.height = h = window.innerHeight;
  document.getElementById('console').style.height = window.innerHeight + 'px';
}, false);

document.getElementById('sound').addEventListener('click', function(e){
	e.preventDefault();
	soundToggle();
});

	
function keyDown(e){
	switch(e.keyCode){
		case 32:
			ship.firing = true;
		break;
		case 82:
			if(ship.ammo < MAX_AMMO){
				ship.reloading = true;
				updateAmmo();
				setTimeout(reload, RELOAD_TIME);
			}
		break;
		case 27:
			if(currentState === State.Live){
				changeState(State.Pause);
			} else if(currentState === State.Pause){
				changeState(State.Live);
			}
		break;
		case 57:
			cakeCount++;
		break;
		case 77:
			soundToggle(e);
		break;
		case 65:
		case 37: //left arrow
			ship.rot = toRads(TURN_SPEED)/FPS;
		break;
		case 87:
		case 38: //up arrow
			ship.accl = true;			
		break;
		case 68:
		case 39: //right arrow
			ship.rot = -1*toRads(TURN_SPEED)/FPS;
		break;
		case 83:
		case 40: //down arrow - turn and burn
			ship.a = Math.atan2(ship.vel.y,-1*ship.vel.x);
		break;
	}
}

function keyUp(e){
	switch(e.keyCode){
		case 32:
			ship.firing = false;
		break;
		case 65:
		case 37: //left arrow
			ship.rot = 0;
		break;
		case 87:
		case 38: //up arrow
			ship.accl = false;
		break;
		case 68:
		case 39: //right arrow
			ship.rot = 0;
		break;
		case 83:
		case 40: //down arrow

		break;
	}
}
function target(e){
	world.mousex = e.clientX;
	world.mousey = e.clientY;
}

function update() {
	world.space();
	if(currentState === State.Live){
		frameCount();
		ship.update();
		world.update();
	}
}

function reload(){
	if(ship.reloading){
		pauseSound('pdcs');
		ship.ammo = MAX_AMMO;
		ship.reloading = false;
	}
}

function nextLevel(){
	world.level++;
	var message = document.getElementsByClassName('message');
	while(message[0]){
		message[0].parentNode.removeChild(message[0]);
	}
	messageIngest('Starting Level: ' + world.level, 'console');
	document.getElementById('level').innerHTML = 'Level: ' + world.level;
	document.getElementById('level').classList.remove('hide');
	setTimeout(function(){ document.getElementById('level').classList.add('hide'); }, 2000);
	createAsteroids();
}

function resetGame() {
	var message = document.getElementsByClassName('message');
	while(message[0]){
		message[0].parentNode.removeChild(message[0]);
	}
	world.level = 1;
	messageIngest('Starting Level: ' + world.level, 'console');
	document.getElementById('go').classList.add('hide');
	score = 0;
	calcScore();
	world.asteroids.count = [];
	createAsteroids();
	ship.reset();
	changeState(State.Live);
	calcScore();
	reload();
}

function toRads(deg){
	return deg / 180 * Math.PI;
}