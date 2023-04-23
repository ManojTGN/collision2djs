import Intersection from "../primitive/intersection";
import {Shapes, TEvent} from "../primitive/shapes";
import { Line } from "./line";
import { Point } from "./point";
import { Rect } from "./rect";
import { Triangle } from "./triangle";

export class Circle{
    point:Point;
    r:number;
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

    set radius(radius:number){
        this.r = radius;
        Shapes.collision(this);
    }
    get radius():number{return this.r;}

    isCollideWith( shape:this|Line|Rect|Circle|Triangle ):boolean{
        return this.collisionWith.get(shape)?true:false
    }

    getIntersection( shape: Point|Line|Rect|this|Triangle ):Point[]|Point|null{
        if(shape instanceof Line)
            return Intersection.LineCircle.bind(shape,this)()

        if(shape instanceof Point)
            return Intersection.PointCircle.bind(shape,this)()
        
        if(shape instanceof Rect)
            return Intersection.RectCircle.bind(shape,this)()
        
        if(shape instanceof Circle)
            return Intersection.CircleCircle.bind(this,shape)()

        if(shape instanceof Triangle)
            return Intersection.CircleTriangle.bind(this,shape)()

        
        return null;
    }

    /**
     * Line Constructor
     * @param {number} x      - circle center x-coordinate
     * @param {number} y      - circle center y-coordinate
     * @param {number} radius - radius of the object circle
     * 
     */
    constructor(x:number,y:number,radius:number){
        this.point = new Point(x,y);
        this.r = radius;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }

}
