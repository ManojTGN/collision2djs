
import collider2D from "../core";

collider2D.prototype.triangle = function( p1, p2, p3 ){

    let triangle = {
        p1:p1,
        p2:p2,
        p3:p3,

        _type :collider2D.shape.triangle,

        get _type(){ return _type;},
        set _type(type){ return false;}
    }

    collider2D.SHAPES.push(triangle);
    return triangle;

}

export default collider2D.prototype.triangle;