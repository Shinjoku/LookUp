/* global p1, random_int, Person, Wreckage, GRAVITY */

function ObjectCollection(){
    
    // An array of GameObjects
    this.objects = []
    
    this.spawn = () => {
        /*
        * Spawn another person or wreckage to the array
        */
        
        let num = random_int(1, 5)
        
        // 40% person | 60% wreckage
        this.objects.push(num <= 2 ? new Person() : new Wreckage())
    }

    // Draws objects (persons and wreckages)
    this.draw = function(){
        for (let i = this.objects.length - 1; i > 0; i--)
            this.objects[i].draw()
    }
    
    this.doomsday = () => this.objects = []
    
    this.isColliding = function(p1) {
        
        // objects
        for (let i = this.objects.length - 1; i >= 0; i--) {  // For every object in the array:
    
            if (p1.isColliding(this.objects[i])) {               // If this object is colliding with the player:
            
                this.objects[i].onCollision()                       // Increments player's points or decreases its life points
                this.objects.splice(i, 1)                           // Take this person out of the array, cuz she's saved
                continue                                            // Jump to the next person
            }
    
            this.objects[i].move(0, GRAVITY + (0.8 * p1.level))                 // He's falling
        }
    }
}


