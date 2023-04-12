
import collider2D from "../core";

collider2D.prototype.rect = function( x, y, height, width ){

    let rect = {
        x:x,
        y:y,

        height:height,
        width:width,
        
        trigger: true,
        onCollisionEnter:(event)=>{},
        onCollisionExit:(event)=>{},

        _index:0,
        _isColliding:false,
        _type :collider2D.shape.rect,

        get x(){ return x;},
        set x( X ){ 
            x = X;

            if(this.trigger)
            collider2D.prototype._collision( this );
        },

        get y(){ return y; },
        set y( Y ){ 
            y = Y;

            if(this.trigger)
            collider2D.prototype._collision( this );
        },

        get height(){ return height; },
        set height( Height ){ 
            height = Height;

            if(this.trigger)
            collider2D.prototype._collision( this );
        },

        get width(){ return width; },
        set width( Width ){ 
            width = Width;

            if(this.trigger)
            collider2D.prototype._collision( this );
        },

        get _type(){ console.log("printed:",this._type);return _type; },
        set _type(type){ return false; }
    }

    collider2D.prototype._collision(rect);
    collider2D.SHAPES.push(rect);
    return rect;

}

export default collider2D.prototype.rect;