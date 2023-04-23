const { Rect, Circle } = require("@manojtgn/collision2djs")

const rect   = new Rect(100,100,100,100);
const circle = new Circle(150,150,100);

const collision = rect.getIntersection( circle );
console.log(collision);

/* 
 * OUTPUT:
 * [
 * Point {
 *   x: 150,
 *   y: 100,
 * },
 * Point {
 *   x: 100,
 *   y: 150,
 * },
 * Point {
 *   x: 200,
 *   y: 150,
 * },
 * Point {
 *   x: 150,
 *   y: 200,
 * }
 * ] 
 * 
 */