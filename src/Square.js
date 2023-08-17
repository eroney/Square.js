/*
 * Square.js
 *
 * autor: Roneiser Vargas.
 * fecha: 16/08/23
 * ultima modificacion: 16/08/23 v0.01
 */

const Square = {

}


Square.Game = class Game {

	constructor(game){

		// Canvas y ctx

		this.canvas = game.canvas;
		this.ctx = game.canvas.getContext('2d');

		this.scene = game.scene;
		
		// Ciclo de vida del juego

		this._loop = ()=>{
			this.clearCanvas();
			this.onUpdate();
			this.scene._update(this);
			requestAnimationFrame(this._loop);
		}
	}

	_init(){
		this._loop();
	}

	clearCanvas(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	onUpdate(){
		// Esta function sera llamada al actualizar el juego
	}
}


Square.Scene = class Scene {

	constructor(scene){

		// Los elementos del escenario

		this.elements = [] || scene.elements;
	}

	_update(game){

		// Actualizar los elementos del escenario

		this.elements.forEach((e)=>{
			e._update();
		})

		// Dibuja los elementos

		this._draw(game.ctx);
	}

	_draw(ctx){
	
		this.elements.forEach((e)=>{
			e._draw(ctx);
		})
	}
}


Square.Object = class Object {

	constructor(obj){
		
		this.setTransform(0, 0, 0, 0);
		this.setVel(0, 0);
		
		obj(this);
	}

	_update(){
		this._move();
	}

	_move(){
		this.x += this.velx;
		this.y += this.vely;
	}

	_draw(ctx){
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	setTransform(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	setPos(x, y){
		this.x = x;
		this.y = y;
	}

	setVel(velx, vely){
		this.velx = velx;
		this.vely = vely;
	}
}


Square.Input = class Input {

	constructor(input){

		const Keyboard_Key = function(key){
			this.isup = false;
			this.isdown = false;
			this.ispress = false;
		}


		this.Keyboard = {
			'ArrowUp': new Keyboard_Key,
			'ArrowLeft': new Keyboard_Key,
			'ArrowRight': new Keyboard_Key,
			'ArrowDown': new Keyboard_Key,
			'KeyA': new Keyboard_Key,
			'KeyB': new Keyboard_Key,
			'KeyC': new Keyboard_Key,
			'KeyD': new Keyboard_Key,
			'KeyE': new Keyboard_Key,
			'KeyF': new Keyboard_Key,
			'KeyG': new Keyboard_Key,
			'KeyH': new Keyboard_Key,
			'KeyI': new Keyboard_Key,
			'KeyJ': new Keyboard_Key,
			'KeyK': new Keyboard_Key,
			'KeyL': new Keyboard_Key,
			'KeyM': new Keyboard_Key,
			'KeyN': new Keyboard_Key,
			'KeyÑ': new Keyboard_Key,
			'KeyO': new Keyboard_Key,
			'KeyP': new Keyboard_Key,
			'KeyQ': new Keyboard_Key,
			'KeyR': new Keyboard_Key,
			'KeyS': new Keyboard_Key,
			'KeyT': new Keyboard_Key,
			'KeyU': new Keyboard_Key,
			'KeyV': new Keyboard_Key,
			'KeyW': new Keyboard_Key,
			'KeyX': new Keyboard_Key,
			'KeyY': new Keyboard_Key,
			'KeyZ': new Keyboard_Key,
		}


		window.addEventListener('keyup', (e)=>{
			let code = e.code 

			if (this.Keyboard[code] != undefined) {
 			
				this.Keyboard[code].isup = true;	
				this.Keyboard[code].isdown = false;
				requestAnimationFrame( ()=>this.Keyboard[code].isup = false );
 			}			
		})

		window.addEventListener('keydown', (e)=>{
			let code = e.code 

			if (this.Keyboard[code] != undefined) {
 			
				this.Keyboard[code].isdown = true;
 			}			
		})

		window.addEventListener('keypress', (e)=>{
			let code = e.code 

			if (this.Keyboard[code] != undefined) {
 			
				this.Keyboard[code].ispress = true;	
				requestAnimationFrame( ()=>this.Keyboard[code].ispress = false );
 			}			
		})		
	}

	iskeyup(code, call){

		if (this.Keyboard[code] != undefined) {

			if (call && this.Keyboard[code].isup) {

				call();
			} else {

				return this.Keyboard[code].isup;
			}
		}
	}

	iskeydown(code, call){

		if (this.Keyboard[code] != undefined) {

			if (call && this.Keyboard[code].isdown) {

				call();
			} else {

				return this.Keyboard[code].isdown;
			}
		}
	}

	iskeypress(code, call){

		if (this.Keyboard[code] != undefined) {

			if (call && this.Keyboard[code].ispress) {

				call();
			} else {

				return this.Keyboard[code].ispress;
			}
		}
	}
}


Square.createCanvas = function(width, height) {
	
	let can = document.createElement('canvas');
		can.width = width;
		can.height = height;
	
	return can;
}


Square.createGame = function(config) {
	
	let game = new Square.Game({
		canvas: config.canvas,
		scene: config.scene,
	})

	return game;
}