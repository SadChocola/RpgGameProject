//--------------Elements
let monster = document.querySelector(".monster")
let shop = document.querySelector(".shop")
let uis = document.querySelector(".uis")
let btn = document.getElementById("start_btn")
let img = document.getElementById("img")
let start = document.getElementById("start")
let locel = document.querySelector(".location")
let locimg = document.getElementById("loc_img")
let locp = document.getElementById("loc_p")
let fightbtn = document.getElementById("loc_fight_btn")
let shopbtn = document.getElementById("loc_shop_btn")
let invel = document.querySelector(".inventory")
let choose = document.querySelector(".choose")
//--------------Variables
//--Player Variables
let loaded = false

//--Shorten variables
let lvl = "level"
let att = "attack"
let xp = "xp"
let hp = "hp"
let crit = "critchance"
let coins = "coins"
let inv = "inventory"
let loc = "loc"

//--Main variables
let defaultData = {
    level: 0,
    hp: 10,
    attack: 3,
    critchance: 1,
    coins: 10,
    xp: 0,
    inventory: {
        items: {

        },
        armors: {

        },
        weapons: {

        }
    },
    loc: {
        name: "Forest",
        image: "https://www.wallpaperflare.com/static/538/780/45/forest-in-game-firewatch-green-wallpaper.jpg",
        color: "#000000",
        locnum: 1
    }
}
let game = {
    functions: { //--Functions
        add: function(key, number) { //--Add function
            if (number === number) {
                game[key] += number
                game.functions?.sdata()

            }
        },
        sub: function(key, number) { //--Substract function
            if (number === number) {
                game[key] -= number
                game.functions?.sdata()
            }
        },
        mul: function(key, number) { //--Multiply function
            if (number === number) {
                game[key] *= number
                game.functions?.sdata()
            }
        },
        div: function(key, number) { //--Divide function
            if (number === number) {
                game[key] /= number
                game.functions?.sdata()
            }
        },
        addItem: function(key, item) {
            game.inventory[key] = Object.assign(game.inventory[key], item)
        },
        upd: function() { //--Update data function
            for (key in game) {
                if (key != "functions") {
                    game[key] = JSON.parse(localStorage.getItem("GameData"))[key]
                    console.log(JSON.parse(localStorage.getItem("GameData"))[key])
                }
            }
            console.log("updated data")
        },
        sdata: function() {
            if (loaded != true) {
                if (localStorage.getItem("GameData") === null) {
                    localStorage.setItem("GameData", JSON.stringify(game))
                    sdata()
                    console.log("data was null, setted data")
                } else if (localStorage.getItem("GameData") !== null) {
                    game.functions?.upd()
                    localStorage.setItem("GameData", JSON.stringify(game))
                    loaded = true
                    console.log("updated & saved data")
                }
            } else if (loaded == true) {
                localStorage.setItem("GameData", JSON.stringify(game))
                console.log("saved data")
            }
        },
        rsdata: function() { //--Full data reset function
            for (k in game) {
                if (k != "functions") {
                    game[k] = defaultData[k]
                    console.log("resetted item: "+k+" current value: "+game[k])
                }
            }
            game.functions?.sdata()
        },
        rsvalue: function(key) { //--Reset data value function
            if (key != "functions") {
                game[key] = defaultData[key]
                game.functions?.sdata()
                console.log("resetted item: "+key+" data: "+game[key])
            }
        }
    },
    level: 0,
    hp: 10,
    attack: 3,
    critchance: 1,
    coins: 10,
    xp: 0,
    inventory: {
        items: {

        },
        armors: {

        },
        weapons: {

        }
    },
    loc: {
        name: "Forest",
        image: "https://www.wallpaperflare.com/static/538/780/45/forest-in-game-firewatch-green-wallpaper.jpg",
        color: "#000000",
        locnum: 1
    }
}

const add = game.functions?.add
const sub = game.functions?.sub
const mul = game.functions?.mul
const div = game.functions?.div
const addItem = game.functions?.addItem
const sdata = game.functions?.sdata
const upd = game.functions?.upd
const rsdata = game.functions?.rsdata
const rsvalue = game.functions?.rsvalue

//--Boss Variables

let bosstypes = {
    1: {
        name: "Slime",
        hp: 30,
        reward: 10,
        xp: 10,
        damage: 0.5,
        image: "",
        locnum: 1,
        lvl: 0,
        type: "Basic",
        weapon: {
            Name: "Stick",
            Damage: 2,
            Chance: 50,
            SellCost: 10,
            Image: ""
        }
    },
    2: {
        name: "Big Slime",
        hp: 50,
        reward: 20,
        xp: 20,
        damage: 1,
        image: "",
        locnum: 1,
        lvl: 5,
        type: "Basic",
        weapon: {
            Name: "Big Stick",
            Damage: 4,
            Chance: 25,
            SellCost: 20,
            Image: ""
        }
    },
}

//--Shop Variables
let weapons = {
    one: {
        Name: "Broken Wooden Sword",
        Damage: 6,
        Cost: 40,
        Req: 10,
        Image: ""
    },
    two: {
        Name: "Wooden Sword",
        Damage: 8,
        Cost: 60,
        Req: 20,
        Image: ""
    }
}
let armors = {
    one: {
        Name: "Leather Armor",
        Protection: 1,
        Cost: 70,
        Req: 40,
        Image: ""
    },
    two: {
        Name: "Leather Armor",
        Protection: 1,
        Cost: 70,
        Req: 40,
        Image: ""
    }
}

//---------------Functions

const changeLocation = function() {
    locimg.style.backgroundImage = "url("+game.loc.image+")"
    locel.style.backgroundColor = game.loc.color
    locp.textContent = locp.textContent.replace("location", game.loc.name+" location. What do you want to do?")
}

const getBosses = function() {
    choose.innerHTML = '<p id="choose_p" align="center">Select a mob to fight:</p>'
    let counter = 0
    for (key in bosstypes) {
        if (game.loc.locnum == bosstypes[key].locnum) {
            console.log("ok")
            choose.innerHTML += '<button class="choose_btn">'+bosstypes[key].name+': level: '+bosstypes[key].lvl+', type: '+bosstypes[key].type+'</button>'
            counter += 1
        } else {
            console.log("idk")
        }
    }
}

const startFight = function(key) {
    console.log(key)
}

btn.addEventListener("click", function () {
    start.parentNode.removeChild(start)
    locel.classList.add("location_active")
    locel.classList.remove("location")
    changeLocation()
    shopbtn.addEventListener("click", function() {
        locel.classList.remove("location_active")
        locel.classList.add("location")
        shop.classList.add("shop_active")
        shop.classList.remove("shop")
    })
    fightbtn.addEventListener("click", function() {
        locel.classList.remove("location_active")
        locel.classList.add("location")
        choose.classList.add("choose_active")
        choose.classList.remove("choose")
        getBosses()
    })
})

