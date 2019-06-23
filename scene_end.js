var SceneEnd = function (game) {
    var s = {
        game: game,
    }



    s.draw = function () {
        //fill text
        game.context.fillText("Game Over", 100, 200);

    }

    s.update = function () {
        // game.replaceScene()

    }

    return s
}