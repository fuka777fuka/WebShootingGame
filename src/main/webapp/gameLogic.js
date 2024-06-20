
var canvas = document.getElementById("gameCanvas");
canvas.width = 640;
canvas.height = 640;
var ctx = canvas.getContext("2d");

var kitai = new Object();
kitai.img = new Image();
kitai.img.src = "img/plane_fighter_f35_2.png"; //機体の画像
kitai.x = 300;//機体の位置//ヨコ
kitai.y = 550;//機体の位置//タテ
kitai.move = 0;
kitai.active = false;


var key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = "";
key.space = false;
key.enter = false;
var test = document.querySelector("#test");
var x = document.querySelector("#x");
var y = document.querySelector("#y");
var k = document.querySelector("#key");


var shot = new Object();
shot.img = new Image();
shot.img.src = "img/shotBig.png"; //ショットの画像
shot.x = 0;
shot.y = 0;
shot.speed = 20; //ショットの速度//数字が大きいと速くなる
shot.active = false;


var teki = new Object();
teki.img = new Image();
teki.img.src = "img/teki.png";
teki.x = 0;
teki.y = 0;
teki.width = 128;
teki.height = 128;
teki.active = false;
teki.hitcount = 0;
teki.speed = 3;

var hit = new Object();
hit.img = new Image();
hit.img.src = "img/hit.png";
hit.x = 0;
hit.y = 0;
hit.width = 128;
hit.height = 128;
hit.active = false;

var gekiha = new Object();
gekiha.img = new Image();
gekiha.img.src = "img/gekiha.png";
gekiha.x = 0;
gekiha.y = 0;
gekiha.width = 128;
gekiha.height = 128;
gekiha.active = false;

var tekiattack = new Object();
tekiattack.img = new Image();
tekiattack.img.src = "img/attack.png";
tekiattack.x = 0.0;
tekiattack.y = 0.0;
tekiattack.width = 32;
tekiattack.height = 32;
tekiattack.speedy = 20;
tekiattack.speedx = 0.0;
tekiattack.active = false;
tekiattacktiming = 0;

var taiha = new Object();
taiha.img = new Image();
taiha.img.src = "img/taiha.png";
taiha.x = 0;
taiha.y = 0;
taiha.width = 32;
taiha.height = 32;
taiha.active = false;

var gameOver = false;



