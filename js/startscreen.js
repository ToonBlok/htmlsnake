var startScreen = (function(input) {

    function centerText(ctx, text, y) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
        ctx.fillText(text, x, y);
    }
    
    function draw(ctx, elapsed) {
        
        var y = ctx.canvas.height / 2;
        
        var color = 'rgb(255,0,0)';
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '48px monospace';
        centerText(ctx, 'Snake', y);

        ctx.fillStyle = color;
        ctx.font = '24px monospace';
        centerText(ctx, 'click to begin', y + 30);
    }

    function update() {

    }

    return {
		active: false,
        draw: draw,
        update: update
    };

}());
