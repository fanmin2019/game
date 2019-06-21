var loadLevel = function (game, n) {
    // log("loadLevel start")
    var blocks = []
    var nowLevel = level[n-1]
    log("nowLevel", nowLevel)
    for (var i = 0; i < nowLevel.length ; i++) {
        var b = Block(game, nowLevel[i])
        blocks.push(b)
    }
    log("loadLevel end", blocks)
    return blocks
}

var enableDebugMode = function (game, enabled) {
    if(!enabled) {
        return
    }
    var range = document.getElementById("id-input-speed")
    range.addEventListener("input", function (event) {
        // log(event.target.value, event)
        window.fps = Number(event.target.value)
    })
    window.addEventListener('keyup', function (event) {
        var k = event.key
        log("key is ", k)
        if(k == 'p') {
            //一時停止
            paused = !paused
        }else if ('1234567'.includes(k)) {
            //デバッグのため
            blocks = loadLevel(game, Number(k))
        }
    })
    // var c = document.getElementById("id-canvas")
    // c.addEventListener('click', function () {
    //     var rect = event.target.getBoundingClientRect();
    //     var xx = event.clientX - rect.left;
    //     var yy = event.clientY - rect.top;
    //     log("x", xx, "y", yy)
    // })
    game.canvas.addEventListener('mousedown', function (event) {
        // log(evt)
        var x = event.offsetX
        var y = event.offsetY
        log("mousedown", x, y)
    })
    game.canvas.addEventListener('mousemove', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        log("mousedown", x, y)
    })

    game.canvas.addEventListener('mouseup', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        log("mousedown", x, y)
    })

}
// プログラムの入り口は常に一つ
// プログラムの基本単位はファンクション

var __main = function() {
    log("main start")
    // オブジェクトのインスタンスを作る
    var images = {
        'block': 'block.png',
        'paddle': 'panel.png',
        'ball': 'ball.png',
    }


    //オブジェクト化されていないため、いろんなところにgameが必要。。。
    var game =  Min_game(30, images, function (game) {
        var paddle = Paddle(game)
        var ball =  Ball(game)
        var score = 0
        //結局グローバル変数にしないといけない
        //同じ図なので、何回もロードする必要がない
        blocks = loadLevel(game,1)

        paused = false
        //function化
        game.registerAction('d', function(){
            paddle.moveRight()
        })

        game.registerAction('a', function(){
            paddle.moveLeft()
        })

        game.registerAction('f', function(){
            ball.fire()
        })

        // game.registerAction('p', function(){
        //      paused = !paused
        //  })
        //gameがロードされたタイミングでデバッグモードを呼び出す
        enableDebugMode(game,true)
        game.update = function() {
            if(paused) {
                return
            }
            ball.move()

            //if collide
            if(paddle.collide(ball)){
                //ballの何かのメソッドを呼ぶべき
                // ball.speedY *= -1
                ball.rebound()
            }
            for (var i=0; i < blocks.length; i++) {
                var block = blocks[i]
                if(block.collide(ball)){
                    //ballの何かのメソッドを呼ぶべき
                    block.kill()
                    score += 100
                    ball.rebound()
                }
            }

        }

        //game.drawは実際に常にrun loopの中で呼ばれているが、
        // このメインの中だけだと、わかりにくい
        //定義するのがおかしい、理想形:game.draw(padle)
        //paddleを渡すために（setInterval)、ここで書かざるを得ない
        game.draw = function() {
            //fill rect color
            game.context.fillStyle = "#443"
            game.context.fillRect(0, 0, 400, 300);

            //理想形:game.draw(paddle)
            game.drawImage(paddle)
            game.drawImage(ball)

            for (var i=0; i < blocks.length; i++) {
                var block = blocks[i]
                if(block.alive) {
                    game.drawImage(block)
                }
            }

            //fill text
            game.context.fillText("Score:" + score, 10, 290);
        }
    })
}

__main()