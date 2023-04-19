import { Circle } from "./shape/circle";
import { Line } from "./shape/line";
import { Point } from "./shape/point";
import { Rect } from "./shape/rect";
import { Triangle } from "./shape/triangle";

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
    
        let En_Events: Map<(Point|Line|Rect|Circle|Triangle),TEvent[]> = new Map();
        let Ex_Events: Map<(Point|Line|Rect|Circle|Triangle),(Point|Line|Rect|Circle|Triangle)[]> = new Map();
        
        Ex_Events.set(element,[]);
        En_Events.set(element,[]);

        Shapes.SHAPES.forEach((shape)=>{
            if( shape == element ) return;

            let prevCollision = element.collisionWith.get(shape);
            let points = shape.isCollideWith(element);

            if(points == null && prevCollision == true){ // EXIT
                let arr = Ex_Events.get(element);
                if(arr){
                    arr.push(shape);
                    Ex_Events.set(element,arr);
                }
                element.collisionWith.delete(shape);
            }else if(points != null && !prevCollision){ // ENTER
                let arr = En_Events.get(element);
                if(arr){
                    arr.push({shape:shape,points:points});
                    En_Events.set(element,arr);
                }
                element.collisionWith.set(shape,true);
            }
            
        });


        En_Events.forEach((value,key)=>{
            if(value.length > 0 && key.onCollisionEnter != null){
                key.onCollisionEnter(value);
            }
        });

        Ex_Events.forEach((value,key)=>{
            if(value.length > 0 && key.onCollisionExit != null){
                key.onCollisionExit(value);
            }
        });
    }

    static collision_all(){
        Shapes.SHAPES.forEach((shape) => {
            Shapes.collision(shape);
        });
    }

}
