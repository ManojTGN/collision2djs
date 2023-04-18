import { Circle } from "./shape/circle";
import { Line } from "./shape/line";
import { Point } from "./shape/point";
import { Rect } from "./shape/rect";
import { Triangle } from "./shape/triangle";

export default class Collision {

    static PointPoint(this:Point, shape:Point):Point[]|null{
        return null;
    }

    static PointLine(this:Point, shape:Line):Point[]|null{
        const slope = (shape.point2.y - shape.point1.y) / (shape.point2.x - shape.point1.x);
            
        const yIntercept = shape.point1.y - slope * shape.point1.x;
        const expectedY = slope * this.x + yIntercept;
        
        if( Math.abs(expectedY - this.y) < 0.0001 ){
            return [new Point(this.x,this.y,true)];
        }

        return null;
    }

    static PointRect(this:Point, shape:Rect):Point[]|null{
        return null;
    }

    static PointCircle(this:Point, shape:Circle):Point[]|null{
        return null;
    }

    static PointTriangle(this:Point, shape:Triangle):Point[]|null{
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

        const topIntersection = this.isCollideWith( 
            new Line( shape.x, shape.y, shape.x + shape.width, shape.y, true)
        );
        if (topIntersection != null) {
            points.push(...topIntersection);
        }
        
        const rightIntersection = this.isCollideWith(
            new Line(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.height, true )
        );
        if (rightIntersection != null) {
            points.push(...rightIntersection);
        }
        
        const bottomIntersection = this.isCollideWith(
            new Line(shape.x, shape.y + shape.height, shape.x + shape.width, shape.y + shape.height, true)
        );
        if (bottomIntersection != null) {
            points.push(...bottomIntersection);
        }
        
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

    static LineCircle(this:Line, shape:Circle):Point[]|null{
        
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

    static LineTriangle(this:Line, shape:Triangle):Point[]|null{
        
        const points = [];

        const topIntersection = this.isCollideWith( 
            new Line( shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y, true)
        );
        if (topIntersection != null) {
            points.push(...topIntersection);
        }

        const rightIntersection = this.isCollideWith(
            new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y, true )
        );
        if (rightIntersection != null) {
            points.push(...rightIntersection);
        }
        
        const bottomIntersection = this.isCollideWith(
            new Line(shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y, true)
        );
        if (bottomIntersection != null) {
            points.push(...bottomIntersection);
        }

        if(points.length>0)
            return points;

        return null;

    }

    static RectRect(this:Rect, shape:Rect):Point[]|null{
        return null;
    }

    static RectCircle(this:Rect, shape:Circle):Point[]|null{
        return null;
    }

    static RectTriangle(this:Rect, shape:Triangle):Point[]|null{
        return null;
    }

    static CircleCircle(this:Circle, shape:Circle):Point[]|null{
        return null;
    }

    static CircleRect(this:Circle, shape:Rect):Point[]|null{
        return null;
    }

    static CircleTriangle(this:Circle, shape:Triangle):Point[]|null{
        return null;
    }

    static TriangleTriangle(this:Triangle, shape:Triangle):Point[]|null{
        return null;
    }

}