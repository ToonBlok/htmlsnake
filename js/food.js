Food = (function() {

	"use strict";

	const size = 20;
	var x = 0;
	var y = 0;

	var spawn = function(ctx) {
		
		var collision;
		var randX;
		var randY;
		var timesTwenty = ctx.canvas.width / 20;

		do {
			randX = Math.floor(Math.random() * timesTwenty);
			randY = Math.floor(Math.random() * timesTwenty);

			collision = false;

			if (Snake.body.length != 0) {
				collision = Snake.body.some(function(element) {
					if (element.x == randX * 20 &&
						element.y == randY * 20) {
						//debugger;
						return true; 
					} 
				});
			}

		} while (Boolean(collision));

		x = randX * 20;
		y = randY * 20;

		if (Snake.body.length == 0) {
			debugger;
		}
		// Test if food spawns on tail
		Snake.body.forEach(function(element) {
			if (element.x == x &&
				element.y == y ) {
				console.log("SPAWNED ONTOP!");
				debugger;
			}
		});
	};

	
	return {
		spawn: spawn,
			
		getY: function() {
			return y;
		},

		getX: function() {
			return x;
		},

		draw: function(ctx) {
			ctx.fillStyle = "white";
			ctx.fillRect(x, y, size, size);
		}
	};
})();
