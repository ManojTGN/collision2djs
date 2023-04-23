class Triangle {
    set x1(x1) {
        this.point1.x = x1;
        Shapes.collision(this);
    }
    get x1() { return this.point1.x; }
    set y1(y1) {
        this.point1.y = y1;
        Shapes.collision(this);
    }
    get y1() { return this.point1.y; }
    set p1(p1) {
        this.point1.x = p1.x;
        this.point1.y = p1.y;
        Shapes.collision(this);
    }
    get p1() { return this.point1; }
    set x2(x2) {
        this.point2.x = x2;
        Shapes.collision(this);
    }
    get x2() { return this.point2.x; }
    set y2(y2) {
        this.point2.y = y2;
        Shapes.collision(this);
    }
    get y2() { return this.point2.y; }
    set p2(p2) {
        this.point2.x = p2.x;
        this.point2.y = p2.y;
        Shapes.collision(this);
    }
    get p2() { return this.point2; }
    set x3(x3) {
        this.point3.x = x3;
        Shapes.collision(this);
    }
    get x3() { return this.point3.x; }
    set y3(y3) {
        this.point3.y = y3;
        Shapes.collision(this);
    }
    get y3() { return this.point3.y; }
    set p3(p3) {
        this.point2.x = p3.x;
        this.point2.y = p3.y;
        Shapes.collision(this);
    }
    get p3() { return this.point3; }
    isCollideWith(shape) {
        return this.collisionWith.get(shape) ? true : false;
    }
    getIntersection(shape) {
        if (shape instanceof Line)
            return Intersection.LineTriangle.bind(shape, this)();
        if (shape instanceof Point)
            return Intersection.PointTriangle.bind(shape, this)();
        if (shape instanceof Rect)
            return Intersection.RectTriangle.bind(shape, this)();
        if (shape instanceof Circle)
            return Intersection.CircleTriangle.bind(shape, this)();
        if (shape instanceof Triangle)
            return Intersection.TriangleTriangle.bind(this, shape)();
        return null;
    }
    /**
     * Triangle Constructor
     * @param {number} x1 - x-coordinate of the Triangle's Point1
     * @param {number} y1 - y-coordinate of the Triangle's Point1
     * @param {number} x2 - x-coordinate of the Triangle's Point2
     * @param {number} y2 - y-coordinate of the Triangle's Point2
     * @param {number} x3 - x-coordinate of the Triangle's Point3
     * @param {number} y3 - y-coordinate of the Triangle's Point3
     *
     */
    constructor(x1, y1, x2, y2, x3, y3) {
        this.point1 = new Point(x1, y1);
        this.point2 = new Point(x2, y2);
        this.point3 = new Point(x3, y3);
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }
}

class Rect {
    set x(x) {
        this.point.x = x;
        Shapes.collision(this);
    }
    get x() { return this.point.x; }
    set y(y) {
        this.point.y = y;
        Shapes.collision(this);
    }
    get y() { return this.point.y; }
    set width(width) {
        this.w = width;
        Shapes.collision(this);
    }
    get width() { return this.w; }
    set height(height) {
        this.h = height;
        Shapes.collision(this);
    }
    get height() { return this.h; }
    isCollideWith(shape) {
        return this.collisionWith.get(shape) ? true : false;
    }
    getIntersection(shape) {
        if (shape instanceof Line)
            return Intersection.LineRect.bind(shape, this)();
        if (shape instanceof Point)
            return Intersection.PointRect.bind(shape, this)();
        if (shape instanceof Rect)
            return Intersection.RectRect.bind(this, shape)();
        if (shape instanceof Circle)
            return Intersection.RectCircle.bind(this, shape)();
        if (shape instanceof Triangle)
            return Intersection.RectTriangle.bind(this, shape)();
        return null;
    }
    /**
     * Rect Constructor
     * @param {number} x      - x-coordinate of the object Rect
     * @param {number} y      - y-coordinate of the object Rect
     * @param {number} width  - width of the object Rect
     * @param {number} height - height of the object Height
     *
     */
    constructor(x, y, width, height = width) {
        this.point = new Point(x, y);
        this.w = width;
        this.h = height;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }
}

