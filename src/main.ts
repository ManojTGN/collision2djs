import { Point, TPoint } from "./shape/point.js"
import { Line, TLine } from "./shape/line.js"

import { Rect, TRect } from "./shape/rect.js"
import { Circle, TCircle } from "./shape/circle.js"
import { Triangle, TTriangle } from "./shape/triangle.js"

export default class Collision2D{

    point:TPoint;
    line:TLine;

    rect:TRect;
    circle:TCircle;
    triangle:TTriangle;

    constructor(){
        this.point = Point;
        this.line = Line;

        this.rect = Rect;
        this.circle = Circle;
        this.triangle = Triangle;
    }
};
