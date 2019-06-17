var Paddle = function(){
            var image = imageFromPath('panel.PNG')
            var o = {
                image: image,
                x: 100,
                y: 250,
                speed: 5, // comma must
            }

            //同じロジックをまとめる
            o.move = function (x){
                if(x < 0) {
                    x = 0
                } else if(o.x > 400 - o.image.width){
                    x = 400 - o.image.width
                }
                o.x = x
            }

            o.moveRight = function() {
                // if(o.x > 400 - o.image.width) {
                //     o.x = 400 - o.image.width
                // } else {
                //     o.x += o.speed
                // }
                o.move(o.x + o.speed)
            }

            o.moveLeft = function() {
                // if(o.x < 0) {
                //     o.x = 0
                // } else {
                //     o.x -= o.speed
                // }
                o.move(o.x - o.speed)
            }

            o.collide = function (ball) {
                //paddleの上端より低い
                if(ball.y + ball.image.height > o.y) {
                    //paddleの左端より右、かつ、paddleの右端より左
                    if(ball.x > o.x && ball.x < o.x + o.image.width ){
                        return true
                    } else {
                        return false
                    }
                }else {
                    return false
                }
            }

            return o
        }