class Circle {
    set x(x) {
        this.point.x = x;
        Shapes.collision(this);
    }
    get x() { return this.point.x; }
    set y(y) {
        this.point.y = y;
        Shapes.collision(this);
    }
    get y() { return this.point.y; }
    set radius(radius) {
        this.r = radius;
        Shapes.collision(this);
    }
    get radius() { return this.r; }
    isCollideWith(shape) {
        return this.collisionWith.get(shape) ? true : false;
    }
    getIntersection(shape) {
        if (shape instanceof Line)
            return Intersection.LineCircle.bind(shape, this)();
        if (shape instanceof Point)
            return Intersection.PointCircle.bind(shape, this)();
        if (shape instanceof Rect)
            return Intersection.RectCircle.bind(shape, this)();
        if (shape instanceof Circle)
            return Intersection.CircleCircle.bind(this, shape)();
        if (shape instanceof Triangle)
            return Intersection.CircleTriangle.bind(this, shape)();
        return null;
    }
    /**
     * Line Constructor
     * @param {number} x      - circle center x-coordinate
     * @param {number} y      - circle center y-coordinate
     * @param {number} radius - radius of the object circle
     *
     */
    constructor(x, y, radius) {
        this.point = new Point(x, y);
        this.r = radius;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }
}

class Collision {
    static collide(shape1, shape2) {
        if (!shape1 || !shape2)
            return false;
        if (shape1 instanceof Point && shape2 instanceof Point)
            return Collision.PointPoint.bind(shape1, shape2)();
        if (shape1 instanceof Point && shape2 instanceof Line)
            return Collision.PointLine.bind(shape1, shape2)();
        else if (shape1 instanceof Line && shape2 instanceof Point)
            return Collision.PointLine.bind(shape2, shape1)();
        if (shape1 instanceof Point && shape2 instanceof Rect)
            return Collision.PointRect.bind(shape1, shape2)();
        else if (shape1 instanceof Rect && shape2 instanceof Point)
            return Collision.PointRect.bind(shape2, shape1)();
        if (shape1 instanceof Point && shape2 instanceof Circle)
            return Collision.PointCircle.bind(shape1, shape2)();
        else if (shape1 instanceof Circle && shape2 instanceof Point)
            return Collision.PointCircle.bind(shape2, shape1)();
        if (shape1 instanceof Point && shape2 instanceof Triangle)
            return Collision.PointTriangle.bind(shape1, shape2)();
        else if (shape1 instanceof Triangle && shape2 instanceof Point)
            return Collision.PointTriangle.bind(shape2, shape1)();
        if (shape1 instanceof Line && shape2 instanceof Line)
            return Collision.LineLine.bind(shape1, shape2)();
        if (shape1 instanceof Line && shape2 instanceof Rect)
            return Collision.LineRect.bind(shape1, shape2)();
        else if (shape1 instanceof Rect && shape2 instanceof Line)
            return Collision.LineRect.bind(shape2, shape1)();
        if (shape1 instanceof Line && shape2 instanceof Circle)
            return Collision.LineCircle.bind(shape1, shape2)();
        else if (shape1 instanceof Circle && shape2 instanceof Line)
            return Collision.LineCircle.bind(shape2, shape1)();
        if (shape1 instanceof Line && shape2 instanceof Triangle)
            return Collision.LineTriangle.bind(shape1, shape2)();
        else if (shape1 instanceof Triangle && shape2 instanceof Line)
            return Collision.LineTriangle.bind(shape2, shape1)();
        if (shape1 instanceof Rect && shape2 instanceof Rect)
            return Collision.RectRect.bind(shape1, shape2)();
        if (shape1 instanceof Rect && shape2 instanceof Circle)
            return Collision.RectCircle.bind(shape1, shape2)();
        else if (shape1 instanceof Circle && shape2 instanceof Rect)
            return Collision.RectCircle.bind(shape2, shape1)();
        if (shape1 instanceof Rect && shape2 instanceof Triangle)
            return Collision.RectTriangle.bind(shape1, shape2)();
        else if (shape1 instanceof Triangle && shape2 instanceof Rect)
            return Collision.RectTriangle.bind(shape2, shape1)();
        if (shape1 instanceof Circle && shape2 instanceof Circle)
            return Collision.CircleCircle.bind(shape1, shape2)();
        if (shape1 instanceof Circle && shape2 instanceof Triangle)
            return Collision.CircleTriangle.bind(shape1, shape2)();
        else if (shape1 instanceof Triangle && shape2 instanceof Circle)
            return Collision.CircleTriangle.bind(shape2, shape1)();
        if (shape1 instanceof Triangle && shape2 instanceof Triangle)
            return Collision.TriangleTriangle.bind(shape1, shape2)();
        return false;
    }
    static PointPoint(shape) {
        return this.x == shape.x && this.y == shape.y;
    }
    static PointLine(shape) {
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
    static PointRect(shape) {
        if (this.x >= shape.x && this.x <= shape.x + shape.width &&
            this.y >= shape.y && this.y <= shape.y + shape.height) {
            return true;
        }
        return false;
    }
    static PointCircle(shape) {
        const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2));
        if (distance <= (shape.radius / 2)) {
            return true;
        }
        return false;
    }
    static PointTriangle(shape) {
        var alpha = ((shape.p2.y - shape.p3.y) * (this.x - shape.p3.x) + (shape.p3.x - shape.p2.x) * (this.y - shape.p3.y)) / ((shape.p2.y - shape.p3.y) * (shape.p1.x - shape.p3.x) + (shape.p3.x - shape.p2.x) * (shape.p1.y - shape.p3.y));
        var beta = ((shape.p3.y - shape.p1.y) * (this.x - shape.p3.x) + (shape.p3.x - shape.p3.x) * (this.y - shape.p3.y)) / ((shape.p2.y - shape.p3.y) * (shape.p1.x - shape.p3.x) + (shape.p3.x - shape.p2.x) * (shape.p1.y - shape.p3.y));
        var gamma = 1 - alpha - beta;
        if (alpha >= 0 && beta >= 0 && gamma >= 0)
            return true;
        return false;
    }
    static LineLine(shape) {
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
    static LineRect(shape) {
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
    static LineCircle(shape) {
        return Intersection.LineCircle.bind(this, shape)() ? true : false;
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
    static LineTriangle(shape) {
        if (Collision.LineLine.bind(this, new Line(shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y))())
            return true;
        if (Collision.LineLine.bind(this, new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y))())
            return true;
        if (Collision.LineLine.bind(this, new Line(shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y))())
            return true;
        return false;
    }
    static RectRect(shape) {
        if (Collision.LineRect.bind(new Line(this.x, this.y, this.x + this.width, this.y), this)())
            return true;
        if (Collision.LineRect.bind(new Line(this.x, this.y + this.height, this.x + this.width, this.y + this.height), this)())
            return true;
        if (Collision.LineRect.bind(new Line(this.x, this.y, this.x, this.y + this.height), this)())
            return true;
        if (Collision.LineRect.bind(new Line(this.x + this.width, this.y, this.x + this.width, this.y + this.height), this)())
            return true;
        return false;
    }
    static RectCircle(shape) {
        let closestX = Math.max(this.x, Math.min(shape.x, this.x + this.width));
        let closestY = Math.max(this.y, Math.min(shape.y, this.y + this.height));
        let distanceX = shape.x - closestX;
        let distanceY = shape.y - closestY;
        let distanceSquared = distanceX * distanceX + distanceY * distanceY;
        return distanceSquared < ((shape.radius / 2) * (shape.radius / 2));
    }
    static RectTriangle(shape) {
        if (Collision.LineTriangle.bind(new Line(this.x, this.y, this.x + this.width, this.y), shape)())
            return true;
        if (Collision.LineTriangle.bind(new Line(this.x, this.y + this.height, this.x + this.width, this.y + this.height), shape)())
            return true;
        if (Collision.LineTriangle.bind(new Line(this.x, this.y, this.x, this.y + this.height), shape)())
            return true;
        if (Collision.LineTriangle.bind(new Line(this.x + this.width, this.y, this.x + this.width, this.y + this.height), shape)())
            return true;
        return false;
    }
    static CircleCircle(shape) {
        const dx = this.x - shape.x;
        const dy = this.y - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < (this.radius / 2) + (shape.radius / 2))
            return true;
        return false;
    }
    static CircleTriangle(shape) {
        if (Collision.LineCircle.bind(new Line(shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y), this)())
            return true;
        if (Collision.LineCircle.bind(new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y), this)())
            return true;
        if (Collision.LineCircle.bind(new Line(shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y), this)())
            return true;
        return false;
    }
    static TriangleTriangle(shape) {
        if (Collision.LineTriangle.bind(new Line(this.p1.x, this.p1.y, this.p2.x, this.p2.y), this)())
            return true;
        if (Collision.LineTriangle.bind(new Line(this.p2.x, this.p2.y, this.p3.x, this.p3.y), this)())
            return true;
        if (Collision.LineTriangle.bind(new Line(this.p3.x, this.p3.y, this.p1.x, this.p1.y), this)())
            return true;
        return false;
    }
}

