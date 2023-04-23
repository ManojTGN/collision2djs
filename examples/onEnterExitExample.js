const { Rect, Circle, addShape } = require("@manojtgn/collision2djs")

const rect   = new Rect(100,100,100,100);
const circle = new Circle(0,150,50);

addShape(rect);
addShape(circle);

rect.onCollisionEnter = (event) => console.log("Enter Event: ",event);
rect.onCollisionExit  = (event) => console.log("Exit  Event: ",event);


for(let i = 0; i < 300; i++) circle.x += 1;


/* 
 * OUTPUT:
 * Enter Event:  [
 * Circle {
 *   point: Point {
 *     x: 76,
 *     y: 150,
 *   },
 *   r: 50,
 * }
 * ]
 * Exit  Event:  [
 * Circle {
 *   point: Point {
 *     x: 225,
 *     y: 150,
 *   },
 *   r: 50,
 * }
 * ]
 */