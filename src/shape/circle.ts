import {Shapes, TEvent} from "../shapes";
import { Line } from "./line";
import { Point } from "./point";
import { Rect } from "./rect";
import { Triangle } from "./triangle";

export type TCircle = new (x:number,y:number,radius:number) => void;

export class Circle{
    x:number;
    y:number;
    radius:number;
    onTrigger:boolean;
    onCollision: (event:TEvent[])=>void;
    
    isCollideWith( shape: Point|Line|Rect|this|Triangle ):Point[]|null{
        return null;
    }

    constructor(x:number,y:number,radius:number){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.onTrigger = true;
        this.onCollision = (event:TEvent[]) => { }

        Shapes.add(this);
    }

}