class Shapes {
    static add(element) {
        if (!element)
            return;
        Shapes.SHAPES.push(element);
        Shapes.collision(element);
    }
    static remove(element) {
        if (!element)
            return;
        const index = Shapes.SHAPES.indexOf(element);
        if (index !== -1)
            Shapes.SHAPES.splice(index, 1);
    }
    static collision(element) {
        if (Shapes.SHAPES.indexOf(element) == -1)
            return;
        let onEnterEvent = new Map();
        let onExitEvent = new Map();
        Shapes.SHAPES.forEach((shape) => {
            if (element == shape)
                return;
            let events;
            let prevState = shape.collisionWith.get(element);
            let collision = Collision.collide(shape, element);
            if (!prevState && collision) {
                element.collisionWith.set(shape, true);
                if (!onEnterEvent.get(element) && element.onTrigger)
                    onEnterEvent.set(element, new Array());
                if (element.onTrigger) {
                    events = onEnterEvent.get(element);
                    if (events) {
                        events.push(shape);
                        onEnterEvent.set(element, events);
                        events = new Array();
                    }
                }
                shape.collisionWith.set(element, true);
                if (!onEnterEvent.get(shape) && shape.onTrigger)
                    onEnterEvent.set(shape, new Array());
                if (element.onTrigger) {
                    events = onEnterEvent.get(shape);
                    if (events) {
                        events.push(element);
                        onEnterEvent.set(element, events);
                        events = new Array();
                    }
                }
                return;
            }
            if (prevState && !collision) {
                if (!onExitEvent.get(element) && element.onTrigger)
                    onExitEvent.set(element, new Array());
                if (element.onTrigger) {
                    events = onExitEvent.get(element);
                    if (events) {
                        events.push(shape);
                        onExitEvent.set(element, events);
                        events = new Array();
                    }
                }
                if (!onExitEvent.get(shape) && shape.onTrigger)
                    onExitEvent.set(shape, new Array());
                if (shape.onTrigger) {
                    events = onExitEvent.get(shape);
                    if (events) {
                        events.push(element);
                        onExitEvent.set(shape, events);
                        events = new Array();
                    }
                }
                shape.collisionWith.delete(element);
                element.collisionWith.delete(shape);
                return;
            }
        });
        onEnterEvent.forEach((event, shape) => {
            if (event && event.length > 0 && shape.onCollisionEnter)
                shape.onCollisionEnter(event);
        });
        onExitEvent.forEach((event, shape) => {
            if (event && event.length > 0 && shape.onCollisionExit)
                shape.onCollisionExit(event);
        });
    }
    static collision_all() {
        Shapes.SHAPES.forEach((shape) => {
            Shapes.collision(shape);
        });
    }
}
Shapes.SHAPES = [];

