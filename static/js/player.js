function Player() {
    
    GameObject.call(this)
    
    this.tam = 80
    this.img.src = 'static/img/Firemen.png'
    this.pos.x = max - 2 * this.tam / 2,
    this.pos.y = window.innerHeight * 0.75
    this.life = LIFE_POINTS
    this.points = 0
	this.level = 0
    
    // Checks whether the character is colliding with an falling object or not
    this.isColliding = function(person) {

        return (person.pos.x + person.tam <= this.pos.x + this.tam) 
        && (person.pos.x + person.tam >= this.pos.x)
        && (person.pos.y + person.tam <= this.pos.y + this.tam)
        && (person.pos.y + person.tam >= this.pos.y)
        
    }
    
    // Decrememts players' life
	this.damage = () => this.life--
    
    // Increments players' points
    this.score = () => this.points++
    
    // Returns whether the player is dead or not
    this.isDead = function(){
        return !this.life
    }
    
    // Heals the character to play again
    this.heal = function() {
        
        this.life = LIFE_POINTS
        this.points = 0
    }
    
    // Display life blocks at the top left corner
    // With color and side of the square as parameters
    this.showLife = function(color, side_size) {
        
        ctx.fillStyle = color
        
        for (let i = 0; i < this.life; i++)
            ctx.fillRect(10 + (i * 40) * (window.innerWidth / window.innerHeight), 10, side_size, side_size)
        
    }
    
    this.showPoint = function(size) {
        ctx.font = "20px Georgia"
        ctx.fillStyle = "black"
        ctx.fillText("Pontuação:" + this.points, 10, 30 + size)
    }
    
    // Draws main character's characteristics (image and life)
    this.draw = function() {
        
        this.showLife('#F00', window.innerWidth / window.innerHeight * 30)
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.tam, this.tam)
        this.showPoint(window.innerWidth / window.innerHeight * 30)
    }
    
    
}
