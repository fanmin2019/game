// var SceneTitle = function (game) {
//     var s = {
//         game: game,
//     }
//
//     game.registerAction('k', function(){
//         var s = Scene(game)
//         //時にはGAME、時にはG、ややこしい
//         game.replaceScene(s)
//     })
//
//
//     game.registerAction('e', function(){
//         var se = SceneEditor(game)
//         //時にはGAME、時にはG、ややこしい
//         game.replaceScene(se)
//     })
//
//
//     s.draw = function () {
//         //fill text
//         game.context.fillText("Press k to Game Start", 100, 100);
//
//     }
//
//     s.update = function () {
//         // game.replaceScene()
//
//     }
//
//     return s
// }
log("ooo")

class SceneTitle extends MinScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function () {
            var s = Scene(game)
            //時にはGAME、時にはG、ややこしい
            game.replaceScene(s)
        })
    }

    // static new(game) {
    //     var i = new this(game)
    //     return i
    // }

    //override
    draw() {
        //fill text
        this.game.context.fillText("Press k to Game Start", 100, 100);

    }

}