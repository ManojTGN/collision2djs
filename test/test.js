const collision2d = require('../build/collision2d.js');


const COLLION = new collision2d();

let RECT = COLLION.rect(10,20,100,100);
console.log( RECT._type );

RECT._type = collision2d.shape.circle;

console.log( RECT._type );
