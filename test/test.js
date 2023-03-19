const collion2d = require('../build/collision2d.js');


console.log(collion2d.name,collion2d.prototype);
let RECT = collion2d.prototype.rect(0,0,0,0);

RECT.x = 10;
console.log(RECT,RECT.x);

console.log(collion2d.SHAPES);