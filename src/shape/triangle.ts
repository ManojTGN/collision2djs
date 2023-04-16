import {Shapes, TEvent} from "../shapes";
import { Circle } from "./circle";
import { Line } from "./line";
import { Point } from "./point";
import { Rect } from "./rect";

export type TTriangle = new (x1:number,y1:number,x2:number,y2:number,x3:number,y3:number) => void;

export class Triangle{
    x1:number;
    y1:number;
    x2:number;
    y2:number;
    x3:number;
    y3:number;
    onTrigger:boolean;
    collisionWith: Map<(Point|Line|Rect|Circle|Triangle),boolean>;
    onCollisionEnter: ((event:TEvent[])=>void)|null;
    onCollisionExit: ((event:(Point|Line|Rect|Circle|Triangle)[])=>void)|null;

    isCollideWith( shape: Point|Line|Rect|Circle|this ):Point[]|null{
        return null;
    }

    constructor(x1:number,y1:number,x2:number,y2:number,x3:number,y3:number){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;

        Shapes.add(this);
    }

}
