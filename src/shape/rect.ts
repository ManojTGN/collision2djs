
export type TRect = new (x:number,y:number,width:number,height:number) => void;

export class Rect{
    x:number;
    y:number;
    width:number;
    height:number;

    constructor(x:number, y:number, width:number, height:number = width){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
};