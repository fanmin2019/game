var Min_game = function(fps, images, runCallback){
    //images is dictionary, image name : image path
    var g = {
        actions: {},
        keydowns:{},
        images:{},
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

    window.fps = 30
    var runloop = function() {
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
        //timer
        //intervalおかしい
        setTimeout(function () {
            runloop()
        }, 1000/window.fps);
    }

    var counts = []
    var keyList = Object.keys(images)
    log("keyList", keyList)
    for (var i = 0; i < keyList.length; i++) {
        //varを使うと、onloadのcallback関数内は常に一つ目のimgになってしまう
        let img = new Image()
        let name = keyList[i]
        img.src = images[name]
        log("img.src", img.src, img)
        img.onload = function () {
            g.images[name] = img
            counts.push(img)
            if(counts.length == keyList.length){
                //game start
                runCallback(g)
                g.run()
            }
        }

    }

    g.imageByName = function (name) {
        var o = g.images[name]
        log("g.images[name]", g.images[name], "name", name, "g.images", g.images)
        //今後長さと高さを取りやすくするため
        var image = {
            w: o.width,
            h: o.height,
            image: o,
        }
        return image
    }



    g.run = function() {
        //timer
        //intervalおかしい
        setTimeout(function () {
            runloop()
        }, 1000/window.fps);
    }

    return g
}