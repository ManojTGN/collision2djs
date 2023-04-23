const { Rect, Circle, addShape } = require("@manojtgn/collision2djs")

const rect   = new Rect(100,100,100,100);
const circle = new Circle(150,150,50);

addShape(rect);
addShape(circle);

const collision = rect.isCollideWith( circle );
console.log(collision)

/* 
 * OUTPUT:
 * true
 * 
 */