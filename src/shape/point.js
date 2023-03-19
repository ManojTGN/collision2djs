
import collider2D from "../core";

collider2D.prototype.point = function( x, y ){

    let point = {
        x:x,
        y:y,

        get x(){ return x;},
        set x( X ){ x = X; },

        get y(){ return y; },
        set y( Y ){ y = Y; },
    }

    // collider2D.SHAPES.push(point);
    return point;
}

export default collider2D.prototype.point;