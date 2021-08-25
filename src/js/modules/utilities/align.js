class Align
{
	static scaleToGameW(game,obj,per)
	{
		obj.displayWidth=game.config.width*per;
		obj.scaleY=obj.scaleX;
	}
	static centerH(game,obj)
	{
		obj.x=game.config.width/2-obj.displayWidth/2;
	}
	static centerV(game,obj)
	{
		obj.y=game.config.height/2-obj.displayHeight/2;
	}
	static center2(game,obj)
	{
		obj.x=game.config.width/2-obj.displayWidth/2;
		obj.y=game.config.height/2-obj.displayHeight/2;
	}
	static center(config,obj)
	{
		obj.x=config.width/2;
		obj.y=config.height/2;
	}
}