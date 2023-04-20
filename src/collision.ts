import { Circle } from "./shape/circle";
import { Line } from "./shape/line";
import { Point } from "./shape/point";
import { Rect } from "./shape/rect";
import { Triangle } from "./shape/triangle";

export default class Collision {

    static PointPoint(this:Point, shape:Point):boolean{

        return this.x == shape.x && this.y == shape.y

    }

    static PointLine(this:Point, shape:Line):boolean{
        const slope = (shape.point2.y - shape.point1.y) / (shape.point2.x - shape.point1.x);
            
        const yIntercept = shape.point1.y - slope * shape.point1.x;
        const expectedY = slope * this.x + yIntercept;
        
        if( Math.abs(expectedY - this.y) < 0.0001 ){
            return true;
            // return [new Point(this.x,this.y,true)]; <- for point
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
        if(distance <= shape.radius){
            return true;
        }

        return false;
    }             

    static PointTriangle(this:Point, shape:Triangle):boolean{
        const area  = Math.abs((shape.point2.x - shape.point1.x) * (shape.point3.y - shape.point1.y) - (shape.point3.x - shape.point1.x) * (shape.point2.y - shape.point1.y));
        const area1 = Math.abs((shape.point1.x - this.x) * (shape.point2.y - this.y) - (shape.point2.x - this.x) * (shape.point1.y - this.y));
        const area2 = Math.abs((shape.point2.x - this.x) * (shape.point3.y - this.y) - (shape.point3.x - this.x) * (shape.point2.y - this.y));
        const area3 = Math.abs((shape.point3.x - this.x) * (shape.point1.y - this.y) - (shape.point1.x - this.x) * (shape.point3.y - this.y));
        
        if(area === area1 + area2 + area3){
            return true;
        }

        return false;
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
        if (topIntersection != null && topIntersection instanceof Array) {
            points.push(...topIntersection);
        }
        
        const rightIntersection = this.isCollideWith(
            new Line(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.height, true )
        );
        if (rightIntersection != null && rightIntersection instanceof Array) {
            points.push(...rightIntersection);
        }
        
        const bottomIntersection = this.isCollideWith(
            new Line(shape.x, shape.y + shape.height, shape.x + shape.width, shape.y + shape.height, true)
        );
        if (bottomIntersection != null && bottomIntersection instanceof Array) {
            points.push(...bottomIntersection);
        }
        
        const leftIntersection = this.isCollideWith( 
            new Line(shape.x, shape.y, shape.x, shape.y + shape.height, true)
        );
        if (leftIntersection != null && leftIntersection instanceof Array) {
            points.push(...leftIntersection);
        }

        if(points.length>0)
            return points;

        return null;
    }

    //todo: fix line circle collision
    static LineCircle(this:Line, shape:Circle):Point[]|null{
        
        function distanceBetweenPoints(x1:number, y1:number, x2:number, y2:number) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        }
        
        function clamp(value:number, min:number, max:number) {
            return Math.max(min, Math.min(max, value));
        }

        const dx = this.x2 - this.x1;
        const dy = this.y2 - this.y1;
        const l2 = dx * dx + dy * dy;
        const t = ((shape.x - this.x1) * dx + (shape.y - this.y1) * dy) / l2;
        const nearestX = clamp(this.x1 + t * dx, Math.min(this.x1, this.x2), Math.max(this.x1, this.x2));
        const nearestY = clamp(this.y1 + t * dy, Math.min(this.y1, this.y2), Math.max(this.y1, this.y2));
        
        const distance = distanceBetweenPoints(nearestX, nearestY, shape.x, shape.y);
        
        if (distance <= shape.radius) {
            
            const d = Math.sqrt(shape.radius * shape.radius - distance * distance);
            const collisionPoints = [];
        
            if (t >= 0 && t <= 1) {
                collisionPoints.push(new Point(nearestX - d * dy / Math.sqrt(l2), nearestY + d * dx / Math.sqrt(l2), true ));
                collisionPoints.push(new Point( nearestX + d * dy / Math.sqrt(l2), nearestY - d * dx / Math.sqrt(l2), true ));
            } else {
                collisionPoints.push(new Point(nearestX, nearestY, true));
            }
        
            return collisionPoints;
        }
        
        return null;

    }

