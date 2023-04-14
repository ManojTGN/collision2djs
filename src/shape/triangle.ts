
export type TTriangle = new (x1:number,y1:number,x2:number,y2:number,x3:number,y3:number) => void;

export class Triangle{
    x1:number;
    y1:number;
    x2:number;
    y2:number;
    x3:number;
    y3:number;

    constructor(x1:number,y1:number,x2:number,y2:number,x3:number,y3:number){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

}
