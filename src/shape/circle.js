
import collider2D from "../core";

collider2D.prototype.circle = function( x, y, radius ){

    return {
        x:x,
        y:y,
        radius:radius,

        _type :collider2D.shape.circle,

        get _type(){ return _type;},
        set _type(type){ return false;}
    }

}

export default collider2D.prototype.circle;