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
        // Shapes.collision_all();
    }

    static remove(element:Point|Line|Rect|Circle|Triangle):void{
        Shapes.SHAPES.filter((shape)=>element != shape);
    }

    static collision(element:Point|Line|Rect|Circle|Triangle){
        //todo: change enter,curr_collision,exit
        let Events:TEvent[] = [];
        Shapes.SHAPES.forEach((shape)=>{
            if(shape == element || !shape.onTrigger) return;
            
            let prevCollision = element.collisionWith.get(shape);
            let points = shape.isCollideWith(element);
            if(points == null && prevCollision == true){
                //todo: onCollisionExit;
                return;
            }else if(points != null && prevCollision == false){
                Events.push({shape:shape,points});
                element.collisionWith.set(shape,true);
            }
        });

        if(Events.length > 0 && element.onCollisionEnter != null)
        element.onCollisionEnter(Events);
    }

    static collision_all(){
        Shapes.SHAPES.forEach((shape) => {
            Shapes.collision(shape);
        });
    }

}
