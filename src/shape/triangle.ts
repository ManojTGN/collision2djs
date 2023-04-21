import Intersection from "../primitive/intersection";
import {Shapes, TEvent} from "../primitive/shapes";
import { Circle } from "./circle";
import { Line } from "./line";
import { Point } from "./point";
import { Rect } from "./rect";

export class Triangle{
    point1:Point;
    point2:Point;
    point3:Point;
    onTrigger:boolean;
    collisionWith: Map<(Point|Line|Rect|Circle|Triangle),boolean>;
    onCollisionEnter: ((event:TEvent[])=>void)|null;
    onCollisionExit: ((event:TEvent[])=>void)|null;

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

    set p3(p3:Point){
        this.point2.x = p3.x;
        this.point2.y = p3.y;
        Shapes.collision(this);
    }
    get p3():Point{return this.point3;}
    
    isCollideWith( shape:this|Line|Rect|Circle|Triangle ):boolean{
        return this.collisionWith.get(shape)?true:false
    }

    getIntersection( shape: Point|Line|Rect|Circle|this ):Point[]|Point|null{
        if(shape instanceof Line)
            return Intersection.LineTriangle.bind(shape,this)()

        if(shape instanceof Point)
            return Intersection.PointTriangle.bind(shape,this)()
        
        if(shape instanceof Rect)
            return Intersection.RectTriangle.bind(shape,this)()
        
        if(shape instanceof Circle)
            return Intersection.CircleTriangle.bind(shape,this)()

        if(shape instanceof Triangle)
            return Intersection.TriangleTriangle.bind(this,shape)()

        
        return null;
    }

    constructor(x1:number,y1:number,x2:number,y2:number,x3:number,y3:number){
        this.point1 = new Point(x1,y1);
        this.point2 = new Point(x2,y2);
        this.point3 = new Point(x3,y3);
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }

}
