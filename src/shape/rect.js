
import collider2D from "../core";

collider2D.prototype.rect = function( x, y, height, width ){

    let rect = {
        x:x,
        y:y,

        height:height,
        width:width,

        get x(){ return x;},
        set x( X ){ x = X;collider2D.prototype.collision(this,()=>{console.log("COLLISION CHECKED")}) },

        get y(){ return y; },
        set y( Y ){ y = Y; },

        get height(){ return height; },
        set height( Height ){ height = Height; },

        get width(){ return width; },
        set width( Width ){ width = Width; }
    }

    collider2D.SHAPES.push(rect);
    return rect;

}

export default collider2D.prototype.rect;