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
			var y=startPos.y+(endPos.y-startPos.y)*i/duration;
			context.lineTo(x, y);
			context.closePath();
			context.stroke();
			pos={x:x, y:y};
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

	context.shadowOffsetX=5;
	context.shadowOffsetY=5;
	context.shadowBlur=5;
	context.shadowColor='rgba(0, 0, 0, .5)';
	context.lineWidth=2;

	context.beginPath();
	context.moveTo(100, 300);
	context.arc(200, 200, 20, 0.2*Math.PI, 2*Math.PI);
	//context.quadraticCurveTo(200, 200, 400, 300);
	//context.bezierCurveTo(200, 340, 300, 200, 400, 300);
	context.stroke();

	console.log('hi');

	movePen({x:0, y:0}, {x:400, y:400}, 1000).start();
	movePen({x:0, y:0}, {x:100, y:600}, 1000).start();

	canvas.onclick=function(e)
	{
		if (hitpath(context, e))
		{
			alert('hit');
		}
		else
		{
			alert('not hit');
		}
	}
});
