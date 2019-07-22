//SFX CONST VOLUMES

const V_HIT = 0.2;
const V_PDCS = 0.4;
const V_EXP = 0.2;
const V_OOA = 0.4;

//sound actions
const play = 'play';
const pause = 'pause';
//sound list
const hit = 'hit';
const ooa = 'ooa'; //Out of Ammo
const pdcs = 'pdcs'; //Turrets
const explode1 = 'explode1'; //Asteroid Explosion

function playSound(sound, volume){
	document.getElementById(sound).volume = volume;
	document.getElementById(sound).play();
};

function pauseSound(sound, volume){
	document.getElementById(sound).pause();
	document.getElementById(sound).currentTime = 0;
};

function soundToggle(){
	if(world.sound){
		world.sound = false;
		world.sfx = false;
		document.getElementById('music').volume = 0;
		document.getElementById('sound-off').classList.remove('hide');
		document.getElementById('sound-on').classList.add('hide');
	} else {
		world.sound = true;
		world.sfx = true;
		document.getElementById('music').volume = 1;
		document.getElementById('sound-on').classList.remove('hide');
		document.getElementById('sound-off').classList.add('hide');
	}
};