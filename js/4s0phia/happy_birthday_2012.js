var screenWidth=0;
var screenHeight=0;
var canvas=null;
var context=null;
var body=null;

$(function()
{
	canvas=$('#myCanvas');
	body=$('body');

	canvas.prop('width', parseInt(body.css('width')));
	canvas.prop('height', parseInt(body.css('height')));

	context=canvas[0].getContext('2d');

	context.beginPath();
	context.moveTo(100, 100);
	context.lineTo(200, 200);
	context.lineTo(100, 200);
	context.closePath();
	context.stroke();
});
