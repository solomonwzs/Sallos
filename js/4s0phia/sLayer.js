var sLayer=function(obj)
{
	this.width=obj.width || 400;
	this.height=obj.height || 300;
	this.pos=obj.pos || document.getElementsByTagName('body')[0];
	this.layers=new Array();
}
sLayer.prototype={
	add:function(id, background)
	{
		var canvas=document.createElement('canvas');
		canvas.width=this.width;
		canvas.height=this.height;
		canvas.style.position='absolute';
		canvas.style.left='0px';
		canvas.id=id;
		if (background)
		{
			canvas.style.background=background;
		}
		this.layers[id]=canvas;
		this.pos.appendChild(canvas);
	},
	remove:function(id)
	{
		this.pos.removeChild(this.layers[id]);
		this.layers[id]=null;
	}
}
