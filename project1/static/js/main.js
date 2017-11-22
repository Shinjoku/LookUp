/* global Image, Player, Person, Wreckage, ObjectCollection */
/* global random_int, GRAVITY, BUILDING_WIDTH */

// Global variables
let level = 0       // User's level
let falling = []
let levelPoints = [1,1, 1, 1]
let count = 0

// Canvas
var c = document.getElementById("myCanvas")     // Canvas
var ctx = c.getContext("2d")                    // Canvav's context
var winWidth                                    // Window's width
var winHeight                                   // Window's height
var buildlist = ['static/img/build.png','static/img/build1_1.png','static/img/build2_2.jpeg']	// Building image list
var imageslist = ['static/img/street2.png', 'static/img/street3.jpg', 'static/img/street4.jpg']
var background = new Image()                    
var centerWidth
var centerHeight
var vetorCena = [ menu, loop, endGame]
var instrucao = new Image()
var tituloimg = new Image()

//background Fill
background.src = imageslist[level];
background.onload = function(){
	ctx.drawImage(background,0,0,winWidth,winHeight)
};

// Aux functions

// Create the canvas using screen's width and height
function createCanvas(){
    
    c = document.getElementById('myCanvas')
    winWidth= window.innerWidth
    winHeight= window.innerHeight
    c.width= winWidth
    c.height= winHeight
    centerWidth = winWidth / 2
    centerHeight = winHeight / 2
    
}

function doomsday(){
    falling = []
}

// Shows every game object every frame
function loop() {

    // Clear the screen
    ctx.clearRect(0, 0, winWidth, winHeight)
	
	if(p1.points >= levelPoints[level % levelPoints.length]){
        level++
        p1.points = 0
		p1.level++
        alert('level up!')
		if(level >= 3)
		{
			count++
			window.requestAnimationFrame(vetorCena[count])
		}
		else{
			background.src =  imageslist[level% levelPoints.length]   
		}
    }
	
	// Draw the game objects
	ctx.drawImage(background, 0, 0, winWidth, winHeight)    // Background
    p1.draw()                                               // Player's character
    collection.draw()
    collection.isColliding(p1)
    

    // Here we need to explain when the game is over
    if (!p1.isDead())         // When the player's life becomes 0, the game stops
        window.requestAnimationFrame(vetorCena[count])
    else {
        if(confirm('Game over! You made ' + p1.points + ' points!' + 'Wanna play again?')){
            p1.heal()
            collection.doomsday()
			level = 0
			p1.level = 0;
			background.src =  imageslist[level% levelPoints.length]  
			count = 0;
			FB.login(function(){
				// Note: The call will only work if you accept the permission request
				FB.api('/me/feed', 'post', {message: 'Hello, world!'});
			}, {scope: 'publish_actions'});
            window.requestAnimationFrame(vetorCena[count])
		}
		else{
			ctx.clearRect(0, 0, winWidth, winHeight)
			alert('GAME OVER')
		}
    }
}

function KeyDown(evt) {
    switch (evt.keyCode) {
        case 37: //seta para esquerda
            if (p1.pos.x > winWidth / 4)
                p1.move(-BUILDING_WIDTH, 0)
        break
        case 39: //seta para direita
            if (p1.pos.x < 3 * winWidth / 4)
                p1.move(BUILDING_WIDTH, 0)
        break
		case 13: //seta Enter
			if(count <= 0){
				count++;
			}
		break
		case 32:
			count = 0
			p1.heal()
            collection.doomsday()
			level = 0
			p1.level = 0;
			background.src =  imageslist[level% levelPoints.length]  
            window.requestAnimationFrame(vetorCena[count])
		break
    }
}


function menu(){
	
	instrucao.src = 'static/img/instrucao1.png'
	tituloimg.src = 'static/img/titulo.png'
	ctx.drawImage(background, 0, 0, winWidth, winHeight)    // Background
	ctx.beginPath();
	ctx.arc(winWidth/2,winHeight/2,winWidth/30,0,2*Math.PI);
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.font = "10px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Pressione Enter",(winWidth/2) - (winWidth/40),(winHeight/2)-(winHeight/50));
	ctx.fillText("Para Jogar", (winWidth/2) - (winWidth/40), (winHeight/2));
	ctx.drawImage(instrucao, (winWidth/2.7)  , (winHeight/1.6), (winWidth/4), (winHeight/3))
	ctx.drawImage(tituloimg, (winWidth/2.7)  , (winHeight/50), (winWidth/4), (winHeight/3))
	window.requestAnimationFrame(vetorCena[count])

}

function endGame(){
	ctx.clearRect(0, 0, winWidth, winHeight)
	background.src = imageslist[0];
	ctx.drawImage(background, 0, 0, winWidth, winHeight)    // Background
	ctx.beginPath();
	ctx.arc(winWidth/2,winHeight/2,winWidth/30,0,2*Math.PI);
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.font = "10px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Fim de jogo",(winWidth/2) - (winWidth/40),winHeight/2 - (winHeight/50) );
	ctx.fillText("Precione SPACE", (winWidth/2) - (winWidth/40), (winHeight/2))
	ctx.fillText("para reiniciar", (winWidth/2) - (winWidth/40), (winHeight/2)+(winHeight/40))
	/*// API do Facebook
          FB.login(function(){
				// Note: The call will only work if you accept the permission request
				FB.api('/me/feed', 'post', {message: 'Hello, world!'});
			}, {scope: 'publish_actions'});*/
	window.requestAnimationFrame(vetorCena[count])

}
//Main

// Setup - Here's where the one-time configuration will stay
window.addEventListener('keydown', KeyDown, true)
var collection = new ObjectCollection()
var p1 = new Player()

setInterval(collection.spawn, 1000)      // Spawn another person

// Loop - Here goes everything that needs to be repeated
window.requestAnimationFrame(vetorCena[count])
