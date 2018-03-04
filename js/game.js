var Game = (function() {

	"use strict";

	var ctx = document.getElementById("screen").getContext("2d");

	var UP = 87;
	var RIGHT = 68;
	var DOWN = 83;
	var LEFT = 65;

	const gameOverSound = new Audio("resources/gameover.wav"); // buffers automatically when created

	document.onkeydown = function(e) {
		if (!Game.inputLock) {
			switch (e.keyCode) {
				case UP: 
					if (Snake.snakeDir != Snake.direction.DOWN) { 
						Snake.snakeDir = Snake.direction.UP;
					}
				break;
				case RIGHT: 
					if (Snake.snakeDir != Snake.direction.LEFT) { 
						Snake.snakeDir = Snake.direction.RIGHT;
					}
				break;
				case DOWN: 
					if (Snake.snakeDir != Snake.direction.UP) { 
						Snake.snakeDir = Snake.direction.DOWN;
					}
				break;
				case LEFT:
					if (Snake.snakeDir != Snake.direction.RIGHT) { 
						Snake.snakeDir = Snake.direction.LEFT;
					}
				break;
				case 73: 
					Snake.testAddBody();
					Food.spawn(document.getElementById("screen").getContext("2d"));
					Snake.debugTestBody();

				break;
				default:
					console.log("Action not recognized");
			}
			Game.inputLock = true;
		}
	};

	function handleMouseDown() {
		if (endingScreen.active || startScreen.active) {
			Game.newGame();
			endingScreen.active = false;
			startScreen.active = false;
		}
	};

	var frame = function() {
		now = timestamp();
		frameDuration = now - last;

		if(frameDuration > step) {
			frameDuration = 0;
			last = now;
			update();
			render();
		}

		window.requestAnimationFrame(frame);
	};

	var update = function() {
		if (Snake.dead && !Game.gameOver) {
			gameOverSound.play();
			Game.gameOver = true;
			endingScreen.active = true;
		}

		if (!gameActive) {
			startScreen.update(ctx);
		} else {
			if (!Game.gameOver) {
				Snake.update(ctx);
			} 
		}
	};

	var render = function() {
		if (!gameActive) {
			startScreen.draw(ctx);
		} else {
			if (!Game.gameOver) {
				draw();
				Food.draw(ctx);
				Snake.draw(ctx);
				drawScoreCounter(ctx);
			} else {
				endingScreen.draw(ctx);
			}
		}


	};

	var drawScoreCounter = function(ctx) {
		ctx.fillStyle = "white";
        ctx.fillText("Score: " + Game.score, 5, 25);
	};

	// duplicate function
    function centerText(ctx, text, y) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
		ctx.fillStyle = "black";
		ctx.fillRect(x, y - 30, measurement.width, 40);
		ctx.fillStyle = "white";
        ctx.fillText(text, x, y);
    }

	var showGameOverMessage = function()  {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		renderAnimation();
		ctx.font = "30px Arial";
		centerText(ctx, "Game over", ctx.canvas.height / 2);
	};


	var timestamp = function() {
		var timestamp = "";

		// if exist, and has subobject .now on it
		if (window.performance && window.performance.now) {
			timestamp = window.performance.now();
		} else {
			timestamp = new Date().getTime();
		}

		return timestamp;
	};

	var draw = function() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	};


	const screenWidth = 520;
	const screenHeight = 520;
	const step = 160;

	var frameDuration = 0;
	var now = 0;
	var last = timestamp();
	var inputLock = false;
	var gameActive = false;

	return {
		newGame: function() {
			//document.removeEventListener('mousedown', handleMouseDown);
			gameActive = true;
			Game.gameOver = false;
			Food.spawn(ctx);
			Snake.init(ctx);
			Game.score = 0;
		},

		init: function() {
			ctx.canvas.width = screenWidth;
			ctx.canvas.height = screenHeight;
			window.requestAnimationFrame(frame);
			document.addEventListener('mousedown', handleMouseDown);
			startScreen.active = true;
			this.score = 0;
		}

	};

}());
