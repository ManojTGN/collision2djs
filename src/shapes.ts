import { Circle } from "./shape/circle";
import { Line } from "./shape/line";
import { Point } from "./shape/point";
import { Rect } from "./shape/rect";
import { Triangle } from "./shape/triangle";

export interface TEvent {
    shape:(Point|Line|Rect|Circle|Triangle),
    points:Point[]
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
        if(!element.onTrigger) return;
        
        let Events:TEvent[] = [];
        Shapes.SHAPES.forEach((shape)=>{
            if(shape == element || !shape.onTrigger) return;
            
            let points = shape.isCollideWith(element);
            if(points != null){
                Events.push({shape:shape,points});
            }
        });

        if(Events.length > 0)
        element.onCollision(Events);
    }

}
