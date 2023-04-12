
import collider2D from "../core";

collider2D.prototype.square = function( x, y, width ){

    let square = {
        x:x,
        y:y,

        width:width,

        get x(){ return x;},
        set x( X ){ x = X; },

        get y(){ return y; },
        set y( Y ){ y = Y; },

        get width(){ return width; },
        set width( Width ){ width = Width; },

        _type :collider2D.shape.square,

        get _type(){ return _type;},
        set _type(type){ return false;}
    }

    collider2D.SHAPES.push(square);
    return square;
}

export default collider2D.prototype.square;