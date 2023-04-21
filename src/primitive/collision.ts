import { Circle } from "../shape/circle";
import { Line } from "../shape/line";
import { Point } from "../shape/point";
import { Rect } from "../shape/rect";
import { Triangle } from "../shape/triangle";
import Intersection from "./intersection";

export default class Collision {

    static collide(shape1:(Point|Line|Rect|Circle|Triangle|null),shape2:(Point|Line|Rect|Circle|Triangle|null)):boolean{
        if(!shape1 || !shape2) return false;

        if(shape1 instanceof Point && shape2 instanceof Point)
            return Collision.PointPoint.bind(shape1,shape2)();
        
        if(shape1 instanceof Point && shape2 instanceof Line)
            return Collision.PointLine.bind(shape1,shape2)();
        else if(shape1 instanceof Line && shape2 instanceof Point)
            return Collision.PointLine.bind(shape2,shape1)();

        if(shape1 instanceof Point && shape2 instanceof Rect)
            return Collision.PointRect.bind(shape1,shape2)();
        else if(shape1 instanceof Rect && shape2 instanceof Point)
            return Collision.PointRect.bind(shape2,shape1)();

        if(shape1 instanceof Point && shape2 instanceof Circle)
            return Collision.PointCircle.bind(shape1,shape2)();
        else if(shape1 instanceof Circle && shape2 instanceof Point)
            return Collision.PointCircle.bind(shape2,shape1)();

        if(shape1 instanceof Point && shape2 instanceof Triangle)
            return Collision.PointTriangle.bind(shape1,shape2)();
        else if(shape1 instanceof Triangle && shape2 instanceof Point)
            return Collision.PointTriangle.bind(shape2,shape1)();

        if(shape1 instanceof Line && shape2 instanceof Line)
            return Collision.LineLine.bind(shape1,shape2)();

        if(shape1 instanceof Line && shape2 instanceof Rect)
            return Collision.LineRect.bind(shape1,shape2)();
        else if(shape1 instanceof Rect && shape2 instanceof Line)
            return Collision.LineRect.bind(shape2,shape1)();

        if(shape1 instanceof Line && shape2 instanceof Circle)
            return Collision.LineCircle.bind(shape1,shape2)();
        else if(shape1 instanceof Circle && shape2 instanceof Line)
            return Collision.LineCircle.bind(shape2,shape1)();

        if(shape1 instanceof Line && shape2 instanceof Triangle)
            return Collision.LineTriangle.bind(shape1,shape2)();
        else if(shape1 instanceof Triangle && shape2 instanceof Line)
            return Collision.LineTriangle.bind(shape2,shape1)();

        if(shape1 instanceof Rect && shape2 instanceof Rect)
            return Collision.RectRect.bind(shape1,shape2)();

        if(shape1 instanceof Rect && shape2 instanceof Circle)
            return Collision.RectCircle.bind(shape1,shape2)();
        else if(shape1 instanceof Circle && shape2 instanceof Rect)
            return Collision.RectCircle.bind(shape2,shape1)();

        if(shape1 instanceof Rect && shape2 instanceof Triangle)
            return Collision.RectTriangle.bind(shape1,shape2)();
        else if(shape1 instanceof Triangle && shape2 instanceof Rect)
            return Collision.RectTriangle.bind(shape2,shape1)();

        if(shape1 instanceof Circle && shape2 instanceof Circle)
            return Collision.CircleCircle.bind(shape1,shape2)();

        if(shape1 instanceof Circle && shape2 instanceof Triangle)
            return Collision.CircleTriangle.bind(shape1,shape2)();
        else if(shape1 instanceof Triangle && shape2 instanceof Circle)
            return Collision.CircleTriangle.bind(shape2,shape1)();

        if(shape1 instanceof Triangle && shape2 instanceof Triangle)
            return Collision.TriangleTriangle.bind(shape1,shape2)();

        return false;
    }

    static PointPoint(this:Point, shape:Point):boolean{
        return this.x == shape.x && this.y == shape.y
    }

    static PointLine(this:Point, shape:Line):boolean{
        return Intersection.PointLine.bind(this,shape)()?true:false;
    }

    static PointRect(this:Point, shape:Rect):boolean{
        if(
            this.x >= shape.x && this.x <= shape.x + shape.width &&
            this.y >= shape.y && this.y <= shape.y + shape.height 
        ){
            return true;
        }

        return false;
    }

