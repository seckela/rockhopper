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
	update(){
			this.asteroids.draw();
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
			this.count.push({
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
			for(var i = 0; i < this.count.length; i++){
				if(this.count[i].hp <= 0){
					score += this.count[i].pv;
					calcScore();
					this.count[i].live = false;
					continue;
				}
			}
			ctx.strokeStyle = asteroidColor;
			ctx.lineWidth = SCALE/10;
			for(var i = 0; i < this.count.length; i++){
				if(!this.count[i].live){
					continue;
				}
				//localize
				x = this.count[i].x;
				y = this.count[i].y;
				r = this.count[i].r;
				a = this.count[i].a;
				vert = this.count[i].vert;
				offs = this.count[i].offs;
				//draw a path
				//ctx.fillStyle = 'rgb(' + (255 - (Math.round(this.count[i].hp/this.count[i].maxHP)*255)) + '0,0)';
				var tempFill = 255 - ((this.count[i].hp/this.count[i].maxHP)*255);
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
				this.count[i].x += this.count[i].xv;
				this.count[i].y += this.count[i].yv;

				//rotate
				this.count[i].a += this.count[i].rot / FPS;

				//loop around
				if(this.count[i].x + this.count[i].r < 0){
					this.count[i].x = canv.width;// - this.count[i].r;
				} else if(this.count[i].x - this.count[i].r > canv.width ){
					this.count[i].x = 0;// + this.count[i].r;
				}

				if(this.count[i].y + this.count[i].r < 0){
					this.count[i].y = canv.height;// + this.count[i].r;
				} else if(this.count[i].y  - this.count[i].r > canv.height){
					this.count[i].y = 0;// + this.count[i].r
				}
			}
			for(var i = 0; i < this.count.length; i++){
				if(!this.count[i].live){
					if(this.sfx) {
						playSound('explode1', V_EXP);
					}
					this.count.splice(i, 1);
					if(this.count.length % 2 === 1){
						quoteCrew();
					}
				}
			}
			if(this.count.length === 0){
				nextLevel();
			}
		},
	}
}
}