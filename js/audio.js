//sound actions
const play = 'play';
const pause = 'pause';
//sound list
const hit = 'hit';
const ooa = 'ooa'; //Out of Ammo
const pdcs = 'pdcs'; //Turrets
const explode1 = 'explode1'; //Asteroid Explosion

var playSound = function(sound, volume){
	document.getElementById(sound).volume = volume;
	document.getElementById(sound).play();
};

var pauseSound = function(sound, volume){
	document.getElementById(sound).pause();
	document.getElementById(sound).currentTime = 0;
};

var soundToggle = function(){
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