var Snake = (function() {

	"use strict";

	const size = 20;
	const step = 20;
	const direction = Object.freeze({UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3});
	const eatSound = new Audio("resources/eat.wav"); // buffers automatically when created

	var x = 0;
	var y = 0;
	var body = [];
	var trail = [];
	var snakeDir;

	var collision = function (entity) {
		var entityX;
		var entityY;

		if (entity instanceof Tailpiece) {
			entityX = entity.x;
			entityY = entity.y;
		} else {
			entityX = entity.getX();
			entityY = entity.getY();
		}

		if (Snake.getX() == entityX && 
			Snake.getY() == entityY) { 
			return true;
		} else {
			return false;
		}
	};

	var outOfBounds = function (ctx) {
		if ((Snake.getX() + Snake.size) > ctx.canvas.width ||
			 Snake.getX() < 0 ||
			(Snake.getY() + Snake.size) > ctx.canvas.height ||
			 Snake.getY() < 0) {
			return true;
		} else {
			return false;
		}
	};

	var move = function() {
		switch(Snake.snakeDir) {
			case 0:
				y -= step;
				break;
			case 1:
				x += step;
				break;
			case 2:
				y += step;
				break;
			case 3:
				x -= step;
				break;
		} 
		trail.push({x: x, y: y});
		Game.inputLock = false;
	};

	function round(pos) {
		var diff = pos % 20;

		if (diff >= 10) { 
			pos += 20 - diff;
		} else if (diff > 0 && diff < 10) {
			pos -= diff;
		}

		return pos;
	};

	function eat(){
		eatSound.play();
		var tailpiece = new Tailpiece(trail[trail.length - 2].x, trail[trail.length - 2].y)
		body.push(tailpiece);
		Game.score++;
	};

	return {
		direction: direction,
		size: size,
		body: body,
		trail: trail,

		init: function(ctx) {
			var initialX = round(ctx.canvas.width / 2);
			var initialY = round(ctx.canvas.height / 2);


			trail.push({x: initialX, y: initialY});
			x = initialX;
			y = initialY;

			this.snakeDir = 0;
			this.dead = false;
			body = [];
		},

		testAddBody: function() {
			var tailpiece = new Tailpiece(trail[trail.length - 2].x, trail[trail.length - 2].y)
			body.push(tailpiece);
		},

		debugTestBody: function() {
			//console.log("Snake.x = " + Snake.getX());
			//console.log("Snake.y = " + Snake.getY());
			for (let i = 0; i < body.length; i++) {
				console.log("body[" + i + "] is " + body[i].x + ", " + body[i].y);
				if (body[i].x == Food.getX() && body[i].y == Food.getY()) {
					debugger;
				}
			}

		},

		//debugLogTrail: function() {
		//	for (let i = 0; i < trail.length; i++) {
		//		console.log("trail[" + i + "] is " + trail[i][0][0] + ", " + trail[i]);
		//	}

		//},

		update: function(ctx) {
			move();

			var trailI = trail.length - 2;

			for (let i = 0; i < body.length; i++) {
				body[i].x = trail[trailI].x;
				body[i].y = trail[trailI].y; // trail[max] = the head location
				trailI--;
			}

			if (outOfBounds(ctx)) {
				this.dead = true;
			}
				
			if (collision(Food)) {
				Food.spawn(ctx);
				eat();
			}
				
			for (let i = 0; i < body.length; i++) {
				if (collision(body[i])) {
					this.dead = true;
				}
			}

			if (trail.length > body.length + 2) {
				trail.splice(0, 1);
			}
		},

		draw: function(ctx) {
			ctx.fillRect(x, y, size, size);

			for (let i = 0; i < body.length; i++) {

				let rand = Math.floor(Math.random() * 4);

				switch(rand) {
					case 0:
						ctx.fillStyle = "orange";
						break;
					case 1:
						ctx.fillStyle = "red";
						break;
					case 2:
						ctx.fillStyle = "green";
						break;
					case 3:
						ctx.fillStyle = "blue";
						break;
				};
				
				body[i].draw(ctx);

			}
		},

		getY: function() {
			return y;
		},

		getX: function() {
			return x;
		}
	};
})();
