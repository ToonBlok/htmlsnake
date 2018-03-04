var endingScreen = (function(input) {

	var renderAnimation = function(ctx) {

		let maxHorizontal = ctx.canvas.width / 20;
		let maxVertical = ctx.canvas.height / 20;

		for(let g = 0; g < maxHorizontal; g++) {
			for(let i = 0; i < maxVertical; i++) {
				let rand = Math.floor(Math.random() * 2);

				switch(rand) {
					case 0:
						ctx.fillStyle = "black";
						break;
					case 1:
						ctx.fillStyle = "rgb(141, 0, 0)";
						break;
				} 

				ctx.fillRect(g * 20, i * 20, 20, 20);
			}
		}
	};

    function centerText(ctx, text, y) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
		ctx.fillStyle = "black";
		ctx.fillRect(x, y - 30, measurement.width, 40);
		ctx.fillStyle = "white";
        ctx.fillText(text, x, y);
    }
    
    function draw(ctx, elapsed) {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		renderAnimation(ctx);
		ctx.font = "30px Arial";
		centerText(ctx, "Game over", ctx.canvas.height / 2);

        ctx.font = '24px monospace';
		centerText(ctx, "Score: " + Game.score, ctx.canvas.height / 2 + 30);
        centerText(ctx, 'click to restart', ctx.canvas.height / 2 + 60);
    }

    function update() {

    }

    return {
		active: false,
        draw: draw,
        update: update,
    };

}());

