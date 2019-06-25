var SceneEditor = function (game) {
    var s = {
        game: game,
    }


    s.draw = function () {
        //fill text
        game.context.fillText("Level Editor", 100, 200);

    }

    s.update = function () {
        // game.replaceScene()

    }

    return s
}