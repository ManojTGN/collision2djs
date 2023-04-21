import { Circle } from "./shape/circle";
import { Line } from "./shape/line";
import { Point } from "./shape/point";
import { Rect } from "./shape/rect";
import { Triangle } from "./shape/triangle";

export default class Collision {

    static PointPoint(this:Point, shape:Point):Point|null{

        if(this.x == shape.x && this.y == shape.y)
            return new Point(this.x, this.y, true);

        return null;
    }

    static PointLine(this:Point, shape:Line):Point|null{
        const slope = (shape.point2.y - shape.point1.y) / (shape.point2.x - shape.point1.x);
            
        const yIntercept = shape.point1.y - slope * shape.point1.x;
        const expectedY = slope * this.x + yIntercept;
        
        if( Math.abs(expectedY - this.y) < 0.0001 ){
            return new Point(this.x,this.y,true);
        }

        return null;
    }

    static PointRect(this:Point, shape:Rect):Point|null{
        if(
            this.x >= shape.x && this.x <= shape.x + shape.width &&
            this.y >= shape.y && this.y <= shape.y + shape.height 
        ){
            return new Point(this.x,this.y,true);
        }

        return null;
    }

    static PointCircle(this:Point, shape:Circle):Point|null{
        const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2));
        if(distance <= shape.radius){
            return new Point(this.x,this.y,true);
        }

        return null;
    }             

    static PointTriangle(this:Point, shape:Triangle):Point|null{
        const area  = Math.abs((shape.point2.x - shape.point1.x) * (shape.point3.y - shape.point1.y) - (shape.point3.x - shape.point1.x) * (shape.point2.y - shape.point1.y));
        const area1 = Math.abs((shape.point1.x - this.x) * (shape.point2.y - this.y) - (shape.point2.x - this.x) * (shape.point1.y - this.y));
        const area2 = Math.abs((shape.point2.x - this.x) * (shape.point3.y - this.y) - (shape.point3.x - this.x) * (shape.point2.y - this.y));
        const area3 = Math.abs((shape.point3.x - this.x) * (shape.point1.y - this.y) - (shape.point1.x - this.x) * (shape.point3.y - this.y));
        
        if(area === area1 + area2 + area3){
            return new Point(this.x,this.y,true);
        }

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
            return [ new Point(x, y, true) ];
        }

        return null;

    }

    static LineRect(this:Line, shape:Rect):Point[]|null{
        const points = [];

        const topIntersection = this.getIntersection( 
            new Line( shape.x, shape.y, shape.x + shape.width, shape.y, true)
        );
        if (topIntersection != null && topIntersection instanceof Array) {
            points.push(...topIntersection);
        }
        
        const rightIntersection = this.getIntersection(
            new Line(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.height, true )
        );
        if (rightIntersection != null && rightIntersection instanceof Array) {
            points.push(...rightIntersection);
        }
        
        const bottomIntersection = this.getIntersection(
            new Line(shape.x, shape.y + shape.height, shape.x + shape.width, shape.y + shape.height, true)
        );
        if (bottomIntersection != null && bottomIntersection instanceof Array) {
            points.push(...bottomIntersection);
        }
        
        const leftIntersection = this.getIntersection( 
            new Line(shape.x, shape.y, shape.x, shape.y + shape.height, true)
        );
        if (leftIntersection != null && leftIntersection instanceof Array) {
            points.push(...leftIntersection);
        }

        if(points.length>0)
            return points;

        return null;
    }

    static LineCircle(this:Line, shape:Circle):Point[]|null{

        let m = (this.y2 - this.y1) / (this.x2 - this.x1);
        let b = this.y1 - m * this.x1;
        
        let minX = Math.min(this.x1, this.x2);
        let maxX = Math.max(this.x1, this.x2);
        if (shape.x + (shape.radius/2) < minX || shape.x - (shape.radius/2) > maxX) {
            return null;
        }
        
        let a = 1 + m * m;
        let b1 = -2 * shape.x + 2 * m * (b - shape.y);
        let c = shape.x * shape.x + (b - shape.y) * (b - shape.y) - (shape.radius/2) * (shape.radius/2);
        
        let discriminant = b1 * b1 - 4 * a * c;
        
        if (discriminant < 0) {
            return null;
        }else if (discriminant == 0) {
            let x = -b1 / (2 * a);
            let y = m * x + b;
            if (x < minX || x > maxX) {
                return null;
            }
            return [new Point(x, y, true)];
        }
        else {
            let x1 = (-b1 + Math.sqrt(discriminant)) / (2 * a);
            let y1 = m * x1 + b;
            let x2 = (-b1 - Math.sqrt(discriminant)) / (2 * a);
            let y2 = m * x2 + b;

            let intersections = [];
            if (x1 >= minX && x1 <= maxX) {
                intersections.push(new Point(x1, y1, true));
            }
            if (x2 >= minX && x2 <= maxX) {
                intersections.push(new Point(x2, y2, true));
            }

            return intersections;
        }

    }

    static LineTriangle(this:Line, shape:Triangle):Point[]|null{
        
        const points = [];

        const topIntersection = this.getIntersection( 
            new Line( shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y, true)
        );
        if (topIntersection != null && topIntersection instanceof Array) {
            points.push(...topIntersection);
        }

        const rightIntersection = this.getIntersection(
            new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y, true )
        );
        if (rightIntersection != null && rightIntersection instanceof Array) {
            points.push(...rightIntersection);
        }
        
        const bottomIntersection = this.getIntersection(
            new Line(shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y, true)
        );
        if (bottomIntersection != null && bottomIntersection instanceof Array) {
            points.push(...bottomIntersection);
        }

        if(points.length>0)
            return points;

        return null;

    }

    static RectRect(this:Rect, shape:Rect):Point[]|null{
        const top = shape.getIntersection(new Line(this.x,this.y,this.x+this.width,this.y,true));
        const bottom = shape.getIntersection(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height,true));
        const left = shape.getIntersection(new Line(this.x,this.y,this.x,this.y+this.height,true));
        const right = shape.getIntersection(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height,true));

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
        const top = shape.getIntersection(new Line(this.x,this.y,this.x+this.width,this.y,true));
        const bottom = shape.getIntersection(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height,true));
        const left = shape.getIntersection(new Line(this.x,this.y,this.x,this.y+this.height,true));
        const right = shape.getIntersection(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height,true));

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
        const top = shape.getIntersection(new Line(this.x,this.y,this.x+this.width,this.y,true));
        const bottom = shape.getIntersection(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height,true));
        const left = shape.getIntersection(new Line(this.x,this.y,this.x,this.y+this.height,true));
        const right = shape.getIntersection(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height,true));

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
            
            return [new Point(x4, y4, true), new Point(x5, y5, true)];
        }
    }

    static CircleTriangle(this:Circle, shape:Triangle):Point[]|null{
        const line1 = this.getIntersection(new Line(shape.p1.x,shape.p1.y,shape.p2.x,shape.p2.y,true));
        const line2 = this.getIntersection(new Line(shape.p2.x,shape.p2.y,shape.p3.x,shape.p3.y,true));
        const line3 = this.getIntersection(new Line(shape.p3.x,shape.p3.y,shape.p1.x,shape.p1.y,true));

        const points = [];

        if(line1 != null && line1 instanceof Array) points.push(...line1);
        if(line2 != null && line2 instanceof Array) points.push(...line2);
        if(line3 != null && line3 instanceof Array) points.push(...line3);

        if(points.length > 0)
            return points;

        return null;
    }
    
    static TriangleTriangle(this:Triangle, shape:Triangle):Point[]|null{
        const line1 = shape.getIntersection(new Line(this.p1.x,this.p1.y,this.p2.x,this.p2.y,true));
        const line2 = shape.getIntersection(new Line(this.p2.x,this.p2.y,this.p3.x,this.p3.y,true));
        const line3 = shape.getIntersection(new Line(this.p3.x,this.p3.y,this.p1.x,this.p1.y,true));

        const points = [];

        if(line1 != null && line1 instanceof Array) points.push(...line1);
        if(line2 != null && line2 instanceof Array) points.push(...line2);
        if(line3 != null && line3 instanceof Array) points.push(...line3);

        if(points.length > 0)
            return points;

        return null;
    }

}