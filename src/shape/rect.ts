import {Shapes, TEvent} from "../shapes.js"
import { Circle } from "./circle.js";
import { Line } from "./line.js";
import { Point } from "./point.js";
import { Triangle } from "./triangle.js";

export type TRect = new (x:number,y:number,width:number,height:number) => void;

export class Rect{
    x:number;
    y:number;
    width:number;
    height:number;
    onTrigger:boolean;
    onCollision: (event:TEvent[])=>void;

    isCollideWith( shape: Point|Line|this|Circle|Triangle ):Point[]|null{
        return null;
    }

    constructor(x:number, y:number, width:number, height:number = width){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.onTrigger = true;
        this.onCollision = (event:TEvent[]) => { }

        Shapes.add(this);
    }

};