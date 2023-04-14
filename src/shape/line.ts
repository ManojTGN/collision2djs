import {Shapes, TEvent} from "../shapes";
import { Circle } from "./circle";
import { Point } from "./point";
import { Rect } from "./rect";
import { Triangle } from "./triangle";

export type TLine = new (x1:number,y1:number,x2:number,y2:number) => void;

export class Line{
    x1:number;
    y1:number;
    x2:number;
    y2:number;
    onTrigger:boolean;
    onCollision: (event:TEvent[])=>void;

    isCollideWith( shape: Point|this|Rect|Circle|Triangle ):Point[]|null{
        if(shape instanceof Line){
            const denominator = ((shape.y2 - shape.y1) * (this.x2 - this.x1)) - ((shape.x2 - shape.x1) * (this.y2 - this.y1));
            if (denominator === 0) {
                return null;
            }

            const ua = (((shape.x2 - shape.x1) * (this.y1 - shape.y1)) - ((shape.y2 - shape.y1) * (this.x1 - shape.x1))) / denominator;
            const ub = (((this.x2 - this.x1) * (this.y1 - shape.y1)) - ((this.y2 - this.y1) * (this.x1 - shape.x1))) / denominator;

            if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
                const intersectionX = this.x1 + (ua * (this.x2 - this.x1));
                const intersectionY = this.y1 + (ua * (this.y2 - this.y1));
                return [new Point( intersectionX, intersectionY, true)];
            }

        }

        return null;
    }

    constructor(x1:number,y1:number,x2:number,y2:number){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.onTrigger = true;

        this.onCollision = (event:TEvent[]) => { }
        Shapes.add(this);
    }

}
