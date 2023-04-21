import { Circle } from "../shape/circle";
import { Line } from "../shape/line";
import { Point } from "../shape/point";
import { Rect } from "../shape/rect";
import { Triangle } from "../shape/triangle";
import Collision from "./collision";

export interface TEvent {
    shape:(Point|Line|Rect|Circle|Triangle),
    points:Point[]|boolean
}

export class Shapes{
    static SHAPES:(Point|Line|Rect|Circle|Triangle)[] = [];
    
    static add(element:Point|Line|Rect|Circle|Triangle):void{
        if(!element) return;

        Shapes.SHAPES.push(element);
        Shapes.collision(element);
    }

    static remove(element:Point|Line|Rect|Circle|Triangle):void{
        if(!element) return;
        const index = Shapes.SHAPES.indexOf(element);

        if(index !== -1)
            Shapes.SHAPES.splice(index,1);
    }

    static collision(element:Point|Line|Rect|Circle|Triangle){
        if(Shapes.SHAPES.indexOf(element) == -1) return;

        let onEnterEvent:Map<(Point|Line|Rect|Circle|Triangle),TEvent[]> = new Map();
        let onExitEvent:Map<(Point|Line|Rect|Circle|Triangle),TEvent[]>  = new Map();

        Shapes.SHAPES.forEach( (shape) => {
            if(element == shape) return;

            let events:TEvent[]|undefined;
            
            let prevState = shape.collisionWith.get(element);
            let collision:boolean = Collision.collide(shape,element);
            
            let intersections:Point[]|Point|null = shape.getIntersection(element);
            if(!intersections) intersections = new Array();

            if(!prevState && collision){

                if(intersections instanceof Point)
                    intersections = [intersections];

                element.collisionWith.set(shape,true);
                if(!onEnterEvent.get(element) && element.onTrigger)
                    onEnterEvent.set(element,new Array());
                if(element.onTrigger){
                    events = onEnterEvent.get(element);
                    if(events){
                        events.push({shape,points:intersections});
                        onEnterEvent.set(element,events);
                        events = new Array();
                    }
                }
                
                shape.collisionWith.set(element,true);
                if(!onEnterEvent.get(shape) && shape.onTrigger)
                    onEnterEvent.set(shape,new Array());
                if(element.onTrigger){
                    events = onEnterEvent.get(shape);
                    if(events){
                        events.push({shape:element,points:intersections});
                        onEnterEvent.set(element,events);
                        events = new Array();
                    }
                }

                return;
            }

            if(prevState && !collision){

                if(!onExitEvent.get(element) && element.onTrigger)
                    onExitEvent.set(element,new Array());
                if(element.onTrigger){
                    events = onExitEvent.get(element);
                    if(events){
                        events.push({shape,points:new Array()});
                        onExitEvent.set(element,events);
                        events = new Array();
                    }
                }

                if(!onExitEvent.get(shape) && shape.onTrigger)
                    onExitEvent.set(shape,new Array());
                if(shape.onTrigger){
                    events = onExitEvent.get(shape);
                    if(events){
                        events.push({shape:element,points:new Array()});
                        onExitEvent.set(shape,events);
                        events = new Array();
                    }
                }

                shape.collisionWith.delete(element);
                element.collisionWith.delete(shape);
                return;
            }

        });

        onEnterEvent.forEach((event,shape) => {
            if(event && event.length > 0 && shape.onCollisionEnter)
                shape.onCollisionEnter(event);
        });

        onExitEvent.forEach((event,shape) => {
            if(event && event.length > 0 && shape.onCollisionExit)
                shape.onCollisionExit(event);
        })

    }

    static collision_all(){
        Shapes.SHAPES.forEach((shape) => {
            Shapes.collision(shape);
        });
    }

}
