import Intersection from "../primitive/intersection.js";
import {Shapes, TEvent} from "../primitive/shapes.js"
import { Circle } from "./circle.js";
import { Line } from "./line.js";
import { Point } from "./point.js";
import { Triangle } from "./triangle.js";

export class Rect{
    point:Point;
    w:number;
    h:number;
    onTrigger:boolean;
    collisionWith: Map<(Point|Line|Rect|Circle|Triangle),boolean>;

    onCollisionEnter: ((event:TEvent[])=>void)|null;
    onCollisionExit: ((event:TEvent[])=>void)|null;

    set x(x:number){
        this.point.x = x;
        Shapes.collision(this);
    }
    get x():number{return this.point.x;}

    set y(y:number){
        this.point.y = y;
        Shapes.collision(this);
    }
    get y():number{return this.point.y;}

    set width(width:number){
        this.w = width;
        Shapes.collision(this);
    }
    get width():number{return this.w;}

    set height(height:number){
        this.h = height;
        Shapes.collision(this);
    }
    get height():number{return this.h;}

    isCollideWith( shape:this|Line|Rect|Circle|Triangle ):boolean{
        return this.collisionWith.get(shape)?true:false
    }

    getIntersection( shape: Point|Line|this|Circle|Triangle ):Point[]|Point|null{
        if(shape instanceof Line)
            return Intersection.LineRect.bind(shape,this)()

        if(shape instanceof Point)
            return Intersection.PointRect.bind(shape,this)()
        
        if(shape instanceof Rect)
            return Intersection.RectRect.bind(this,shape)()
        
        if(shape instanceof Circle)
            return Intersection.RectCircle.bind(this,shape)()

        if(shape instanceof Triangle)
            return Intersection.RectTriangle.bind(this,shape)()

        
        return null;
    }
    /**
     * Rect Constructor
     * @param {number} x      - x-coordinate of the object Rect
     * @param {number} y      - y-coordinate of the object Rect
     * @param {number} width  - width of the object Rect
     * @param {number} height - height of the object Height
     * 
     */
    constructor(x:number, y:number, width:number, height:number = width){
        this.point = new Point(x,y);
        this.w = width;
        this.h = height;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }

};