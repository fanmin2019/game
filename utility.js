var log = console.log.bind("console")
var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}
var rectInterSects = function (a, b) {
    if(!paused) {
        log("a.y", a.y, "b.y", b.y, "b.y + b.image.height", b.y + b.image.height, a.y > b.y && b.y + b.image.height > a.y)
        log("a.x", a.x, "b.x", b.x, "b.x + b.image.height", b.x + b.image.width, a.x < b.x && a.x > b.x + b.image.width)
    }

    if(b.y <= a.y && a.y <= b.y + b.image.height) {
            //paddleの左端より右、かつ、paddleの右端より左
            if(b.x <=  a.x && a.x <= b.x + b.image.width ){
                return true
            }
    }
    return false
}