    static PointCircle(this:Point, shape:Circle):boolean{
        const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2));
        if(distance <= shape.radius){
            return true;
        }

        return false;
    }             

    static PointTriangle(this:Point, shape:Triangle):boolean{

        let detT = (shape.p2.y - shape.p3.y) * (shape.p1.x - shape.p3.x) + (shape.p3.x - shape.p2.x) * (shape.p1.y - shape.p3.y);
        let beta = ((shape.p2.y - shape.p3.y) * (this.x - shape.p3.x) + (shape.p3.x - shape.p2.x) * (this.y - shape.p3.y)) / detT;
        let gamma = ((shape.p3.y - shape.p1.y) * (this.x - shape.p3.x) + (shape.p1.x - shape.p3.x) * (this.y - shape.p3.y)) / detT;
        let alpha = 1 - beta - gamma;
        
        return alpha >= 0 && alpha <= 1 && beta >= 0 && beta <= 1 && gamma >= 0 && gamma <= 1;
    }

    static LineLine(this:Line, shape:Line):boolean{
        
        let m1 = (this.y2 - this.y1) / (this.x2 - this.x1);
        let b1 = this.y1 - m1 * this.x1;
        let m2 = (shape.y2 - shape.y1) / (shape.x2 - shape.x1);
        let b2 = shape.y1 - m2 * shape.x1;
        
        if (m1 === m2) {
            return false;
        }
        
        let x = (b2 - b1) / (m1 - m2);
        if ((x >= this.x1 && x <= this.x2 || x >= this.x2 && x <= this.x1) &&
            (x >= shape.x1 && x <= shape.x2 || x >= shape.x1 && x <= shape.x2)) {
            return true;
        }
        
        return false;

    }

    static LineRect(this:Line, shape:Rect):boolean{
        let axisX = this.y1 - this.y2;
        let axisY = this.x2 - this.x1;

        let length = Math.sqrt(axisX * axisX + axisY * axisY);
        axisX /= length;
        axisY /= length;

        let p1 = (this.x1 * axisX + this.y1 * axisY);
        let p2 = (this.x2 * axisX + this.y2 * axisY);

        let r1 = (shape.x * axisX + shape.y * axisY);
        let r2 = ((shape.x + shape.width) * axisX + shape.y * axisY);
        let r3 = ((shape.x + shape.width) * axisX + (shape.y + shape.height) * axisY);
        let r4 = (shape.x * axisX + (shape.y + shape.height) * axisY);

        let lineMin = Math.min(p1, p2);
        let lineMax = Math.max(p1, p2);

        return  (lineMin <= r4 && lineMax >= r1) || (lineMin <= r1 && lineMax >= r2) ||
                (lineMin <= r2 && lineMax >= r3) || (lineMin <= r3 && lineMax >= r4) ;
    }

    static LineCircle(this:Line, shape:Circle):boolean{
        const dx = this.x2 - this.x1;
        const dy = this.y2 - this.y1;
        const lineLength = Math.sqrt(dx * dx + dy * dy);
        const distanceToLine = Math.abs(dx * (shape.y - this.y1) - dy * (shape.x - this.x1)) / lineLength;
        
        return distanceToLine <= shape.radius;
    }

    static LineTriangle(this:Line, shape:Triangle):boolean{
        if(Collision.LineLine.bind(this,new Line(shape.p1.x,shape.p1.y,shape.p2.x,shape.p2.y) )())
            return true;
    
        if(Collision.LineLine.bind(this,new Line(shape.p2.x,shape.p2.y,shape.p3.x,shape.p3.y) )())
            return true;
        
        if(Collision.LineLine.bind(this,new Line(shape.p3.x,shape.p3.y,shape.p1.x,shape.p1.y) )())
            return true;
        
        return false;
    }

    static RectRect(this:Rect, shape:Rect):boolean{
        if(Collision.LineRect.bind(new Line(this.x,this.y,this.x+this.width,this.y),this)())
            return true;

        if(Collision.LineRect.bind(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height),this)())
            return true;
        
        if(Collision.LineRect.bind(new Line(this.x,this.y,this.x,this.y+this.height),this)())
            return true;

        if(Collision.LineRect.bind(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height),this)())
            return true;

        return false;
    }

    static RectCircle(this:Rect, shape:Circle):boolean{
        let closestX = Math.max(this.x, Math.min(shape.x, this.x + this.width));
        let closestY = Math.max(this.y, Math.min(shape.y, this.y + this.height));
        let distanceX = shape.x - closestX;
        let distanceY = shape.y - closestY;
        let distanceSquared = distanceX * distanceX + distanceY * distanceY;

        return distanceSquared < (shape.radius * shape.radius);
    }

    static RectTriangle(this:Rect, shape:Triangle):boolean{
        if(Collision.LineTriangle.bind(new Line(this.x,this.y,this.x+this.width,this.y),shape)())
            return true;

        if(Collision.LineTriangle.bind(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height),shape)())
            return true;
        
        if(Collision.LineTriangle.bind(new Line(this.x,this.y,this.x,this.y+this.height),shape)())
            return true;
        
        if(Collision.LineTriangle.bind(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height),shape)())
            return true;

        return false;
    }

    static CircleCircle(this:Circle, shape:Circle):boolean{
        const dx = this.x - shape.x;
        const dy = this.y - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < (this.radius/2) + (shape.radius/2))
            return true;

        return false;
    }

    static CircleTriangle(this:Circle, shape:Triangle):boolean{
        if(Collision.LineCircle.bind(new Line(shape.p1.x,shape.p1.y,shape.p2.x,shape.p2.y),this)())
            return true;
        
        if(Collision.LineCircle.bind(new Line(shape.p2.x,shape.p2.y,shape.p3.x,shape.p3.y),this)())
            return true;
        
        if(Collision.LineCircle.bind(new Line(shape.p3.x,shape.p3.y,shape.p1.x,shape.p1.y),this)())
            return true;
        
        return false;
    }
    
    static TriangleTriangle(this:Triangle, shape:Triangle):boolean{
        if(Collision.LineTriangle.bind(new Line(this.p1.x,this.p1.y,this.p2.x,this.p2.y),this)())
            return true;
        
        if(Collision.LineTriangle.bind(new Line(this.p2.x,this.p2.y,this.p3.x,this.p3.y),this)())
            return true;
        
        if(Collision.LineTriangle.bind(new Line(this.p3.x,this.p3.y,this.p1.x,this.p1.y),this)())
            return true;
        
        return false;
    }

}