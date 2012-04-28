var canvas=null;
var context=null;
var layers=null;

var movePen=eval(Jscex.compile(
	'async', 
	function(startPos, endPos, duration)
	{
		var d=50;
		var pos=startPos;
		for (var i=0; i<duration; i+=d)
		{
			context.beginPath();
			context.moveTo(pos.x, pos.y);
			var x=startPos.x+(endPos.x-startPos.x)*i/duration;
			//var y=startPos.y+(endPos.y-startPos.y)*i/duration;
			var y=0.05*x*x-8*x-1000;
			context.lineTo(x, y);
			context.closePath();
			context.stroke();
			pos={x:x, y:y};
			$await(Jscex.Async.sleep(d));
		}
	}));

var moveBrush=eval(Jscex.compile(
	'async',
	function(startPos, endPos, func, duration)
	{
		var d=5;
		for (var i=0; i<duration; i+=d)
		{
			context.beginPath();
			var x=startPos.x+(endPos.x-startPos.x)*i/duration;
			//var y=startPos.y+(endPos.y-startPos.y)*i/duration;
			//var y=0.05*x*x-10*x-800;
			var y=func(x);
			context.arc(x, y, 3, 0, 2*Math.PI);
			context.closePath();
			context.fill();
			$await(Jscex.Async.sleep(d));
		}
	}));

$(function()
{
	layers=new sLayer({
		width:1200,
		height:700,
		pos:document.getElementsByClassName('center')[0]
	});
	layers.add('myCanvas');
	canvas=layers.layers['myCanvas'];

	context=canvas.getContext('2d');

//	context.shadowOffsetX=5;
//	context.shadowOffsetY=5;
//	context.shadowBlur=5;
//	context.shadowColor='rgba(0, 0, 0, .5)';
//	context.lineWidth=2;

	var s=new SalMath(canvas);
	/*s.cubicBezier(
		{x:100, y:100}, 
		{x:150, y:0},
		{x:300, y:400},
		{x:400, y:100}, 15, 1000);*/
	s.squareBezier(
		{x:100, y:100}, 
		{x:350, y:400},
		{x:400, y:100}, 5, 1000);

//	context.beginPath();
//	context.moveTo(100, 300);
//	context.arc(200, 200, 20, 0.2*Math.PI, 2*Math.PI);
//	context.quadraticCurveTo(200, 200, 400, 300);
//	context.bezierCurveTo(200, 340, 300, 200, 400, 300);
//	context.closePath();
//	context.stroke();

//	context.rotate(0.25*Math.PI);
//	context.translate(400, 1000);
//	moveBrush({x:0, y:0}, {x:400, y:0}, 
//		function(x)
//		{
//			return 0.05*x*x-10*x-800;
//		}, 2000).start();

	/*canvas.onclick=function(e)
	{
		if (hitpath(context, e))
		{
			alert('hit');
		}
		else
		{
			alert('not hit');
		}
	}*/
});

function hitpath(context, event)
{
	var canvas=context.canvas;
	var b=canvas.getBoundingClientRect();

	var x=(event.clientX-b.left)*(canvas.width/b.width);
	var y=(event.clientY-b.top)*(canvas.height/b.height);

	return context.isPointInPath(x, y);
}
