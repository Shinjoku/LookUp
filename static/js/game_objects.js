/* global Image */
/* global ctx, max, LIFE_POINTS, p1, BUILDING_WIDTH, random_int, centerWidth */

function GameObject() {
    
    // Generic attributes
    
    this.tam
    this.img = new Image()
    this.pos = {
        x: 0,
        y: 0
    }
    
    // Methods
    this.onload = function() {
        this.draw()
    }
    
    this.draw = function() {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.tam, this.tam)
    }
    
    this.move = function(velX, velY) {
        this.pos.x += velX
        this.pos.y += velY
    }
}

function Person() {
    
    GameObject.call(this)
    
    let block = random_int(0, 1)
    
    this.pos.x = centerWidth* block + BUILDING_WIDTH
	//max + block * BUILDING_WIDTH - (this.tam / 2)
    this.pos.y = window.innerHeight * 0.25
    
    this.tam = 30
    this.img.src = 'static/img/person.jpg'
    
    // Increases player's points counter
    this.onCollision = function(){
        p1.score()  
    } 
    
    //console.log('person: ' + this.pos.x + '//' + this.pos.y)
    
}

function Wreckage() {
    
    GameObject.call(this)
    
    let block = random_int(0, 1)

    this.pos.x = centerWidth
    // window.innerWidth / 2 - (block * BUILDING_WIDTH) - (this.tam / 2)
    this.pos.y = window.innerHeight * 0.25
    
    this.tam = 30     
    this.img.src = 'static/img/wreckage.png'
    
    // Decreases player's life counter
    this.onCollision = function() {
        p1.damage()
    }
    
    //console.log('wreckage: ' + this.pos.x + '//' + this.pos.y)
    
}