import { Circle } from "../shape/circle";
import { Line } from "../shape/line";
import { Point } from "../shape/point";
import { Rect } from "../shape/rect";
import { Triangle } from "../shape/triangle";

export interface TEvent {
    shape:(Point|Line|Rect|Circle|Triangle),
    points:Point[]|boolean
}

export class Shapes{
    static SHAPES:(Point|Line|Rect|Circle|Triangle)[] = [];
    
    static add(element:Point|Line|Rect|Circle|Triangle):void{
        Shapes.SHAPES.push(element);
        Shapes.collision(element);
    }

    static remove(element:Point|Line|Rect|Circle|Triangle):void{
        Shapes.SHAPES.filter((shape)=>element != shape);
    }

    static collision(element:Point|Line|Rect|Circle|Triangle){
        let onEnterEvent:Map<(Point|Line|Rect|Circle|Triangle),TEvent[]> = new Map();
        let onExitEvent:Map<(Point|Line|Rect|Circle|Triangle),TEvent[]>  = new Map();

        Shapes.SHAPES.forEach( (shape) => {
            let events:TEvent[]|undefined;
            let prevState = shape.collisionWith.get(element);
            let intersections:Point[]|Point|null = shape.getIntersection(element);
            
            if(!prevState && intersections){

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

            if(prevState && !intersections){

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