//Thanks to Mt. Ford Studios for their video that helped inspire this approach: https://www.youtube.com/channel/UCYGcMtRTLWQHgLq4V3bP3sA
//This game was created for www.TheExpanseLives.com
//Developer: Mikhail Thomas - me@mikhailthomas.com
const FPS = 30;
const SCALE = 30;
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

//SFX CONST VOLUMES

const V_HIT = 0.2;
const V_PDCS = 0.4;
const V_EXP = 0.2;
const V_OOA = 0.4;

// color pallete
const asteroidColor = 'deepskyblue';
const innerThrustColor = 'lightcyan';
const outerThrustColor = 'deepskyblue';
const bulletColor = 'gold';

var canv = document.getElementById('space'),
	ctx = canv.getContext('2d');
	ctx.canvas.width  = window.innerWidth - 200;
  	ctx.canvas.height = window.innerHeight;

var curFrame = 0;
var cakeCount = 0;

var ship = {
	x: canv.width/2,
	y: canv.height/2,
	r: 30,
	inv: false,
	a: toRads(90),
	rot: 0, //convert to radians
	accl: false,
	ammo: MAX_AMMO,
	reloading: false,
	vel: {
		x: 0,
		y: 0
	},
	firing: false,
	turret1: {
		x: 0,
		y: 0,
		a: toRads(90),
		bullet:[],
		draw(){
			procSound('hit', 'pause');
			ctx.strokeStyle = 'red',
			ctx.lineWidth = SCALE / 10;
			ctx.beginPath();
			ship.turret1.x = ship.x - 8 * Math.cos(ship.a-Math.PI/2);
			ship.turret1.y = ship.y - 8 * Math.sin(ship.a+Math.PI/2);

			ship.turret1.a = Math.atan2(world.mousey-ship.turret1.y, world.mousex-ship.turret1.x);

			ctx.moveTo(
				ship.turret1.x,
				ship.turret1.y
			);
			ctx.lineTo(
				ship.turret1.x + 10 * Math.cos(ship.turret1.a),
				ship.turret1.y + 10 * Math.sin(ship.turret1.a)
			);
			ctx.stroke();

			//draw bullet
			for(var i = 0; i < ship.turret1.bullet.length; i++){
				for(var j = 0; j < world.asteroids.count.length; j++){
					if(distBetweenPoints(ship.turret1.bullet[i].x, ship.turret1.bullet[i].y, world.asteroids.count[j].x,world.asteroids.count[j].y) < world.asteroids.count[j].r){
						world.asteroids.count[j].hp--;
						ship.turret1.bullet[i].live = false;
						if(currentState === State.Live){
							procSound('hit', 'play', V_HIT);
						}
						break;
					}
				}
				if(!ship.turret1.bullet[i].live){
					continue;
				}
				//ctx.fillStyle = 'gold';
				var cr = 'rgb('+
    				Math.floor(Math.random()*256)+','+
    				Math.floor(Math.random()*256)+','+
    				Math.floor(Math.random()*256)+')';
    			if(cakeCount < 3){
    				ctx.fillStyle = bulletColor; // set cr if color mode
    			} else {
    				ctx.fillStyle = cr;
    			}
				ctx.beginPath();
				ctx.arc(ship.turret1.bullet[i].x,ship.turret1.bullet[i].y, SCALE/15, 0, Math.PI * 2, false);
				ctx.fill();
			}

			//move bullets
			for(var i = 0; i < ship.turret1.bullet.length; i++){
				if(!ship.turret1.bullet[i].live){
					ship.turret1.bullet.splice(i, 1);
					continue;
				}
				ship.turret1.bullet[i].x += ship.turret1.bullet[i].xvel;
				ship.turret1.bullet[i].y += ship.turret1.bullet[i].yvel;
				if(ship.turret1.bullet[i].x >= canv.width || ship.turret1.bullet[i].x <= 0 || ship.turret1.bullet[i].y >= canv.height || ship.turret1.bullet[i].y <= 0){
					ship.turret1.bullet.splice(i,1);
				}
			}

		}
	},
	turret2: {
		x: 0,
		y: 0,
		a: toRads(90),
		bullet:[],
		draw(){
			ctx.strokeStyle = 'red',
			ctx.lineWidth = SCALE / 10;
			ctx.beginPath();
			ship.turret2.x = ship.x + 8 * Math.cos(ship.a-Math.PI/2);
			ship.turret2.y = ship.y + 8 * Math.sin(ship.a+Math.PI/2);

			ship.turret2.a = Math.atan2(world.mousey-ship.turret2.y, world.mousex-ship.turret2.x);

			ctx.moveTo(
				ship.turret2.x,
				ship.turret2.y
			);
			ctx.lineTo(
				ship.turret2.x + 10 * Math.cos(ship.turret2.a),
				ship.turret2.y + 10 * Math.sin(ship.turret2.a)
			);
			ctx.stroke();

			//draw bullet
			for(var i = 0; i < ship.turret2.bullet.length; i++){
				for(var j = 0; j < world.asteroids.count.length; j++){
					if(distBetweenPoints(ship.turret2.bullet[i].x, ship.turret2.bullet[i].y, world.asteroids.count[j].x,world.asteroids.count[j].y) < world.asteroids.count[j].r){
						world.asteroids.count[j].hp--;
						ship.turret2.bullet[i].live = false;
						if(currentState === State.Live){
							procSound('hit', 'play', V_HIT);
						}
						break;
					}
				}
				if(!ship.turret2.bullet[i].live){
					continue;
				}
				//ctx.fillStyle = 'gold';
				var cr = 'rgb('+
    				Math.floor(Math.random()*256)+','+
    				Math.floor(Math.random()*256)+','+
    				Math.floor(Math.random()*256)+')';
    			if(cakeCount < 3){
    				ctx.fillStyle = bulletColor; // set cr if color mode
    			} else {
    				ctx.fillStyle = cr;
    			}
				ctx.beginPath();
				ctx.arc(ship.turret2.bullet[i].x,ship.turret2.bullet[i].y, SCALE/15, 0, Math.PI * 2, false);
				ctx.fill();
			}

			//move bullets
			for(var i = 0; i < ship.turret2.bullet.length; i++){
				if(!ship.turret2.bullet[i].live){
					ship.turret2.bullet.splice(i, 1);
					continue;
				}
				ship.turret2.bullet[i].x += ship.turret2.bullet[i].xvel;
				ship.turret2.bullet[i].y += ship.turret2.bullet[i].yvel;
				if(ship.turret2.bullet[i].x >= canv.width || ship.turret2.bullet[i].x <= 0 || ship.turret2.bullet[i].y >= canv.height || ship.turret2.bullet[i].y <= 0){
					ship.turret2.bullet.splice(i,1);
				}
			}

		}
	},
	fire(){
		if(ship.firing){
			if(ship.ammo > 0 && !ship.reloading){
				procSound('ooa', 'pause');
				procSound('pdcs', 'play', V_PDCS);
				ship.ammo--;
				ship.turret1.bullet.push({
				x: ship.turret1.x + 15 * Math.cos(ship.turret1.a),
				y: ship.turret1.y + 15 * Math.sin(ship.turret1.a),
				xvel: BULLET_SPEED * Math.cos(ship.turret1.a),
				yvel: BULLET_SPEED * Math.sin(ship.turret1.a),
				live: true
				})
			} else {
				procSound('pdcs', 'pause');
				procSound('ooa', 'play', V_OOA);
			};
			if(ship.ammo > 0 && !ship.reloading){
				ship.ammo--;
				ship.turret2.bullet.push({
				x: ship.turret2.x + 15 * Math.cos(ship.turret2.a),
				y: ship.turret2.y + 15 * Math.sin(ship.turret2.a),
				xvel: BULLET_SPEED * Math.cos(ship.turret2.a),
				yvel: BULLET_SPEED * Math.sin(ship.turret2.a),
				live: true
				})
			};
			if(ship.ammo === 0) {
				ship.reloading = true;
				updateAmmo();
				setTimeout(reload, RELOAD_TIME);
			};
		} else {
			procSound('pdcs', 'pause');
			procSound('ooa', 'pause');
		}
	},
	draw(){
		for (var i = 0; i < world.asteroids.count.length; i++){
			if(ship.inv){
				document.getElementById('ammo').classList.add('cheat');
			}
			if(distBetweenPoints(ship.x, ship.y, world.asteroids.count[i].x, world.asteroids.count[i].y) < ship.r + world.asteroids.count[i].r && !ship.inv){
				changeState(State.GameOver);
			}
		}
		if(currentState === State.Live){
			ctx.save();
			ctx.translate(ship.x,ship.y);
			ctx.rotate(-1*(ship.a-Math.PI/2));
			if(ship.accl){
				ctx.fillStyle = outerThrustColor;
				ctx.beginPath();
				ctx.arc(0,33, SCALE/5, 0, Math.PI * 2, false);
				ctx.fill();
				ctx.fillStyle = innerThrustColor;
				ctx.beginPath();
				ctx.arc(0,33, SCALE/10, 0, Math.PI * 2, false);
				ctx.fill();
			}
			ctx.drawImage(document.getElementById('roci'),-10,-31);
			ctx.restore();
		}

		if(HITBOX){
			ctx.strokeStyle = 'lime'
			ctx.beginPath();
			ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
			ctx.stroke();
		}
		

	},
	move(){
		//move ship
		if(ship.accl){
			ship.vel.x += SHIP_THRUST*Math.cos(ship.a) / FPS;
			ship.vel.y -= SHIP_THRUST*Math.sin(ship.a) / FPS;
		}
		ship.x += ship.vel.x;
		ship.y += ship.vel.y;
		
		if(ship.x >= canv.width){
			ship.x = 0;
		} else if(ship.x <= 0){
			ship.x = canv.width - 2;
		}
	
		if(ship.y >= canv.height){
			ship.y = 0;
		} else if(ship.y <= 0){
			ship.y = canv.height - 2;
		}
	},
	turn(){
		//rotate ship
		ship.a += ship.rot;
	}
},


