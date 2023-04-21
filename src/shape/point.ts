import Intersection from "../primitive/intersection";
import {Shapes, TEvent} from "../primitive/shapes";
import { Circle } from "./circle";
import { Line } from "./line";
import { Rect } from "./rect";
import { Triangle } from "./triangle";

export class Point{
    x:number;
    y:number;
    onTrigger:boolean;
    collisionWith: Map<(Point|Line|Rect|Circle|Triangle),boolean>;
    onCollisionEnter: ((event:TEvent[])=>void)|null;
    onCollisionExit: ((event:TEvent[])=>void)|null;

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

    constructor(x:number,y:number,reference?:boolean){
        this.x = x;
        this.y = y;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;

        if(!reference)
        Shapes.add(this);
    }

}
