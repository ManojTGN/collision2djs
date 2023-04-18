import {Shapes, TEvent} from "../shapes";
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
    onCollisionExit: ((event:(Point|Line|Rect|Circle|Triangle)[])=>void)|null;
    
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


    isCollideWith( shape: Point|Line|Rect|this|Triangle ):Point[]|null{
        return null;
    }

    constructor(x:number,y:number,radius:number){
        this.point = new Point(x,y,true);
        this.r = radius;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;

        Shapes.add(this);
    }

}