class Line {
    set x1(x1) {
        this.point1.x = x1;
        Shapes.collision(this);
    }
    get x1() { return this.point1.x; }
    set y1(y1) {
        this.point1.y = y1;
        Shapes.collision(this);
    }
    get y1() { return this.point1.y; }
    set x2(x2) {
        this.point2.x = x2;
        Shapes.collision(this);
    }
    get x2() { return this.point2.x; }
    set y2(y2) {
        this.point2.y = y2;
        Shapes.collision(this);
    }
    get y2() { return this.point2.y; }
    set p1(p1) {
        this.point1.x = p1.x;
        this.point1.y = p1.y;
        Shapes.collision(this);
    }
    get p1() { return this.point1; }
    set p2(p2) {
        this.point2.x = p2.x;
        this.point2.y = p2.y;
        Shapes.collision(this);
    }
    get p2() { return this.point2; }
    isCollideWith(shape) {
        return this.collisionWith.get(shape) ? true : false;
    }
    getIntersection(shape) {
        if (shape instanceof Line)
            return Intersection.LineLine.bind(this, shape)();
        if (shape instanceof Point)
            return Intersection.PointLine.bind(shape, this)();
        if (shape instanceof Rect)
            return Intersection.LineRect.bind(this, shape)();
        if (shape instanceof Circle)
            return Intersection.LineCircle.bind(this, shape)();
        if (shape instanceof Triangle)
            return Intersection.LineTriangle.bind(this, shape)();
        return null;
    }
    /**
     * Line Constructor
     * @param {number} x1 - x-coordinate of the Line Starting Point
     * @param {number} y1 - y-coordinate of the Line Starting Point
     * @param {number} x2 - x-coordinate of the Line Ending Point
     * @param {number} y2 - y-coordinate of the Line Ending Point
     *
     */
    constructor(x1, y1, x2, y2) {
        this.point1 = new Point(x1, y1);
        this.point2 = new Point(x2, y2);
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }
}

