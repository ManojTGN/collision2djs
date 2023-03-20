
import collider2D from "../core";

collider2D.prototype._collision = function( obj ){

    let event = {

        points:[],
        shapes:[],
        
        owner:obj,

        _isColliding:false
    }

    collider2D.SHAPES.forEach(shape => {
        if(shape === obj) return;

        //rect rect collision
        if(
            shape.x < obj.x + obj.width &&
            shape.x + shape.width > obj.x &&
            shape.y < obj.y + obj.height &&
            shape.height + shape.y > obj.y
        ){
            event._isColliding = true;
            event.shapes.push( shape );
            //todo:add colliding points
        }
    });

    if(event._isColliding == true && obj._isColliding != true){
        obj.onCollisionEnter(event);
        obj._isColliding = true;
    }

    if(event._isColliding == false && obj._isColliding != false){
        obj.onCollisionExit(event);
        obj._isColliding = false;
    }

};

export default collider2D.prototype.collision;