class MinScene {
    constructor(game) {
        this.game = game
    }
    
    draw() {
        
    }

    update() {

    }
}

class SceneTitle extends MinScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = Scene(game)
            //時にはGAME、時にはG、ややこしい
            game.replaceScene(s)
        })
    }

    //override
    draw() {
        //fill text
        this.game.context.fillText("Press k to Game Start", 100, 100);

    }

}