import Collision from "../collision";
import {Shapes, TEvent} from "../shapes";
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
    onCollisionExit: ((event:(Point|Line|Rect|Circle|Triangle)[])=>void)|null;

    isCollideWith( shape: this|Line|Rect|Circle|Triangle ):boolean|null{
        if(shape instanceof Line)
            return Collision.PointLine.bind(this,shape)()

        if(shape instanceof Point)
            return Collision.PointPoint.bind(this,shape)()
        
        if(shape instanceof Rect)
            return Collision.PointRect.bind(this,shape)()
        
        if(shape instanceof Circle)
            return Collision.PointCircle.bind(this,shape)()

        if(shape instanceof Triangle)
            return Collision.PointTriangle.bind(this,shape)()

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
