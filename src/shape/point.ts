
export type TPoint = new (x:number,y:number) => void;

export class Point{
    x:number;
    y:number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }

}
