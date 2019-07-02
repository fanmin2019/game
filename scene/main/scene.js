//Sceneの中で、あるいはこのゲームのソースコードの中で、
// 重複しているコードが多すぎる。
// それを解決するためにはオブジェクト志向を使う
var Scene = function (game) {
    var s = {
        game: game,
    }

    //initialize
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0
    blocks = loadLevel(game, 1)


    paused = false
    //function化
    game.registerAction('d', function () {
        paddle.moveRight()
    })

    game.registerAction('a', function () {
        paddle.moveLeft()
    })

    game.registerAction('f', function () {
        ball.fire()
    })


    s.draw = function () {
        //fill rect color
        game.context.fillStyle = "#443"
        game.context.fillStyle = "#443"
        game.context.fillRect(0, 0, 400, 300);

        //理想形:game.draw(paddle)
        game.drawImage(paddle)
        game.drawImage(ball)

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }

        //fill text
        game.context.fillStyle = "white";
        game.context.fillText("Score:" + score, 10, 20);

    }

    s.update = function () {
        if (paused) {
            return
        }
        log("ball.y", ball.y, "paddle.y", paddle.y)
        if (ball.y > paddle.y) {
            var end = SceneEnd.new(game)
            //時にはGAME、時にはG、ややこしい
            game.replaceScene(end)
            return
        }
        ball.move()
        //if collide
        if (paddle.collide(ball)) {
            //ballの何かのメソッドを呼ぶべき
            // ball.speedY *= -1
            ball.rebound()
        }
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                //ballの何かのメソッドを呼ぶべき
                block.kill()
                score += 100
                ball.rebound()
            }
        }

    }

    var enableDrag;
    game.canvas.addEventListener('mousedown', function (event) {
        // log(evt)
        var x = event.offsetX
        var y = event.offsetY
        // log("mousedown", x, y)
        //is ball clicked?
        if (ball.hasPoint(x, y)) {
            enableDrag = true
        }

    })
    game.canvas.addEventListener('mousemove', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        // log("mousedown", x, y)
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }

    })

    game.canvas.addEventListener('mouseup', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        log("mousedown", x, y)
        enableDrag = false
    })


    return s
}