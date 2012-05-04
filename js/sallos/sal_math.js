SalMath=function(canvas)
{
	this.canvas=canvas;
	this.context=canvas.getContext('2d');
}

SalMath.prototype={
	cubicBezier:function(p0, p1, p2, p3, func, duration, td){
		var cx=3*(p1.x-p0.x);
		var bx=3*(p2.x-p1.x);
		var ax=p3.x-p0.x-cx-bx;

		var cy=3*(p1.y-p0.y);
		var by=3*(p2.y-p1.y);
		var ay=p3.y-p0.y-cy-by;

		var d=150;
		var draw=eval(Jscex.compile(
			'async',
			function(){
				for (var i=0; i<=d; i++){
					var t=i/d;
					var r=func(t);
					var tSquared=t*t;
					var tCubed=tSquared*t;
					var x=(ax*tCubed)+(bx*tSquared)+(cx*t)+p0.x;
					var y=(ay*tCubed)+(by*tSquared)+(cy*t)+p0.y;
					this.context.beginPath();
					this.context.arc(x, y, r, 0, 2*Math.PI);
					this.context.closePath();
					this.context.fill();
					//console.log(t+' x:'+x+' y:'+y);
					if (i%td==0){
						$await(Jscex.Async.sleep(duration/100));
					}
				}
			}));
		draw().start();
	},
	squareBezier:function(p0, p1, p2, func, duration, td){
		var ax=p2.x-2*p1.x+p0.x;
		var bx=2*(p1.x-p0.x);

		var ay=p2.y-2*p1.y+p0.y;
		var by=2*(p1.y-p0.y);

		var d=100;
		var draw=eval(Jscex.compile(
			'async',
			function(){
				for (var i=0; i<=d; i++){
					var t=i/d;
					var r=func(t);
					var tSquared=t*t;
					var x=(ax*tSquared)+(bx*t)+p0.x;
					var y=(ay*tSquared)+(by*t)+p0.y;
					this.context.beginPath();
					this.context.arc(x, y, r, 0, 2*Math.PI);
					this.context.closePath();
					this.context.fill();
					//console.log(t+' x:'+x+' y:'+y);
					if (i%td==0){
						$await(Jscex.Async.sleep(duration/100));
					}
				}
			}));
		draw().start();
	}
}
