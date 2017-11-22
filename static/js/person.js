/* global p1, GRAVITY */

function Person() {

    // Attributes
    this.off = BUILDING_WIDTH / 2 // To represent the
    this.tam = 20;
    this.img = new Image();
	this.img.src = 'img/person1.jpg'
    
    let left = window.innerWidth / 2 - this.off // Defines the extreme left position
    let variation = 2 * this.off * Math.floor(Math.random() * 2) // Defines variation (if 2 goes to extreme right)
    
    this.pos = {
        x: left + variation, // Position must be at least one or two times the offset
        y: 100
    };
    
	this.onload = function(){
        this.draw()
    };

    this.draw = function(ctx) {

        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.tam, this.tam)
    }
    
    this.move = function() {
		this.pos.y += GRAVITY + (0.8* p1.level)
	}
}
