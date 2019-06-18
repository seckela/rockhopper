function Ship(){
	return {
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
		turret1: new Turret(-8,-8),
		turret2: new Turret(8, 8),
		fire(){
			if(this.firing){
				if(this.ammo > 0 && !this.reloading){
					pauseSound('ooa');
					playSound('pdcs', V_PDCS);
					this.ammo--;
					this.turret1.bullet.push({
					x: this.turret1.x + 15 * Math.cos(this.turret1.a),
					y: this.turret1.y + 15 * Math.sin(this.turret1.a),
					xvel: BULLET_SPEED * Math.cos(this.turret1.a),
					yvel: BULLET_SPEED * Math.sin(this.turret1.a),
					live: true
					})
				} else {
					pauseSound('pdcs');
					playSound('ooa', V_OOA);
				};
	
				if(this.ammo > 0 && !this.reloading){
					this.ammo--;
					this.turret2.bullet.push({
					x: this.turret2.x + 15 * Math.cos(this.turret2.a),
					y: this.turret2.y + 15 * Math.sin(this.turret2.a),
					xvel: BULLET_SPEED * Math.cos(this.turret2.a),
					yvel: BULLET_SPEED * Math.sin(this.turret2.a),
					live: true
					})
				};
				if(this.ammo === 0) {
					this.reloading = true;
					updateAmmo();
					setTimeout(reload, RELOAD_TIME);
				};
			} else {
				pauseSound('pdcs');
				pauseSound('ooa');
			}
		},
		draw(){
			for (var i = 0; i < world.asteroids.count.length; i++){
				if(this.inv){
					document.getElementById('ammo').classList.add('cheat');
				}
				if(distBetweenPoints(this.x, this.y, world.asteroids.count[i].x, world.asteroids.count[i].y) < this.r + world.asteroids.count[i].r && !this.inv){
					changeState(State.GameOver);
				}
			}
			if(currentState === State.Live){
				ctx.save();
				ctx.translate(this.x,this.y);
				ctx.rotate(-1*(this.a-Math.PI/2));
				if(this.accl){
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
				ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
				ctx.stroke();
			}
			
	
		},
		move(){
			//move ship
			if(this.accl){
				this.vel.x += SHIP_THRUST*Math.cos(this.a) / FPS;
				this.vel.y -= SHIP_THRUST*Math.sin(this.a) / FPS;
			}
			this.x += this.vel.x;
			this.y += this.vel.y;
			
			if(this.x >= canv.width){
				this.x = 0;
			} else if(this.x <= 0){
				this.x = canv.width - 2;
			}
		
			if(this.y >= canv.height){
				this.y = 0;
			} else if(this.y <= 0){
				this.y = canv.height - 2;
			}
		},
		turn(){
			//rotate ship
			this.a += this.rot;
		},
		reset(){
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
			};
		}
	};
}