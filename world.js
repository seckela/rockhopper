function World(){
	return {
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
			this.asteroids.count.push({
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
			for(var i = 0; i < this.asteroids.count.length; i++){
				if(this.asteroids.count[i].hp <= 0){
					score += this.asteroids.count[i].pv;
					calcScore();
					this.asteroids.count[i].live = false;
					continue;
				}
			}
			ctx.strokeStyle = asteroidColor;
			ctx.lineWidth = SCALE/10;
			for(var i = 0; i < this.asteroids.count.length; i++){
				if(!this.asteroids.count[i].live){
					continue;
				}
				//localize
				x = this.asteroids.count[i].x;
				y = this.asteroids.count[i].y;
				r = this.asteroids.count[i].r;
				a = this.asteroids.count[i].a;
				vert = this.asteroids.count[i].vert;
				offs = this.asteroids.count[i].offs;
				//draw a path
				//ctx.fillStyle = 'rgb(' + (255 - (Math.round(this.asteroids.count[i].hp/this.asteroids.count[i].maxHP)*255)) + '0,0)';
				var tempFill = 255 - ((this.asteroids.count[i].hp/this.asteroids.count[i].maxHP)*255);
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
				this.asteroids.count[i].x += this.asteroids.count[i].xv;
				this.asteroids.count[i].y += this.asteroids.count[i].yv;

				//rotate
				this.asteroids.count[i].a += this.asteroids.count[i].rot / FPS;

				//loop around
				if(this.asteroids.count[i].x + this.asteroids.count[i].r < 0){
					this.asteroids.count[i].x = canv.width;// - this.asteroids.count[i].r;
				} else if(this.asteroids.count[i].x - this.asteroids.count[i].r > canv.width ){
					this.asteroids.count[i].x = 0;// + this.asteroids.count[i].r;
				}

				if(this.asteroids.count[i].y + this.asteroids.count[i].r < 0){
					this.asteroids.count[i].y = canv.height;// + this.asteroids.count[i].r;
				} else if(this.asteroids.count[i].y  - this.asteroids.count[i].r > canv.height){
					this.asteroids.count[i].y = 0;// + this.asteroids.count[i].r
				}
			}
			for(var i = 0; i < this.asteroids.count.length; i++){
				if(!this.asteroids.count[i].live){
					if(this.sfx) {
						playSound('explode1', V_EXP);
					}
					this.asteroids.count.splice(i, 1);
					if(this.asteroids.count.length % 2 === 1){
						quoteCrew();
					}
				}
			}
			if(this.asteroids.count.length === 0){
				nextLevel();
			}
		},
	}
}
}