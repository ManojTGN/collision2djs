
import collider2D from "../core";

collider2D.prototype.line = function( p1, p2 ){

    return {
        p1:p1,
        p2:p2,
        _type :collider2D.shape.line,

        get _type(){ return _type;},
        set _type(type){ return false;}
    }

}

export default collider2D.prototype.line;