document.getElementById("console").style.height = window.innerHeight + "px";

var quotes = ['Alex: "Ladies and gentlemen, please sit back, relax and enjoy the ride."','Alex: "Here comes the juice."','Amos: "Well, I\'m not a homicidal maniac"', 'Amos: "I don\'t shit where I eat."', 'Miller: "I need you to know, whatever happens, wherever you go, you\'re not gonna do it alone."','Holden: "As long as we\'re living and breathing, there\'s more we can do. We just have to be strong enough."','Drummer: "We are the Belt. We are strong, we are sharp, and we don\'t feel fear.    This moment belong to us. For Beltalowda! Beltalowda! Beltalowda!"', 'Drummer: "We need to hydrate. With beers!"','Naomi: "Whatever - punch it..."','Bobbie: "Hitch your tits and pucker up, it\'s time to peel the paint!"','Avasarala: "You\'ve done your planet a great service!"','Avasarala: "Just get to the fucking point"','Avasarala: "Earth must come first."','Bobbie: "Who are we!?"','Miller: "Stars are better off without us."','Holden: "This will be a high-G maneuver. Prepare for flip and burn."','Alex: "Right, sweetheart. You know how much I love you."','Avasarala: "This concerns me? How?"','Amos: "Should I smoke him?"','Amos: "I knew a lady named Rocinante. She was good to me."','Dawes: "We\'re going to have a nice long talk, you and I. How long, depends on you."','Amos: "This little jaunt just got a whole lot more interesting."','Amos: "Welcome to the Churn."','Amos: "Bomb\'s away. I\'ve always wanted to say that."','Dawes: "Usually, when a man is about to lose everything, he realizes what mattered to him most. He sees it clearly for the first time."','Fred: "Our first priority is to protect ourselves. And that means we\'re gonna take advantage of every edge we\'ve got."','Fred: "In this world that we live in, in order to survive, you have to pick a side."','Fred: "None of us can change the things we\'ve done. But we can all change what we do next."','Naomi: "I fix ships, not people!"','Naomi: "I have no resentments. I don\'t believe in causes and I will not be your scapegoat."','Naomi: "I could\'ve been better. I didn\'t even get to say goodbye."','Miller: "I ain\'t sitting this one out."','Miller: "Everybody stay sharp and watch the doors and corners. Doors and corners\'s where they get ya."','Bobbie: "Marines, who do we fight for?"','Diogo: "Relax pampaw. A good rock hopper always bring a spare."','Miller: "You don\'t even know what you\'re fighting for."','Miller: "God I hate space."','Holden: "We just stand course and mind our business. Just a run of the mill gas hauler."'];
var score = 0;
var world = {
	hex: '0',
	version: '0'
	};
var scoreDisp = "";

function calcScore(){
	scoreDisp = "";
	offset = String(score).length;
	for(var i = 0; i < 8 - offset; i++){
		scoreDisp += "0"
	}
	var tempLvl = 'RB.00-' + Math.pow(world.level, 4) + 'x',
		tempScore = 'DP.0X1-04-00' + (score*1.425) + "-ED";
		world.hex = "v" + world.version + " | " + tempLvl + " | " + tempScore;
	scoreDisp += String(score);
	document.getElementById("score").innerHTML = scoreDisp;
	document.getElementById("subScore").innerHTML = scoreDisp;
}

function updateAmmo(){
	if(ship.ammo > 0 && !ship.reloading){
		document.getElementById("ammo").innerHTML = "Ammo: " + ship.ammo;
	} else {
		document.getElementById("ammo").innerHTML = "Reloading";
	}
}

function messageIngest(message,container){
	var span = document.createElement("span");
	var text = document.createTextNode(message);
	span.classList.add("message");
	span.appendChild(text);
	document.getElementById(container).append(span);
}
function quoteCrew(){
	if(quotes.length > 0){
		var messageNum = Math.floor(Math.random() * quotes.length);
		messageIngest(quotes[messageNum],"console");
		quotes.splice(messageNum, 1);
	};

}

calcScore();