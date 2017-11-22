// random_int returns a random integer from the range [start, end]
const random_int = (start, end) => Math.round(Math.random() * (end - start)) + start
const LIFE_POINTS = 5   // Character's life
const BUILDING_WIDTH = 30 * window.innerWidth * 0.01
const GRAVITY = 1.80    // Speed with which the objects fall (1.8 units/sec)
const max = (window.innerWidth / 2) - (BUILDING_WIDTH / 2)

// window.innerWidth / 2 - (block * BUILDING_WIDTH) - (this.tam / 2)
// centerWidth - BUILDING_WIDTH + ((block * 2) * BUILDING_WIDTH / 2) - (this.tam / 2)
