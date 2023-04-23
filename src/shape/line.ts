import Intersection from "../primitive/intersection";
import {Shapes, TEvent} from "../primitive/shapes";
import { Circle } from "./circle";
import { Point } from "./point";
import { Rect } from "./rect";
import { Triangle } from "./triangle";

export class Line{
    point1:Point;
    point2:Point;
    onTrigger:boolean;
    collisionWith: Map<(Point|Line|Rect|Circle|Triangle),boolean>;

    onCollisionEnter: ((event:TEvent[])=>void)|null;
    onCollisionExit: ((event:TEvent[])=>void)|null;

    set x1(x1:number){
        this.point1.x = x1;
        Shapes.collision(this);
    }
    get x1():number{return this.point1.x;}

    set y1(y1:number){
        this.point1.y = y1;
        Shapes.collision(this);
    }
    get y1():number{return this.point1.y;}

    set x2(x2:number){
        this.point2.x = x2;
        Shapes.collision(this);
    }
    get x2():number{return this.point2.x;}

    set y2(y2:number){
        this.point2.y = y2;
        Shapes.collision(this);
    }
    get y2():number{return this.point2.y;}

    set p1(p1:Point){
        this.point1.x = p1.x;
        this.point1.y = p1.y;
        Shapes.collision(this);
    }
    get p1():Point{return this.point1;}

    set p2(p2:Point){
        this.point2.x = p2.x;
        this.point2.y = p2.y;
        Shapes.collision(this);
    }
    get p2():Point{return this.point2;}

    isCollideWith( shape:this|Line|Rect|Circle|Triangle ):boolean{
        return this.collisionWith.get(shape)?true:false
    }

    getIntersection( shape: Point|Line|Rect|Circle|Triangle):Point[]|Point|null{
        if(shape instanceof Line)
            return Intersection.LineLine.bind(this,shape)()

        if(shape instanceof Point)
            return Intersection.PointLine.bind(shape,this)()
        
        if(shape instanceof Rect)
            return Intersection.LineRect.bind(this,shape)()
        
        if(shape instanceof Circle)
            return Intersection.LineCircle.bind(this,shape)()

        if(shape instanceof Triangle)
            return Intersection.LineTriangle.bind(this,shape)()

        return null;
    }

    /**
     * Line Constructor
     * @param {number} x1 - x-coordinate of the Line Starting Point
     * @param {number} y1 - y-coordinate of the Line Starting Point
     * @param {number} x2 - x-coordinate of the Line Ending Point
     * @param {number} y2 - y-coordinate of the Line Ending Point
     * 
     */
    constructor(x1:number,y1:number,x2:number,y2:number){
        this.point1 = new Point(x1,y1);
        this.point2 = new Point(x2,y2);

        this.onTrigger = true;
        this.collisionWith = new Map();

        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }

}
