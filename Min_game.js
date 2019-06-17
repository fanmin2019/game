var Min_game = function(fps){
            var g = {
                actions: {},
                keydowns:{},
            }
            //違和感：定義とlogicが混在
            var canvas = document.querySelector("#id-canvas")
            var context = canvas.getContext("2d")
            g.canvas = canvas
            g.context = context
            g.drawImage = function(minImage){
                 // draw
                 g.context.drawImage(minImage.image, minImage.x, minImage.y)
            }
            //events
            window.addEventListener('keydown', function(){
                g.keydowns[event.key] = true
            })

            window.addEventListener('keyup', function(){
                g.keydowns[event.key] = false
            })

            g.registerAction = function(key, callback) {
                g.actions[key] = callback
            }

            //timer
            //intervalおかしい
            setInterval(function () {
                var actions = Object.keys(g.actions)
                for (var i = 0; i < actions.length; i++) {
                    var key = actions[i]
                    if(g.keydowns[key]) {
                        //if key is down, callback
                        g.actions[key]()
                    }
                }
                //clear
                context.clearRect(0, 0, canvas.width, canvas.height);
                //update
                g.update()
                //draw
                g.draw()
            }, 1000/fps);

            return g
        }