    static LineTriangle(this:Line, shape:Triangle):Point[]|null{
        
        const points = [];

        const topIntersection = this.isCollideWith( 
            new Line( shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y, true)
        );
        if (topIntersection != null && topIntersection instanceof Array) {
            points.push(...topIntersection);
        }

        const rightIntersection = this.isCollideWith(
            new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y, true )
        );
        if (rightIntersection != null && rightIntersection instanceof Array) {
            points.push(...rightIntersection);
        }
        
        const bottomIntersection = this.isCollideWith(
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
        const top = shape.isCollideWith(new Line(this.x,this.y,this.x+this.width,this.y,true));
        const bottom = shape.isCollideWith(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height,true));
        const left = shape.isCollideWith(new Line(this.x,this.y,this.x,this.y+this.height,true));
        const right = shape.isCollideWith(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height,true));

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
        const top = shape.isCollideWith(new Line(this.x,this.y,this.x+this.width,this.y,true));
        const bottom = shape.isCollideWith(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height,true));
        const left = shape.isCollideWith(new Line(this.x,this.y,this.x,this.y+this.height,true));
        const right = shape.isCollideWith(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height,true));

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
        const top = shape.isCollideWith(new Line(this.x,this.y,this.x+this.width,this.y,true));
        const bottom = shape.isCollideWith(new Line(this.x,this.y+this.height,this.x+this.width,this.y+this.height,true));
        const left = shape.isCollideWith(new Line(this.x,this.y,this.x,this.y+this.height,true));
        const right = shape.isCollideWith(new Line(this.x + this.width,this.y,this.x + this.width,this.y+this.height,true));

        const points = [];

        if(top != null && top instanceof Array) points.push(...top);
        if(left != null && left instanceof Array) points.push(...left);
        if(right != null && right instanceof Array) points.push(...right);
        if(bottom != null && bottom instanceof Array) points.push(...bottom);

        if(points.length > 0)
            return points;

        return null;
    }

    //todo: fix circle circle collision
    static CircleCircle(this:Circle, shape:Circle):Point[]|null{
        const dx = shape.x - this.x;
        const dy = shape.y - this.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        if (distance <= this.radius + shape.radius) {
            
            const collisionPoints = [];
            if (distance === 0 && this.radius === shape.radius) {
                collisionPoints.push(new Point(this.x, this.y ));
            } else {
                const collisionAngle = Math.atan2(dy, dx);
                const collisionDist = (this.radius + shape.radius - distance) / 2;
                collisionPoints.push(new Point(this.x + (this.radius - collisionDist) * Math.cos(collisionAngle),this.y + (this.radius - collisionDist) * Math.sin(collisionAngle),true));
                collisionPoints.push(new Point(shape.x + (shape.radius - collisionDist) * Math.cos(collisionAngle + Math.PI),shape.y + (shape.radius - collisionDist) * Math.sin(collisionAngle + Math.PI),true));
            }

            return collisionPoints;
        }

        return null;
    }

    static CircleTriangle(this:Circle, shape:Triangle):Point[]|null{
        const line1 = this.isCollideWith(new Line(shape.p1.x,shape.p1.y,shape.p2.x,shape.p2.y,true));
        const line2 = this.isCollideWith(new Line(shape.p2.x,shape.p2.y,shape.p3.x,shape.p3.y,true));
        const line3 = this.isCollideWith(new Line(shape.p3.x,shape.p3.y,shape.p1.x,shape.p1.y,true));

        const points = [];

        if(line1 != null && line1 instanceof Array) points.push(...line1);
        if(line2 != null && line2 instanceof Array) points.push(...line2);
        if(line3 != null && line3 instanceof Array) points.push(...line3);

        if(points.length > 0)
            return points;

        return null;
    }

    static TriangleTriangle(this:Triangle, shape:Triangle):Point[]|null{
        const line1 = shape.isCollideWith(new Line(this.p1.x,this.p1.y,this.p2.x,this.p2.y,true));
        const line2 = shape.isCollideWith(new Line(this.p2.x,this.p2.y,this.p3.x,this.p3.y,true));
        const line3 = shape.isCollideWith(new Line(this.p3.x,this.p3.y,this.p1.x,this.p1.y,true));

        const points = [];

        if(line1 != null && line1 instanceof Array) points.push(...line1);
        if(line2 != null && line2 instanceof Array) points.push(...line2);
        if(line3 != null && line3 instanceof Array) points.push(...line3);

        if(points.length > 0)
            return points;

        return null;
    }

}