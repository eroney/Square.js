
Game = Square.createGame({
	canvas: Square.createCanvas(640, 480),
	scene: new Square.Scene,
});


Input = new Square.Input;


box = new Square.Object((obj)=>{

	obj.setTransform(0, 0, 40, 40);
	obj.setVel(0, 2);
});


Game.scene.elements = [box];


Game._init();
document.body.appendChild(Game.canvas);