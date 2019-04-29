const state = {
	start: "START",
	live: "LIVE",
	pause: "PAUSE",
	gameover: "GAMEOVER"
}

let currentState = state.start;

if (!state) {
  throw new Error("state is not defined");
}

var changeState = function(relState){
	currentState = relState;
	switch(currentState){
	case state.start:

	case state.live:

	case state.pause:

	case state.gameover:
		gameState = 1;
		ship.firing = false;
		procSound('pdcs', 'pause');
		procSound('ooa', 'pause');
		procSound('hit', 'pause');
		document.getElementById('goHex').innerHTML = world.hex;
		document.getElementById('goLevel').innerHTML = 'Level: ' + world.level;
		document.getElementById('go').classList.remove('hide');
	}
}
