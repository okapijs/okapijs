if (typeof(library) == "undefined") {
	library = {};
}
	
library.geo04 = function() {
	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", 52);
	canvas.setAttribute("height", 52);	
	var ctx = canvas.getContext("2d");
	
	// geo04/Compound Path
	
	ctx.save();
	ctx.beginPath();

	// geo04/Compound Path/Path
	ctx.moveTo(25.5, 10.5);
	ctx.lineTo(15.5, 0.5);
	ctx.lineTo(0.5, 15.5);
	ctx.lineTo(10.5, 25.5);
	ctx.lineTo(15.5, 20.5);
	ctx.lineTo(20.5, 25.5);
	ctx.lineTo(25.5, 20.5);
	ctx.lineTo(30.5, 15.5);
	ctx.lineTo(25.5, 10.5);
	ctx.closePath();

	// geo04/Compound Path/Path
	ctx.moveTo(15.5, 19.0);
	ctx.lineTo(12.0, 15.5);
	ctx.lineTo(15.5, 12.0);
	ctx.lineTo(19.0, 15.5);
	ctx.lineTo(15.5, 19.0);
	ctx.closePath();
	ctx.fillStyle = "rgb(235, 235, 235)";
	ctx.fill();
	ctx.lineWidth = 0.8;
	ctx.stroke();

	// geo04/Compound Path
	ctx.beginPath();

	// geo04/Compound Path/Path
	ctx.moveTo(35.5, 0.5);
	ctx.lineTo(25.5, 10.5);
	ctx.lineTo(30.5, 15.5);
	ctx.lineTo(25.5, 20.5);
	ctx.lineTo(30.5, 25.5);
	ctx.lineTo(35.5, 30.5);
	ctx.lineTo(40.5, 25.5);
	ctx.lineTo(50.5, 15.5);
	ctx.lineTo(35.5, 0.5);
	ctx.closePath();

	// geo04/Compound Path/Path
	ctx.moveTo(35.5, 19.0);
	ctx.lineTo(32.0, 15.5);
	ctx.lineTo(35.5, 12.0);
	ctx.lineTo(39.0, 15.5);
	ctx.lineTo(35.5, 19.0);
	ctx.closePath();
	ctx.fillStyle = "rgb(203, 203, 203)";
	ctx.fill();
	ctx.stroke();

	// geo04/Compound Path
	ctx.beginPath();

	// geo04/Compound Path/Path
	ctx.moveTo(40.5, 25.5);
	ctx.lineTo(35.5, 30.5);
	ctx.lineTo(30.5, 25.5);
	ctx.lineTo(25.5, 30.5);
	ctx.lineTo(20.5, 35.5);
	ctx.lineTo(25.5, 40.5);
	ctx.lineTo(35.5, 50.5);
	ctx.lineTo(50.5, 35.5);
	ctx.lineTo(40.5, 25.5);
	ctx.closePath();

	// geo04/Compound Path/Path
	ctx.moveTo(35.5, 39.0);
	ctx.lineTo(32.0, 35.5);
	ctx.lineTo(35.5, 32.0);
	ctx.lineTo(39.0, 35.5);
	ctx.lineTo(35.5, 39.0);
	ctx.closePath();
	ctx.fillStyle = "rgb(152, 152, 152)";
	ctx.fill();
	ctx.stroke();

	// geo04/Compound Path
	ctx.beginPath();

	// geo04/Compound Path/Path
	ctx.moveTo(25.5, 30.5);
	ctx.lineTo(20.5, 25.5);
	ctx.lineTo(15.5, 20.5);
	ctx.lineTo(10.5, 25.5);
	ctx.lineTo(0.5, 35.5);
	ctx.lineTo(15.5, 50.5);
	ctx.lineTo(25.5, 40.5);
	ctx.lineTo(20.5, 35.5);
	ctx.lineTo(25.5, 30.5);
	ctx.closePath();

	// geo04/Compound Path/Path
	ctx.moveTo(15.5, 39.0);
	ctx.lineTo(12.0, 35.5);
	ctx.lineTo(15.5, 32.0);
	ctx.lineTo(19.0, 35.5);
	ctx.lineTo(15.5, 39.0);
	ctx.closePath();
	ctx.fillStyle = "rgb(101, 101, 101)";
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	
	return canvas;
}