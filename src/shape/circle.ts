
export type TCircle = new (x:number,y:number,radius:number) => void;

export class Circle{
    x:number;
    y:number;
    radius:number;

    constructor(x:number,y:number,radius:number){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

}
