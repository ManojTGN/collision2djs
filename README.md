# collision2djs
 
@manojtgn/collision2djs is a versatile and efficient npm package designed to accurately detect and compute collision and intersection points between various 2D shapes such as lines, rectangles, circles, and triangles.

This package offers a range of optimized algorithms to ensure high-performance and precision in collision detection. Whether you're working on a game or any other application that requires 2D collision detection, @manojtgn/collision2djs provides a reliable and user-friendly solution.

## Features
- Accurately detects collision and intersection points between 2D shapes
- Optimized for high-performance and reliability
- Supports collision and intersection calculations for lines, rectangles, circles, and triangles
- User-friendly API with comprehensive documentation and examples
- Designed to be extensible, allowing developers to add support for additional shapes and algorithms in the future

## Installation
You can install @manojtgn/collision2djs using npm:
```npm
npm install @manojtgn/collision2djs
```

## Usage
To use the package, import it into your code and call the relevant function(s) for the shapes you want to detect collisions or intersections for.

Here's an example of how to detect a collision between two rectangles:
```js
const { Rect, Circle } = require("@manojtgn/collision2djs");

const circle = circle(400, 400, 25);
const rect = rect(10,10,100,100);

if (circle.isCollideWith(rect)) {
   console.log("Colliding!");
} else {
  console.log("Not Colliding.");
}
```
Please refer to the package's documentation for more details on how to use it.

## Documentation
The full documentation for @manojtgn/collision2djs can be found in the docs folder of the package's GitHub repository.

## Contributing
Contributions are welcome! Please see our contribution guidelines for more information on how to get started.

## License
@manojtgn/collision2djs is licensed under the MIT License.