world = {
	mousex: 0,
	mousey: 0,
	level: 1,
	sound: true,
	sfx: true,
	version: '1.0.5',
	hex: '0',
	particales: [],
	space(){
			//draw space
		if(cakeCount < 3){
			ctx.fillStyle = 'black'; //norm black
		} else {
			ctx.fillStyle = 'pink'; //norm black
		}
		
		ctx.fillRect(0, 0, canv.width, canv.height);
	},
	asteroids: {
		count: [],
		create(){
				do {
					x = Math.floor(Math.random() * canv.width);
					y = Math.floor(Math.random() * canv.height);
				} while (distBetweenPoints(ship.x, ship.y, x, y) < AST_SIZE * 2 + ship.r * 5);
				vert = Math.floor(Math.random() * (AST_VERT + 1) + (AST_VERT/2));
				offs = [];
				for(var i = 0; i < vert; i++){
					offs.push(Math.random() * AST_JAG * 2 + 1 - AST_JAG)
				}
			var tempHP = Math.floor(Math.random() * AST_HP);
			world.asteroids.count.push({
				x: x,
				y: y,
				xv: Math.random() * AST_VELOCITY / FPS * (Math.random() < 0.5 ? 1 : -1),
				yv: Math.random() * AST_VELOCITY / FPS * (Math.random() < 0.5 ? 1 : -1),
				r: (Math.random() + .50) * AST_SIZE / 2,
				a: Math.random() * Math.PI * 2,
				rot: Math.random() - Math.random(),
				vert: vert,
				offs: offs,
				maxHP: tempHP,
				hp: tempHP,
				pv: tempHP,
				live: true
			})
		},
		draw(){
			for(var i = 0; i < world.asteroids.count.length; i++){
				if(world.asteroids.count[i].hp <= 0){
					score += world.asteroids.count[i].pv;
					calcScore();
					world.asteroids.count[i].live = false;
					continue;
				}
			}
			ctx.strokeStyle = asteroidColor;
			ctx.lineWidth = SCALE/10;
			for(var i = 0; i < world.asteroids.count.length; i++){
				if(!world.asteroids.count[i].live){
					continue;
				}
				//localize
				x = world.asteroids.count[i].x;
				y = world.asteroids.count[i].y;
				r = world.asteroids.count[i].r;
				a = world.asteroids.count[i].a;
				vert = world.asteroids.count[i].vert;
				offs = world.asteroids.count[i].offs;
				//draw a path
				//ctx.fillStyle = 'rgb(' + (255 - (Math.round(world.asteroids.count[i].hp/world.asteroids.count[i].maxHP)*255)) + '0,0)';
				var tempFill = 255 - ((world.asteroids.count[i].hp/world.asteroids.count[i].maxHP)*255);
				ctx.fillStyle = 'rgb(0,0,' + tempFill + ')';
				ctx.beginPath();
				ctx.moveTo(
					x + r * offs[0] * Math.cos(a),
					y + r * offs[0] * Math.sin(a)
				)
				//draw polygon
				for(var j = 1; j <= vert; j++){
					ctx.lineTo(
						x + r *  offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
						y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
						)
				}
				ctx.closePath();
				ctx.stroke();
				ctx.fill();

				if(HITBOX){
					ctx.strokeStyle = 'lime'
					ctx.beginPath();
					ctx.arc(x, y, r, 0, Math.PI * 2, false);
					ctx.stroke();
				}
				//move the asteroids
				world.asteroids.count[i].x += world.asteroids.count[i].xv;
				world.asteroids.count[i].y += world.asteroids.count[i].yv;

				//rotate
				world.asteroids.count[i].a += world.asteroids.count[i].rot / FPS;

				//loop around
				if(world.asteroids.count[i].x + world.asteroids.count[i].r < 0){
					world.asteroids.count[i].x = canv.width;// - world.asteroids.count[i].r;
				} else if(world.asteroids.count[i].x - world.asteroids.count[i].r > canv.width ){
					world.asteroids.count[i].x = 0;// + world.asteroids.count[i].r;
				}

				if(world.asteroids.count[i].y + world.asteroids.count[i].r < 0){
					world.asteroids.count[i].y = canv.height;// + world.asteroids.count[i].r;
				} else if(world.asteroids.count[i].y  - world.asteroids.count[i].r > canv.height){
					world.asteroids.count[i].y = 0;// + world.asteroids.count[i].r
				}
			}
			for(var i = 0; i < world.asteroids.count.length; i++){
				if(!world.asteroids.count[i].live){
					if(world.sfx) {
						procSound('explode1', 'play', V_EXP);
					}
					world.asteroids.count.splice(i, 1);
					if(world.asteroids.count.length % 2 === 1){
						quoteCrew();
					}
				}
			}
			if(world.asteroids.count.length === 0){
				nextLevel();
			}
		},
	}
}
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
		ship.move();
		ship.turn();
		world.asteroids.draw();
		ship.turret1.draw();
		ship.turret2.draw();
		ship.fire();
		ship.draw();
		updateAmmo();
	}
}

function reload(){
	if(ship.reloading){
		procSound('pdcs', 'pause');
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
	ship.turret1.bullet = [];
	ship.turret2.bullet = [];
	ship.x = canv.width/2;
	ship.y = canv.height/2;
	ship.r = 30;
	ship.a = toRads(90);
	ship.rot = 0; //convert to radians
	ship.accl = false;
	ship.vel = {
		x: 0,
		y: 0
	}
	changeState(State.Live);
	calcScore();
	reload();
}

function toRads(deg){
	return deg / 180 * Math.PI;
}