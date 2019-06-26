class MinScene {
    constructor(game) {
        this.game = game
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    draw() {
        alert("must be override!")
    }

    update() {

    }
}