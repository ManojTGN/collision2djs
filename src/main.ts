import { Point } from "./shape/point.js"
import { Line } from "./shape/line.js"

import { Rect } from "./shape/rect.js"
import { Circle } from "./shape/circle.js"
import { Triangle } from "./shape/triangle.js"

import { Shapes } from "./primitive/shapes.js"
const addShape = Shapes.add;
const removeShape = Shapes.remove;

export {
    
    Point,
    Line,

    Rect,
    Circle,
    Triangle,

    addShape,
    removeShape

};