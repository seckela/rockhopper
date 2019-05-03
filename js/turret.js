function Turret(xoff, yoff){
	let xOffSet = xoff;
	let yOffSet = yoff;

	return {
		x: 0,
		y: 0,
		a: toRads(90),
		bullet:[],
		draw(){
			pauseSound('hit');
			ctx.strokeStyle = 'red',
			ctx.lineWidth = SCALE / 10;
			ctx.beginPath();
			this.x = ship.x + xOffSet * Math.cos(ship.a-Math.PI/2);
			this.y = ship.y + yOffSet * Math.sin(ship.a+Math.PI/2);

			this.a = Math.atan2(world.mousey-this.y, world.mousex-this.x);

			ctx.moveTo(
				this.x,
				this.y
			);
			ctx.lineTo(
				this.x + 10 * Math.cos(this.a),
				this.y + 10 * Math.sin(this.a)
			);
			ctx.stroke();

			//draw bullet
			for(var i = 0; i < this.bullet.length; i++){
				for(var j = 0; j < world.asteroids.count.length; j++){
					if(distBetweenPoints(this.bullet[i].x, this.bullet[i].y, world.asteroids.count[j].x,world.asteroids.count[j].y) < world.asteroids.count[j].r){
						world.asteroids.count[j].hp--;
						this.bullet[i].live = false;
						if(currentState === State.Live){
							playSound('hit', V_HIT);
						}
						break;
					}
				}
				if(!this.bullet[i].live){
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
				ctx.arc(this.bullet[i].x,this.bullet[i].y, SCALE/15, 0, Math.PI * 2, false);
				ctx.fill();
			}

			//move bullets
			for(var i = 0; i < this.bullet.length; i++){
				if(!this.bullet[i].live){
					this.bullet.splice(i, 1);
					continue;
				}
				this.bullet[i].x += this.bullet[i].xvel;
				this.bullet[i].y += this.bullet[i].yvel;
				if(this.bullet[i].x >= canv.width || this.bullet[i].x <= 0 || this.bullet[i].y >= canv.height || this.bullet[i].y <= 0){
					this.bullet.splice(i,1);
				}
			}

		}
	}
}