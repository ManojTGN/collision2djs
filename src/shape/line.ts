import {Shapes, TEvent} from "../shapes";
import { Circle } from "./circle";
import { Point } from "./point";
import { Rect } from "./rect";
import { Triangle } from "./triangle";

export type TLine = new (x1:number,y1:number,x2:number,y2:number) => void;
// type SHAPES = Point|Line|Rect|Circle|Triangle;

export class Line{
    point1:Point;
    point2:Point;
    onTrigger:boolean;
    collisionWith: Map<(Point|Line|Rect|Circle|Triangle),boolean>;

    onCollisionEnter: ((event:TEvent[])=>void)|null;
    onCollisionExit: ((event:(Point|Line|Rect|Circle|Triangle)[])=>void)|null;

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

    isCollideWith( shape: Point|Line|Rect|Circle|Triangle):Point[]|null{
        if(shape instanceof Line){

            const denominator = (shape.point2.y - shape.point1.y) * (this.point2.x - this.point1.x) - (shape.point2.x - shape.point1.x) * (this.point2.y - this.point1.y);
            if (denominator == 0) {
                return null; 
            }

            const ua = ((shape.point2.x - shape.point1.x) * (this.point1.y - shape.point1.y) - (shape.point2.y - shape.point1.y) * (this.point1.x - shape.point1.x)) / denominator;
            const ub = ((this.point2.x - this.point1.x) * (this.point1.y - shape.point1.y) - (this.point2.y - this.point1.y) * (this.point1.x - shape.point1.x)) / denominator;

            if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
                const x = this.point1.x + ua * (this.point2.x - this.point1.x);
                const y = this.point1.y + ua * (this.point2.y - this.point1.y);
                return [ new Point(x, y, true) ];
            } 
            
            return null;
            
        }

        if(shape instanceof Point){
            
            const slope = (this.point2.y - this.point1.y) / (this.point2.x - this.point1.x);
            
            const yIntercept = this.point1.y - slope * this.point1.x;
            const expectedY = slope * shape.x + yIntercept;
            
            if( Math.abs(expectedY - shape.y) < 0.0001 ){
                return [new Point(shape.x,shape.y,true)];
            }

            return null;

        }

        if(shape instanceof Rect){
            
            const points = [];
            //top edge of the rectangle.
            const topIntersection = this.isCollideWith( 
                new Line( shape.x, shape.y, shape.x + shape.width, shape.y, true)
            );
            if (topIntersection != null) {
                points.push(...topIntersection);
            }
            
            //right edge of the rectangle.
            const rightIntersection = this.isCollideWith(
                new Line(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.height, true )
            );
            if (rightIntersection != null) {
                points.push(...rightIntersection);
            }
            
            //bottom edge of the rectangle.
            const bottomIntersection = this.isCollideWith(
                new Line(shape.x, shape.y + shape.height, shape.x + shape.width, shape.y + shape.height, true)
            );
            if (bottomIntersection != null) {
                points.push(...bottomIntersection);
            }
            
            //left edge of the rectangle.
            const leftIntersection = this.isCollideWith( 
                new Line(shape.x, shape.y, shape.x, shape.y + shape.height, true)
            );
            if (leftIntersection != null) {
                points.push(...leftIntersection);
            }

            if(points.length>0)
                return points;

            return null;

        }

        if(shape instanceof Circle){

            const points = [];

            const dx = this.point2.x - this.point1.x;
            const dy = this.point2.y - this.point1.y;
            const dr = Math.sqrt(dx * dx + dy * dy);
            const D = this.point1.x * this.point2.y - this.point2.x * this.point1.y;

            const discriminant = shape.radius * shape.radius * dr * dr - D * D;
            if (discriminant < 0) {
                return null;
            }

            const xPlusMinus = Math.sqrt(discriminant) * dy / (dr * dr);
            const yPlusMinus = Math.sqrt(discriminant) * -dx / (dr * dr);

            const intersection1 = new Point(
                (D * dy + Math.sign(dy) * dx * xPlusMinus) / (dr * dr),
                (-D * dx + Math.abs(dy) * yPlusMinus) / (dr * dr),
                true
            );
            const intersection2 = new Point(
                (D * dy - Math.sign(dy) * dx * xPlusMinus) / (dr * dr),
                (-D * dx - Math.abs(dy) * yPlusMinus) / (dr * dr),
                true
            );

            if ((intersection1.x >= Math.min(this.point1.x, this.point2.x) && intersection1.x <= Math.max(this.point1.x, this.point2.x)) &&
                (intersection1.y >= Math.min(this.point1.y, this.point2.y) && intersection1.y <= Math.max(this.point1.y, this.point2.y)) &&
                ((intersection1.x - shape.x) * (intersection1.x - shape.x) + (intersection1.y - shape.y) * (intersection1.y - shape.y) <= shape.radius * shape.radius)) {
                points.push(intersection1);
            }

            if ((intersection2.x >= Math.min(this.point1.x, this.point2.x) && intersection2.x <= Math.max(this.point1.x, this.point2.x)) &&
                (intersection2.y >= Math.min(this.point1.y, this.point2.y) && intersection2.y <= Math.max(this.point1.y, this.point2.y)) &&
                ((intersection2.x - shape.x) * (intersection2.x - shape.x) + (intersection2.y - shape.y) * (intersection2.y - shape.y) <= shape.radius * shape.radius)) {
                points.push(intersection2);
            }

            if(points.length > 0)
                return points;

            return null;
        }

        return null;
    }

    constructor(x1:number,y1:number,x2:number,y2:number,reference?:boolean){
        this.point1 = new Point(x1,y1,true);
        this.point2 = new Point(x2,y2,true);

        this.onTrigger = true;
        this.collisionWith = new Map();

        this.onCollisionEnter = null;
        this.onCollisionExit = null;

        if(!reference)
        Shapes.add(this);
    }

}
