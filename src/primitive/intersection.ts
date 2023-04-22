import { Circle } from "../shape/circle";
import { Line } from "../shape/line";
import { Point } from "../shape/point";
import { Rect } from "../shape/rect";
import { Triangle } from "../shape/triangle";

export default class Intersection {

    static PointPoint(this:Point, shape:Point):Point|null{
        if(this.x == shape.x && this.y == shape.y)
            return new Point(this.x, this.y);

        return null;
    }

    static PointLine(this:Point, shape:Line):Point|null{
        var segmentLength = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));

        var dotProduct = ((this.x - shape.x1) * (shape.x2 - shape.x1) + (this.y - shape.y1) * (shape.y2 - shape.y1)) / Math.pow(segmentLength, 2);
        var closestX = shape.x1 + dotProduct * (shape.x2 - shape.x1);
        var closestY = shape.y1 + dotProduct * (shape.y2 - shape.y1);

        if (closestX < Math.min(shape.x1, shape.x2) || closestX > Math.max(shape.x1, shape.x2) ||
            closestY < Math.min(shape.y1, shape.y2) || closestY > Math.max(shape.y1, shape.y2)) {
            return null;
        }

        var distance = Math.sqrt(Math.pow(this.x - closestX, 2) + Math.pow(this.y - closestY, 2));
        var tolerance = 1e-6;
        if (distance <= tolerance) {
            return new Point(this.x, this.y);
        }

        return null;
    }

    static PointRect(this:Point, shape:Rect):Point|null{
        const top = new Line(shape.x,shape.y,shape.x+shape.width,shape.y).getIntersection(this);
        if(top && !(top instanceof Array)) return top;

        const bottom = new Line(shape.x,shape.y+shape.height,shape.x+shape.width,shape.y+shape.height).getIntersection(this);
        if(bottom && !(bottom instanceof Array)) return bottom;

        const left = new Line(shape.x,shape.y,shape.x,shape.y+shape.height).getIntersection(this);
        if(left && !(left instanceof Array)) return left;

        const right = new Line(shape.x+shape.width,shape.y,shape.x+shape.width,shape.y+shape.height).getIntersection(this);
        if(right && !(right instanceof Array)) return right;

        return null;
    }

    static PointCircle(this:Point, shape:Circle):Point|null{
        const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2));

        if(Math.floor(distance) == Math.floor(shape.radius/2)){
            return new Point(this.x,this.y);
        }

        return null;
    }             

    static PointTriangle(this:Point, shape:Triangle):Point|null{
        const l1 = new Line(shape.p1.x,shape.p1.y,shape.p2.x,shape.p2.y).getIntersection(this);
        if(l1 && !(l1 instanceof Array)) return l1;

        const l2 = new Line(shape.p2.x,shape.p2.y,shape.p3.x,shape.p3.y).getIntersection(this);
        if(l2 && !(l2 instanceof Array)) return l2;

        const l3 = new Line(shape.p3.x,shape.p3.y,shape.p1.x,shape.p1.y).getIntersection(this);
        if(l3 && !(l3 instanceof Array)) return l3;

        return null;
    }

    static LineLine(this:Line, shape:Line):Point[]|null{
        
        const denominator = (shape.point2.y - shape.point1.y) * (this.point2.x - this.point1.x) - (shape.point2.x - shape.point1.x) * (this.point2.y - this.point1.y);
        
        if (denominator == 0) {
            return null; 
        }

        const ua = ((shape.point2.x - shape.point1.x) * (this.point1.y - shape.point1.y) - (shape.point2.y - shape.point1.y) * (this.point1.x - shape.point1.x)) / denominator;
        const ub = ((this.point2.x - this.point1.x) * (this.point1.y - shape.point1.y) - (this.point2.y - this.point1.y) * (this.point1.x - shape.point1.x)) / denominator;

        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            const x = this.point1.x + ua * (this.point2.x - this.point1.x);
            const y = this.point1.y + ua * (this.point2.y - this.point1.y);
            return [ new Point(x, y) ];
        }

        return null;

    }

    static LineRect(this:Line, shape:Rect):Point[]|null{
        const points = [];

        const topIntersection = this.getIntersection( 
            new Line( shape.x, shape.y, shape.x + shape.width, shape.y)
        );
        if (topIntersection != null && topIntersection instanceof Array) {
            points.push(...topIntersection);
        }
        
        const rightIntersection = this.getIntersection(
            new Line(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.height )
        );
        if (rightIntersection != null && rightIntersection instanceof Array) {
            points.push(...rightIntersection);
        }
        
        const bottomIntersection = this.getIntersection(
            new Line(shape.x, shape.y + shape.height, shape.x + shape.width, shape.y + shape.height )
        );
        if (bottomIntersection != null && bottomIntersection instanceof Array) {
            points.push(...bottomIntersection);
        }
        
        const leftIntersection = this.getIntersection( 
            new Line(shape.x, shape.y, shape.x, shape.y + shape.height )
        );
        if (leftIntersection != null && leftIntersection instanceof Array) {
            points.push(...leftIntersection);
        }

        if(points.length>0)
            return points;

        return null;
    }

    static LineCircle(this:Line, shape:Circle):Point[]|null{
        let minX = Math.min(this.x1, this.x2);
        let maxX = Math.max(this.x1, this.x2);
        let minY = Math.min(this.y1, this.y2);
        let maxY = Math.max(this.y1, this.y2);
      
        if (shape.x + (shape.radius/2) < minX || shape.x - (shape.radius/2) > maxX || shape.y + (shape.radius/2) < minY || shape.y - (shape.radius/2) > maxY) {
          return null;
        }
      
        let dx = this.x2 - this.x1;
        let dy = this.y2 - this.y1;
        let a = dx * dx + dy * dy;
        let b = 2 * (dx * (this.x1 - shape.x) + dy * (this.y1 - shape.y));
        let c = shape.x * shape.x + shape.y * shape.y + this.x1 * this.x1 + this.y1 * this.y1 - 2 * (shape.x * this.x1 + shape.y * this.y1) - (shape.radius/2) * (shape.radius/2);
        let discriminant = b * b - 4 * a * c;
      
        if (discriminant < 0) {
          return null;
        }
      
        let t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let intersections: Point[] = [];
      
        if (t1 >= 0 && t1 <= 1) {
          intersections.push(new Point(this.x1 + t1 * dx, this.y1 + t1 * dy));
        }
      
        if (t2 >= 0 && t2 <= 1) {
          intersections.push(new Point(this.x1 + t2 * dx, this.y1 + t2 * dy));
        }
      
        if (intersections.length > 0) {
          return intersections;
        }

        return null;

    }

    static LineTriangle(this:Line, shape:Triangle):Point[]|null{
        
        const points = [];

        const topIntersection = this.getIntersection( 
            new Line( shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y)
        );
        if (topIntersection != null && topIntersection instanceof Array) {
            points.push(...topIntersection);
        }

        const rightIntersection = this.getIntersection(
            new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y )
        );
        if (rightIntersection != null && rightIntersection instanceof Array) {
            points.push(...rightIntersection);
        }
        
        const bottomIntersection = this.getIntersection(
            new Line(shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y)
        );
        if (bottomIntersection != null && bottomIntersection instanceof Array) {
            points.push(...bottomIntersection);
        }

        if(points.length>0)
            return points;

        return null;

    }

    static RectRect(this:Rect, shape:Rect):Point[]|null{
        const top = shape.getIntersection(new Line(this.x,this.y,this.x+this.width,this.y));
        const bottom = shape.getIntersection(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height));
        const left = shape.getIntersection(new Line(this.x,this.y,this.x,this.y+this.height));
        const right = shape.getIntersection(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height));

        const points = [];

        if(top != null && top instanceof Array) points.push(...top);
        if(left != null && left instanceof Array) points.push(...left);
        if(right != null && right instanceof Array) points.push(...right);
        if(bottom != null && bottom instanceof Array) points.push(...bottom);

        if(points.length > 0)
            return points;

        return null;
    }

    static RectCircle(this:Rect, shape:Circle):Point[]|null{
        const top    = shape.getIntersection(new Line(this.x,this.y,this.x+this.width,this.y));
        const bottom = shape.getIntersection(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height));
        const left   = shape.getIntersection(new Line(this.x,this.y,this.x,this.y+this.height));
        const right  = shape.getIntersection(new Line(this.x+this.width,this.y,this.x+this.width,this.y+this.height));

        const points = [];
        if(top != null && top instanceof Array) points.push(...top);
        if(left != null && left instanceof Array) points.push(...left);
        if(right != null && right instanceof Array) points.push(...right);
        if(bottom != null && bottom instanceof Array) points.push(...bottom);

        if(points.length > 0)
            return points;
        
        return null;
    }

    static RectTriangle(this:Rect, shape:Triangle):Point[]|null{
        const top = shape.getIntersection(new Line(this.x,this.y,this.x+this.width,this.y));
        const bottom = shape.getIntersection(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height));
        const left = shape.getIntersection(new Line(this.x,this.y,this.x,this.y+this.height));
        const right = shape.getIntersection(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height));

        const points = [];

        if(top != null && top instanceof Array) points.push(...top);
        if(left != null && left instanceof Array) points.push(...left);
        if(right != null && right instanceof Array) points.push(...right);
        if(bottom != null && bottom instanceof Array) points.push(...bottom);

        if(points.length > 0)
            return points;

        return null;
    }

    static CircleCircle(this:Circle, shape:Circle):Point[]|null{

        let d = Math.sqrt((shape.x - this.x) ** 2 + (shape.y - this.y) ** 2);
        if (d > (this.radius/2) + (shape.radius/2) || d < Math.abs( (this.radius/2) - (shape.radius/2))) {
            return null;
        }

        let a = ((this.radius/2) ** 2 - (shape.radius/2) ** 2 + d ** 2) / (2 * d);

        let x3 = this.x + a * (shape.x - this.x) / d;
        let y3 = this.y + a * (shape.y - this.y) / d;
        
        if (d == (this.radius/2) + (this.radius/2) || d == Math.abs((this.radius/2) - (this.radius/2))) {
            return null;//[new Point(x3, y3, true)];
        }else{
            let h = Math.sqrt((this.radius/2) ** 2 - a ** 2);
            let x4 = x3 + h * (shape.y - this.y) / d;
            let y4 = y3 - h * (shape.x - this.x) / d;
            let x5 = x3 - h * (shape.y - this.y) / d;
            let y5 = y3 + h * (shape.x - this.x) / d;
            
            return [new Point(x4, y4), new Point(x5, y5)];
        }
    }

    static CircleTriangle(this:Circle, shape:Triangle):Point[]|null{
        const line1 = this.getIntersection(new Line(shape.p1.x,shape.p1.y,shape.p2.x,shape.p2.y));
        const line2 = this.getIntersection(new Line(shape.p2.x,shape.p2.y,shape.p3.x,shape.p3.y));
        const line3 = this.getIntersection(new Line(shape.p3.x,shape.p3.y,shape.p1.x,shape.p1.y));

        const points = [];

        if(line1 != null && line1 instanceof Array) points.push(...line1);
        if(line2 != null && line2 instanceof Array) points.push(...line2);
        if(line3 != null && line3 instanceof Array) points.push(...line3);

        if(points.length > 0)
            return points;

        return null;
    }
    
    static TriangleTriangle(this:Triangle, shape:Triangle):Point[]|null{
        const line1 = shape.getIntersection(new Line(this.p1.x,this.p1.y,this.p2.x,this.p2.y));
        const line2 = shape.getIntersection(new Line(this.p2.x,this.p2.y,this.p3.x,this.p3.y));
        const line3 = shape.getIntersection(new Line(this.p3.x,this.p3.y,this.p1.x,this.p1.y));

        const points = [];

        if(line1 != null && line1 instanceof Array) points.push(...line1);
        if(line2 != null && line2 instanceof Array) points.push(...line2);
        if(line3 != null && line3 instanceof Array) points.push(...line3);

        if(points.length > 0)
            return points;

        return null;
    }

}