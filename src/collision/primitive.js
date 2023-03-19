
import collider2D from "../core";

collider2D.prototype.collision = function( obj, callback ){
    callback();
    return false;
};

export default collider2D.prototype.collision;