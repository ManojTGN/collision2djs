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
        var segmentLength = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));

        var dotProduct = ((this.x - shape.x1) * (shape.x2 - shape.x1) + (this.y - shape.y1) * (shape.y2 - shape.y1)) / Math.pow(segmentLength, 2);
        var closestX = shape.x1 + dotProduct * (shape.x2 - shape.x1);
        var closestY = shape.y1 + dotProduct * (shape.y2 - shape.y1);

        if (closestX < Math.min(shape.x1, shape.x2) || closestX > Math.max(shape.x1, shape.x2) ||
            closestY < Math.min(shape.y1, shape.y2) || closestY > Math.max(shape.y1, shape.y2)) {
            return false;
        }

        var distance = Math.sqrt(Math.pow(this.x - closestX, 2) + Math.pow(this.y - closestY, 2));
        var tolerance = 1e-6;
        if (distance <= tolerance) {
            return true;
        }

        return false;
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
        if(distance <= (shape.radius/2)){
            return true;
        }

        return false;
    }             

    static PointTriangle(this:Point, shape:Triangle):boolean{
        var alpha = ((shape.p2.y - shape.p3.y) * (this.x - shape.p3.x) + (shape.p3.x - shape.p2.x) * (this.y - shape.p3.y)) / ((shape.p2.y - shape.p3.y) * (shape.p1.x - shape.p3.x) + (shape.p3.x - shape.p2.x) * (shape.p1.y - shape.p3.y));
        var beta  = ((shape.p3.y - shape.p1.y) * (this.x - shape.p3.x) + (shape.p3.x - shape.p3.x) * (this.y - shape.p3.y)) / ((shape.p2.y - shape.p3.y) * (shape.p1.x - shape.p3.x) + (shape.p3.x - shape.p2.x) * (shape.p1.y - shape.p3.y));
        var gamma = 1 - alpha - beta;

        if (alpha >= 0 && beta >= 0 && gamma >= 0) 
            return true;

        return false;
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
        const rectRight = shape.x + shape.width;
        const rectBottom = shape.y + shape.height;
        
        // Check if line segment is outside the rectangle
        if (this.x1 < shape.x && this.x2 < shape.x ||
            this.x1 > rectRight && this.x2 > rectRight ||
            this.y1 < shape.y && this.y2 < shape.y ||
            this.y1 > rectBottom && this.y2 > rectBottom) {
          return false;
        }
      
        // Check if line segment intersects any of the rectangle's sides
        if (this.x1 >= shape.x && this.x1 <= rectRight && this.y1 >= shape.y && this.y1 <= rectBottom ||
            this.x2 >= shape.x && this.x2 <= rectRight && this.y2 >= shape.y && this.y2 <= rectBottom) {
          return true;
        }
      
        // Check if line segment intersects rectangle's horizontal sides
        const m = (this.y2 - this.y1) / (this.x2 - this.x1);
        const yLeft = m * (shape.x - this.x1) + this.y1;
        const yRight = m * (rectRight - this.x1) + this.y1;
        if ((yLeft >= shape.y && yLeft <= rectBottom) ||
            (yRight >= shape.y && yRight <= rectBottom)) {
          return true;
        }
      
        // Check if line segment intersects rectangle's vertical sides
        const invM = (this.x2 - this.x1) / (this.y2 - this.y1);
        const xTop = invM * (shape.y - this.y1) + this.x1;
        const xBottom = invM * (rectBottom - this.y1) + this.x1;
        if ((xTop >= shape.x && xTop <= rectRight) ||
            (xBottom >= shape.x && xBottom <= rectRight)) {
          return true;
        }
      
        return false;
    }

    static LineCircle(this:Line, shape:Circle):boolean{
        
        return Intersection.LineCircle.bind(this,shape)()?true:false;

        //todo: horizontal circle line collision not detected (bug)
        // const dx = this.x2 - this.x1;
        // const dy = this.y2 - this.y1;
        // const lineLength = Math.sqrt(dx * dx + dy * dy);
    
        // const crossProduct = (shape.x - this.x1) * dy - (shape.y - this.y1) * dx;
    
        // if(Math.abs(crossProduct / lineLength) > (shape.radius/2)){
        //     return false;
        // }
    
        // const dotProduct = (shape.x - this.x1) * dx + (shape.y - this.y1) * dy;
        // if(dotProduct < 0 || dotProduct > lineLength * lineLength){
        //     return false;
        // }
    
        // const distanceToLine = Math.abs(dx * (shape.y - this.y1) - dy * (shape.x - this.x1)) / lineLength;
        // if (distanceToLine > (shape.radius/2) && lineLength > (shape.radius/2)) {
        //     return false;
        // }
    
        // return true;
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

        return distanceSquared < ((shape.radius/2) * (shape.radius/2));
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