const collion2d = require('../build/collision2d.js');


// console.log(collion2d.name,collion2d.prototype);
let RECT_1 = collion2d.prototype.rect(0,0,10,10);
let RECT_2 = collion2d.prototype.rect(11,0,10,10);

RECT_2.onCollisionEnter = (event) => {
    console.log(event);
}

RECT_2.onCollisionExit = (event) => {
    console.log(event);
}

RECT_2.x -= 2;
console.log("-----------");
RECT_2.x += 2;
console.log("-----------");
RECT_1 += 2;
