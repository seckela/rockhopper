const State = {
	Start: "START",
	Live: "LIVE",
	Pause: "PAUSE",
	GameOver: "GAMEOVER"
}

let currentState = State.Live;

if (!State) {
  throw new Error("state is not defined");
}

var changeState = function(relState){
	currentState = relState;
	switch(currentState){
	case State.Start:
		break;
	case State.Live:
		document.getElementById('pause').classList.add('hide');
		document.getElementById('go').classList.add('hide');
		break;
	case State.Pause:
		document.getElementById('pause').classList.remove('hide');
		break;
	case State.GameOver:
		ship.firing = false;
		procSound('pdcs', 'pause');
		procSound('ooa', 'pause');
		procSound('hit', 'pause');
		document.getElementById('goHex').innerHTML = world.hex;
		document.getElementById('goLevel').innerHTML = 'Level: ' + world.level;
		document.getElementById('go').classList.remove('hide');
		break;
	}
}
