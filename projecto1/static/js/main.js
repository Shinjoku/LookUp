/* global Image, Player, Person, Wreckage, ObjectCollection */
/* global random_int, GRAVITY, BUILDING_WIDTH */

// Global variables
let level = 0       // User's level
let falling = []
let levelPoints = [5,10, 20, 1]
let count = 0

// Canvas
var c = document.getElementById("myCanvas")     // Canvas
var ctx = c.getContext("2d")                    // Canvav's context
var winWidth                                    // Window's width
var winHeight                                   // Window's height
var buildlist = ['static/img/build.png','static/img/build1_1.png','static/img/build2_2.jpg']	// Building image list
var imageslist = ['static/img/street2.png', 'static/img/street3.jpg', 'static/img/street4.jpg']
var background = new Image()                    
var centerWidth
var centerHeight
var vetorCena = [ menu, loop, endGame]
var instrucao = new Image()
var tituloimg = new Image()
var predio = new Image()


predio.src = buildlist[2]
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
	
	//See if have points for next level
	if(p1.points >= levelPoints[level % levelPoints.length]){
        level++
        p1.points = 0
		p1.level++
        alert('level up!')
		//see if level 3 has ended
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
	build_draw();
    p1.draw(window.innerHeight)                                               // Player's character
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
		case 32://seta Space
			count = 0
			p1.heal()
			level = 0
			p1.level = 0;
			background.src =  imageslist[level% levelPoints.length]  
            window.requestAnimationFrame(vetorCena[count])
		break
    }
}


function menu(){
	
	ctx.clearRect(0, 0, winWidth, winHeight)
	instrucao.src = 'static/img/instrucao1.png'
	tituloimg.src = 'static/img/titulo.png'
	ctx.drawImage(background, 0, 0, winWidth, winHeight)    // Background
	build_draw() // builds
	//circle
	ctx.beginPath();
	ctx.arc(winWidth/2,winHeight/2,winWidth/30,0,2*Math.PI);
	ctx.stroke();
	//text of circle
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.font = "10px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Pressione Enter",(winWidth/2) - (winWidth/40),(winHeight/2)-(winHeight/50));
	ctx.fillText("Para Jogar", (winWidth/2) - (winWidth/40), (winHeight/2));
	//imgs of title and instrucitons 
	ctx.drawImage(instrucao, (winWidth/2.7)  , (winHeight/1.6), (winWidth/4), (winHeight/3))
	ctx.drawImage(tituloimg, (winWidth/2.7)  , (winHeight/50), (winWidth/4), (winHeight/3))
	window.requestAnimationFrame(vetorCena[count])

}

function endGame(){
	
	p1.level = 0
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
	window.requestAnimationFrame(vetorCena[count])

}

function build_draw(){
	ctx.drawImage(predio, BUILDING_WIDTH*0, winHeight/4, BUILDING_WIDTH/2, winHeight/1.8)
	ctx.drawImage(predio, BUILDING_WIDTH*1, winHeight/4, BUILDING_WIDTH/2, winHeight/1.8)
	ctx.drawImage(predio, BUILDING_WIDTH*2, winHeight/4, BUILDING_WIDTH/2, winHeight/1.8)
	ctx.drawImage(predio, BUILDING_WIDTH*3, winHeight/4, BUILDING_WIDTH/2, winHeight/1.8)
}

//Main

// Setup - Here's where the one-time configuration will stay
window.addEventListener('keydown', KeyDown, true)
var collection = new ObjectCollection()
var p1 = new Player()
setInterval(collection.spawn, 1000)      // Spawn another person	

// Loop - Here goes everything that needs to be repeated
window.requestAnimationFrame(vetorCena[count])
