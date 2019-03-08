function procSound(sound, action, volume){
	if(world.sound && action == "play"){
		document.getElementById(sound).volume = volume;
		document.getElementById(sound).play();
	} else {
		document.getElementById(sound).pause();
		document.getElementById(sound).currentTime = 0;
	}
}