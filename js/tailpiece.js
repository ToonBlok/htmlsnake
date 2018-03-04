function Tailpiece() {
	this.size = 20;

	this.init = function(x, y) {
		this.x = x;
		this.y = y;
	};

	this.draw = function(ctx) {
		ctx.fillRect(this.x, this.y, this.size, this.size);
	};
}