class Intersection {
    static PointPoint(shape) {
        if (this.x == shape.x && this.y == shape.y)
            return new Point(this.x, this.y);
        return null;
    }
    static PointLine(shape) {
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
    static PointRect(shape) {
        const top = new Line(shape.x, shape.y, shape.x + shape.width, shape.y).getIntersection(this);
        if (top && !(top instanceof Array))
            return top;
        const bottom = new Line(shape.x, shape.y + shape.height, shape.x + shape.width, shape.y + shape.height).getIntersection(this);
        if (bottom && !(bottom instanceof Array))
            return bottom;
        const left = new Line(shape.x, shape.y, shape.x, shape.y + shape.height).getIntersection(this);
        if (left && !(left instanceof Array))
            return left;
        const right = new Line(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.height).getIntersection(this);
        if (right && !(right instanceof Array))
            return right;
        return null;
    }
    static PointCircle(shape) {
        const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) + Math.pow(shape.y - this.y, 2));
        if (Math.floor(distance) == Math.floor(shape.radius / 2)) {
            return new Point(this.x, this.y);
        }
        return null;
    }
    static PointTriangle(shape) {
        const l1 = new Line(shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y).getIntersection(this);
        if (l1 && !(l1 instanceof Array))
            return l1;
        const l2 = new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y).getIntersection(this);
        if (l2 && !(l2 instanceof Array))
            return l2;
        const l3 = new Line(shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y).getIntersection(this);
        if (l3 && !(l3 instanceof Array))
            return l3;
        return null;
    }
    static LineLine(shape) {
        const denominator = (shape.point2.y - shape.point1.y) * (this.point2.x - this.point1.x) - (shape.point2.x - shape.point1.x) * (this.point2.y - this.point1.y);
        if (denominator == 0) {
            return null;
        }
        const ua = ((shape.point2.x - shape.point1.x) * (this.point1.y - shape.point1.y) - (shape.point2.y - shape.point1.y) * (this.point1.x - shape.point1.x)) / denominator;
        const ub = ((this.point2.x - this.point1.x) * (this.point1.y - shape.point1.y) - (this.point2.y - this.point1.y) * (this.point1.x - shape.point1.x)) / denominator;
        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            const x = this.point1.x + ua * (this.point2.x - this.point1.x);
            const y = this.point1.y + ua * (this.point2.y - this.point1.y);
            return [new Point(x, y)];
        }
        return null;
    }
    static LineRect(shape) {
        const points = [];
        const topIntersection = this.getIntersection(new Line(shape.x, shape.y, shape.x + shape.width, shape.y));
        if (topIntersection != null && topIntersection instanceof Array) {
            points.push(...topIntersection);
        }
        const rightIntersection = this.getIntersection(new Line(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.height));
        if (rightIntersection != null && rightIntersection instanceof Array) {
            points.push(...rightIntersection);
        }
        const bottomIntersection = this.getIntersection(new Line(shape.x, shape.y + shape.height, shape.x + shape.width, shape.y + shape.height));
        if (bottomIntersection != null && bottomIntersection instanceof Array) {
            points.push(...bottomIntersection);
        }
        const leftIntersection = this.getIntersection(new Line(shape.x, shape.y, shape.x, shape.y + shape.height));
        if (leftIntersection != null && leftIntersection instanceof Array) {
            points.push(...leftIntersection);
        }
        if (points.length > 0)
            return points;
        return null;
    }
    static LineCircle(shape) {
        let minX = Math.min(this.x1, this.x2);
        let maxX = Math.max(this.x1, this.x2);
        let minY = Math.min(this.y1, this.y2);
        let maxY = Math.max(this.y1, this.y2);
        if (shape.x + (shape.radius / 2) < minX || shape.x - (shape.radius / 2) > maxX || shape.y + (shape.radius / 2) < minY || shape.y - (shape.radius / 2) > maxY) {
            return null;
        }
        let dx = this.x2 - this.x1;
        let dy = this.y2 - this.y1;
        let a = dx * dx + dy * dy;
        let b = 2 * (dx * (this.x1 - shape.x) + dy * (this.y1 - shape.y));
        let c = shape.x * shape.x + shape.y * shape.y + this.x1 * this.x1 + this.y1 * this.y1 - 2 * (shape.x * this.x1 + shape.y * this.y1) - (shape.radius / 2) * (shape.radius / 2);
        let discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return null;
        }
        let t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let intersections = [];
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
    static LineTriangle(shape) {
        const points = [];
        const topIntersection = this.getIntersection(new Line(shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y));
        if (topIntersection != null && topIntersection instanceof Array) {
            points.push(...topIntersection);
        }
        const rightIntersection = this.getIntersection(new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y));
        if (rightIntersection != null && rightIntersection instanceof Array) {
            points.push(...rightIntersection);
        }
        const bottomIntersection = this.getIntersection(new Line(shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y));
        if (bottomIntersection != null && bottomIntersection instanceof Array) {
            points.push(...bottomIntersection);
        }
        if (points.length > 0)
            return points;
        return null;
    }
    static RectRect(shape) {
        const top = shape.getIntersection(new Line(this.x, this.y, this.x + this.width, this.y));
        const bottom = shape.getIntersection(new Line(this.x, this.y + this.height, this.x + this.width, this.y + this.height));
        const left = shape.getIntersection(new Line(this.x, this.y, this.x, this.y + this.height));
        const right = shape.getIntersection(new Line(this.x + this.width, this.y, this.x + this.width, this.y + this.height));
        const points = [];
        if (top != null && top instanceof Array)
            points.push(...top);
        if (left != null && left instanceof Array)
            points.push(...left);
        if (right != null && right instanceof Array)
            points.push(...right);
        if (bottom != null && bottom instanceof Array)
            points.push(...bottom);
        if (points.length > 0)
            return points;
        return null;
    }
    static RectCircle(shape) {
        const top = shape.getIntersection(new Line(this.x, this.y, this.x + this.width, this.y));
        const bottom = shape.getIntersection(new Line(this.x, this.y + this.height, this.x + this.width, this.y + this.height));
        const left = shape.getIntersection(new Line(this.x, this.y, this.x, this.y + this.height));
        const right = shape.getIntersection(new Line(this.x + this.width, this.y, this.x + this.width, this.y + this.height));
        const points = [];
        if (top != null && top instanceof Array)
            points.push(...top);
        if (left != null && left instanceof Array)
            points.push(...left);
        if (right != null && right instanceof Array)
            points.push(...right);
        if (bottom != null && bottom instanceof Array)
            points.push(...bottom);
        if (points.length > 0)
            return points;
        return null;
    }
    static RectTriangle(shape) {
        const top = shape.getIntersection(new Line(this.x, this.y, this.x + this.width, this.y));
        const bottom = shape.getIntersection(new Line(this.x, this.y + this.height, this.x + this.width, this.y + this.height));
        const left = shape.getIntersection(new Line(this.x, this.y, this.x, this.y + this.height));
        const right = shape.getIntersection(new Line(this.x + this.width, this.y, this.x + this.width, this.y + this.height));
        const points = [];
        if (top != null && top instanceof Array)
            points.push(...top);
        if (left != null && left instanceof Array)
            points.push(...left);
        if (right != null && right instanceof Array)
            points.push(...right);
        if (bottom != null && bottom instanceof Array)
            points.push(...bottom);
        if (points.length > 0)
            return points;
        return null;
    }
    static CircleCircle(shape) {
        let d = Math.sqrt(Math.pow((shape.x - this.x), 2) + Math.pow((shape.y - this.y), 2));
        if (d > (this.radius / 2) + (shape.radius / 2) || d < Math.abs((this.radius / 2) - (shape.radius / 2))) {
            return null;
        }
        let a = (Math.pow((this.radius / 2), 2) - Math.pow((shape.radius / 2), 2) + Math.pow(d, 2)) / (2 * d);
        let x3 = this.x + a * (shape.x - this.x) / d;
        let y3 = this.y + a * (shape.y - this.y) / d;
        if (d == (this.radius / 2) + (this.radius / 2) || d == Math.abs((this.radius / 2) - (this.radius / 2))) {
            return null; //[new Point(x3, y3, true)];
        }
        else {
            let h = Math.sqrt(Math.pow((this.radius / 2), 2) - Math.pow(a, 2));
            let x4 = x3 + h * (shape.y - this.y) / d;
            let y4 = y3 - h * (shape.x - this.x) / d;
            let x5 = x3 - h * (shape.y - this.y) / d;
            let y5 = y3 + h * (shape.x - this.x) / d;
            return [new Point(x4, y4), new Point(x5, y5)];
        }
    }
    static CircleTriangle(shape) {
        const line1 = this.getIntersection(new Line(shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y));
        const line2 = this.getIntersection(new Line(shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y));
        const line3 = this.getIntersection(new Line(shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y));
        const points = [];
        if (line1 != null && line1 instanceof Array)
            points.push(...line1);
        if (line2 != null && line2 instanceof Array)
            points.push(...line2);
        if (line3 != null && line3 instanceof Array)
            points.push(...line3);
        if (points.length > 0)
            return points;
        return null;
    }
    static TriangleTriangle(shape) {
        const line1 = shape.getIntersection(new Line(this.p1.x, this.p1.y, this.p2.x, this.p2.y));
        const line2 = shape.getIntersection(new Line(this.p2.x, this.p2.y, this.p3.x, this.p3.y));
        const line3 = shape.getIntersection(new Line(this.p3.x, this.p3.y, this.p1.x, this.p1.y));
        const points = [];
        if (line1 != null && line1 instanceof Array)
            points.push(...line1);
        if (line2 != null && line2 instanceof Array)
            points.push(...line2);
        if (line3 != null && line3 instanceof Array)
            points.push(...line3);
        if (points.length > 0)
            return points;
        return null;
    }
}