function mainLoop(){
	
	
	 
	ctx.fillStyle = "rgb(255,255,255)"

	ctx.fillRect(0, 0, 640, 640);
	
	
	
	if (kitai.active == false) {
		ctx.drawImage(kitai.img, kitai.x, kitai.y);
	}

	x.textContent = kitai.x
	y.textContent = kitai.y
	k.textContent = key.push

	if (teki.active == false) {
		ctx.drawImage(teki.img, teki.x, teki.y, teki.width, teki.height)
	}

	if (gekiha.active) {
		ctx.drawImage(gekiha.img, gekiha.x, gekiha.y, gekiha.width, gekiha.height)
		 gekiha.active = false;
		 
	}


	if (taiha.active) {

		ctx.drawImage(taiha.img, taiha.x, taiha.y, taiha.width, taiha.height)
		 	taiha.active = false;
		 	gameOver = true;
			tekiattack.active = true;
			console.log("爆発");
			GAMEOVER();

	}
	if (hit.active) {
		ctx.drawImage(hit.img, hit.x, hit.y, hit.width, hit.height);
			hit.active = false;
			gameOver = true;
			 console.log("撃破");
	}
	if (tekiattack.active == false) {
		if ((tekiattack.y == 0 || tekiattack.y > canvas.height + tekiattacktiming) && teki.active == false && kitai.active == false) {
			
			tekiattack.x = teki.x +(teki.width/2) ;
			tekiattack.y = teki.y +(teki.height/2);
			tekiattack.speedx = (Math.random()-0.5)*5;
			tekiattack.speedy = 4;
			tekiattack.active = false;
			tekiattacktiming = Math.random()*3;
			test.textContent = "敵の攻撃";
			
		}
		for( var i = 0;i<tekiattacktiming;i++){
			tekiattack.y += tekiattack.speedy ;
			tekiattack.x += tekiattack.speedx ;
		}
		ctx.drawImage(tekiattack.img, tekiattack.x, tekiattack.y, tekiattack.width, tekiattack.height)
	
	}
	
	addEventListener("keydown", keydownfunc, false);
	addEventListener("keyup", keyupfunc, false);

	


	if (key.left == true) {
		kitai.move = 32;
		key.push = "left";
		test.textContent = "左押された"
	} else if (key.right == true) {
		kitai.move = 32;
		key.push = "right";
		test.textContent = "右押された"
	}
	
	
	 if (key.up == true) {
		kitai.move = 32;
		key.push = "up"
		test.textContent = "上押された"
	}else if (key.down == true) {
		kitai.move = 32;
		key.push = "down";
		test.textContent = "下押された"

	} 
	
	
	if (key.space == true) {
		if (shot.active == false) {
			shot.active = true;
			shot.x = kitai.x +10; //ショットの位置
			shot.y = kitai.y;
			key.push = "space";
			test.textContent = "スペース押された"
		}
	}
	


	if (key.push == "left") {
		if ((kitai.x - 4) > 0) {
			kitai.x -= 4;
		}
	}else if (key.push == "right") {
		if ((kitai.x + 4) < 640 - 32) {
			kitai.x += 4;
		}
	}
	
	 if (key.push == "up") {
		if ((kitai.y - 4) > 0) {
			kitai.y -= 4;
		}
	}else if (key.push == "down") {
		if ((kitai.y + 4) < 640 - 32) {
			kitai.y += 4;
		}

	}
	
	if (shot.active && kitai.active == false && teki.active == false) {
		ctx.drawImage(shot.img, shot.x, shot.y);
		shot.y -= shot.speed;
		if (shot.y < 0) {
			shot.active = false;
			test.textContent = "ショット";
		}
		if (teki.active == false  && shot.x < teki.x + teki.width && shot.x + shot.img.width > teki.x &&
			shot.y < teki.y + teki.height && shot.y + shot.img.height > teki.y) {
			hit.active = false;
			hit.x = teki.x;
			hit.y = teki.y;
			shot.active = false;
			teki.hitcount++;
			test.textContent = "ヒットした";
			
							//何回当たったか
		if (teki.hitcount >= 10) {
			gekiha.x = teki.x;
			gekiha.y = teki.y;
			gekiha.active = false;
			teki.active = true;
			hit.active = true;
			test.textContent = "敵を撃破した";
				
			}
		}

	}

	
	if (teki.active == false && kitai.x < teki.x + teki.width && kitai.x > teki.x &&
		kitai.y < teki.y + teki.height && kitai.y > teki.y) {
		hit.active = false;
		taiha.x = kitai.x;
		taiha.y = kitai.y;
		teki.active = false;
		taiha.active = true;
		kitai.active = true;
		test.textContent = "ぶつかった";
//		gameOver = true;
		
	}
	if (kitai.active == false && tekiattack.x < kitai.x + kitai.img.width && tekiattack.x + tekiattack.width > kitai.x &&
		tekiattack.y < kitai.y + kitai.img.height && tekiattack.y + tekiattack.height > kitai.y) {
		taiha.x = kitai.x;
		taiha.y = kitai.y;
		taiha.active = true;
		teki.active = false;
		kitai.active = true;
		test.textContent = "くらった";

//		gameOver = true;
	//console.log("爆発");
	}
	  
	
	if(teki.active == false && kitai.active == false ){
		teki.x += teki.speed ;	
		//test.textContent = "敵が動いた";
		if(teki.x > canvas.width-teki.width || teki.x < 0){
			teki.speed = teki.speed * -1;
		}
	}
	

	if(gameOver == false ){
		requestAnimationFrame(mainLoop);
		
	}
	
		
}

//addEventListener("load", mainLoop, false);

function keydownfunc(event) {
	var key_code = event.keyCode;
	
		if (key_code == 37) key.left = true;
	else if (key_code == 38) key.up = true;
	else if (key_code == 39) key.right = true;
	else if (key_code == 40) key.down = true;
	else if (key_code == 32) key.space = true;
	else if (key_code == 13) key.enter = true
	
	event.preventDefault();

}
function keyupfunc(event) {
	key.push = "";
	var key_code = event.keyCode;
	if (key_code == 37) key.left = false;
	else if (key_code == 38) key.up = false;
	else if (key_code == 39) key.right = false;
	else if (key_code == 40) key.down = false;
	else if (key_code == 32) key.space = false;

}

function GAMEOVER(){
	if(taiha.active == true){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
   	ctx.textAlign = "center";
    ctx.fillText("GAMEOVER", canvas.width / 2, canvas.height / 2);
	}
}

function GameStart(){
	
	ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("シューティングゲーム", canvas.width / 2, canvas.height / 2);
   
}

 
GameStart();