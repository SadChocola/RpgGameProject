window.onload = function() {
    console.log(game)
    game.functions.sdata()
    console.log(game)
}

window.onbeforeunload = function() {
    game.functions.sdata()
}