class Point {
    set x(x) {
        this._x = x;
        Shapes.collision(this);
    }
    get x() { return this._x; }
    set y(y) {
        this._y = y;
        Shapes.collision(this);
    }
    get y() { return this._y; }
    isCollideWith(shape) {
        return this.collisionWith.get(shape) ? true : false;
    }
    getIntersection(shape) {
        if (shape instanceof Line)
            return Intersection.PointLine.bind(this, shape)();
        if (shape instanceof Point)
            return Intersection.PointPoint.bind(this, shape)();
        if (shape instanceof Rect)
            return Intersection.PointRect.bind(this, shape)();
        if (shape instanceof Circle)
            return Intersection.PointCircle.bind(this, shape)();
        if (shape instanceof Triangle)
            return Intersection.PointTriangle.bind(this, shape)();
        return null;
    }
    /**
     * Point Constructor
     * @param {number} x - x-coordinate of the object Point
     * @param {number} y - y-coordinate of the object Point
     *
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this.onTrigger = true;
        this.collisionWith = new Map();
        this.onCollisionEnter = null;
        this.onCollisionExit = null;
    }
}

const addShape = Shapes.add;
const removeShape = Shapes.remove;

module.exports = { Circle, Line, Point, Rect, Triangle, addShape, removeShape };
