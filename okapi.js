var okapi = (function() {
	//---------------------------------------------------------------------
	// Composite Types
	//---------------------------------------------------------------------
	var CompositeOperation = {};
	CompositeOperation.SOURCE_OVER		 = "source-over";
	CompositeOperation.SOURCE_IN		 = "source-in";
	CompositeOperation.SOURCE_OUT		 = "source-out";
	CompositeOperation.SOURCE_ATOP		 = "source-atop";
	CompositeOperation.DESTINATION_OVER	 = "distination-over";
	CompositeOperation.DESTINATION_IN	 = "destination-in";
	CompositeOperation.DESTINATION_OUT	 = "destination-out";
	CompositeOperation.DESTINATION_ATOP	 = "destination-atop";
	CompositeOperation.LIGHTER			 = "lighter";
	CompositeOperation.COPY				 = "copy";
	CompositeOperation.XOR				 = "xor";

	//---------------------------------------------------------------------
	// Sprite
	//---------------------------------------------------------------------
	var Sprite = function(canvasInfo, isCentered) {
	    var mw = 0;
	    var mh = 0;
	    
		this.cx = 0;
		this.cy = 0;
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.shadowBlur = 0;
		this.shadowOffsetX = 0;
		this.shadowOffsetY = 0;
		this.shadowColor = "rgba(0, 0, 0, 0)";
		this.alpha = 1;
		this.compositeOperation = "source-over";
		this.scaleList = [];
		
		if (canvasInfo instanceof Array) {
		    for (i=0; i<canvasInfo.length; ++i) {
		        this.scaleList[i] = {canvas:canvasInfo[i].canvas, scale:canvasInfo[i].scale, cx: 0, cy:0};
		        mw = Math.max(mw, canvasInfo[i].canvas.width);
		        mh = Math.max(mh, canvasInfo[i].canvas.height);
		    }
		    
		} else {
		    this.scaleList[0] = {canvas: canvasInfo, scale: 1, cx: 0, cy: 0};
		    mw = canvasInfo.width;
		    mh = canvasInfo.height;
		}
		
		this.scaleList = this.scaleList.sort(function(a, b) {return a.scale - b.scale});
		
		if (isCentered) {
		    for (i=0; i<this.scaleList.length; ++i) {
		        this.scaleList[i].cx = (mw * this.scaleList[i].scale) / 2;
		        this.scaleList[i].cy = (mh * this.scaleList[i].scale) / 2;
		    }
		}
	};
	
	Sprite.prototype.onBeforeDraw = function() {};
	Sprite.prototype.onAfterDraw = function() {};
	Sprite.prototype.draw = function(target) {
		var info = {};
		var version;
		var scale;
		var i, max;

		this.onBeforeDraw();

		info.shadowBlur = target.shadowBlur;
		info.shadowOffsetX = target.shadowOffsetX;
		info.shadowOffsetY = target.shadowOffsetY;
		info.shadowColor = target.shadowColor;
		info.globalAlpha = target.globalAlpha;
		info.globalCompositeOperation = target.globalCompositeOperation;			
		target.save();	  

		target.shadowBlur = this.shadowBlur;
		target.shadowOffsetX = this.shadowOffsetX;
		target.shadowOffsetY = this.shadowOffsetY;
		target.shadowColor = this.shadowColor;
		target.globalAlpha = this.alpha;
		target.globalCompositeOperation = this.compositeOperation;

		target.translate(this.x, this.y);			   
		target.rotate(this.rotation);
		
		scale = Math.max(this.scaleX, this.scaleY);
	
		
		max = this.scaleList.length;
		
		i = 0;
		while (i < max - 1 && scale > this.scaleList[i].scale) {
		    ++i;
		}
        
        version = this.scaleList[i];    
		
		target.scale((this.scaleX / version.scale), (this.scaleY / version.scale));	
		target.translate(-version.cx, -version.cy);
		target.drawImage(version.canvas, 0, 0);

		target.restore();
		target.shadowBlur = info.shadowBlur;
		target.shadowOffsetX = info.shadowOffsetX;
		target.shadowOffsetY = info.shadowOffsetY;
		target.shadowColor = info.shadowColor;
		target.globalAlpha = info.globalAlpha;
		target.globalCompositeOperation = info.globalCompositeOperation;			
		
		this.onAfterDraw();
	};
	
	//---------------------------------------------------------------------
	// Container
	//---------------------------------------------------------------------		   
	
	var Container = function(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', width);
		this.canvas.setAttribute('height', height);
		this.context = this.canvas.getContext('2d');
		this.displayList = [];
		this.continuous = false;
		this.length = 0;
	};
	
	Container.prototype.draw = function(target) {
		var max;
		var i;

		this.onBeforeDraw();
		// clear the canvas
		if (!this.continuous) {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}

		max = this.displayList.length;

		for (i=0; i<max; ++i) {
			this.displayList[i].draw(this.context);
		}
		
		if (target != null) {
			target.drawImage(this.canvas, 0, 0);
		}
		
		this.onAfterDraw();
	};
	
	Container.prototype.addChild = function(child) {
		++this.length;
		this.displayList.push(child);
	};
	
	Container.prototype.removeChild = function(child) {
		var index = this.displayList.indexOf(child);
		
		if (index > -1) {
			--this.length;
			this.displayList.splice(index, 1);
			return true;
		} else {
			return false;
		}
	};
	
	Container.prototype.removeChildFromIndex = function(index) {
		if (this.length > index && index > -1) {
			--this.length;
			this.displayList.splice(index, 1);
			return true;
		} else {
			return false;
		}
	};
	
	Container.prototype.removeAll = function() {
		while (this.removeChildFromIndex(0)){}
	};
	
	Container.prototype.onBeforeDraw = function() {};
	Container.prototype.onAfterDraw = function() {};
	
	//---------------------------------------------------------------------
	// Engine
	//---------------------------------------------------------------------
	var Engine = function (canvas) {
		this.runId = -1;
		this.displayList = [];
		this.continuous = false;
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	};
	
	Engine.prototype = new Container();
	
	Engine.prototype.start = function(interval) {
		var that = this;
		
		this.draw();
		clearInterval(this.runId);
		this.runId = setInterval(function() {
			that.draw.apply(that);
		}, interval);
	};
	
	Engine.prototype.clear = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	Engine.prototype.stop = function() {
		clearInterval(this.runId);
	};
	
	var pub = {};
	pub.CompositeOperation = CompositeOperation;
	pub.Sprite = Sprite;
	pub.Container = Container;
	pub.Engine = Engine;
			
	return pub;
}());