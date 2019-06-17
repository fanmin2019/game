var Block = function (position) {
    log("position", position)
    //position[x,y]
    var p = position
    //imageFromPathはどこから来たか、わからなくなる
    var image = imageFromPath('block.PNG')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        width: 50, // comma must
        height: 20, // comma must
        alive: true,
    }

    o.kill = function() {
        o.alive = false
    }

    o.collide = function (ball) {
       return o.alive && (rectInterSects(o, ball) || rectInterSects(ball, o))
        // if(rectInterSects(o, ball) || rectInterSects(ball, o)) {
        //  // if(rectInterSects(o, ball)) {
        //     return true
        // } else {
        //     return false
        // }
    }

            return o
        }