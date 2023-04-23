import Intersection from "../primitive/intersection";
import {Shapes, TEvent} from "../primitive/shapes";
import { Circle } from "./circle";
import { Line } from "./line";
import { Rect } from "./rect";
import { Triangle } from "./triangle";

export class Point{
    _x:number;
    _y:number;
    onTrigger:boolean;
    collisionWith: Map<(Point|Line|Rect|Circle|Triangle),boolean>;
    onCollisionEnter: ((event:TEvent[])=>void)|null;
    onCollisionExit: ((event:TEvent[])=>void)|null;

    set x(x:number){
        this._x = x;
        Shapes.collision(this);
    }
    get x():number{return this._x;}

    set y(y:number){
        this._y = y;
        Shapes.collision(this);
    }
    get y():number{return this._y;}

    isCollideWith( shape:this|Line|Rect|Circle|Triangle ):boolean{
        return this.collisionWith.get(shape)?true:false
    }

    getIntersection( shape: this|Line|Rect|Circle|Triangle ):Point|null{
        if(shape instanceof Line)
            return Intersection.PointLine.bind(this,shape)()

        if(shape instanceof Point)
            return Intersection.PointPoint.bind(this,shape)()
        
        if(shape instanceof Rect)
            return Intersection.PointRect.bind(this,shape)()
        
        if(shape instanceof Circle)
            return Intersection.PointCircle.bind(this,shape)()

        if(shape instanceof Triangle)
            return Intersection.PointTriangle.bind(this,shape)()

        return null;
    }

    /**
     * Point Constructor
     * @param {number} x - x-coordinate of the object Point
     * @param {number} y - y-coordinate of the object Point
     * 
     */
    constructor(x:number,y:number){
        this._x = x;
        this._y = y;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }

}
