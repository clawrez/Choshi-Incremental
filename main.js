$(document).ready(function(){

    var menu;

    function format(amount) {
        let power = Math.floor(Math.log10(amount));
        let mantissa = amount / Math.pow(10, power);
        if (power < 6) return amount.toFixed(2);
        return mantissa.toFixed(2) + "e" + power;
    }


                    

    setInterval(function(){ //auto clicker
        game.points += game.idlePoints;
        changeInventory();
        changeMarket();
    }, 1000);
    


    function deathPrestige(){ //death (prestige class 1)
        game.death.deathAmount++;
        game.death.deathBase = Math.pow(2, game.death.deathAmount);
        game.death.deathBoost = Math.pow(game.death.deathBase, game.death.deathExponent);
        game.points = 0;
        game.pointsPerClick = 1 * game.death.deathBoost;
        game.idlePoints = 0;
        game.death.deathCriteria *= 2;
    }



    $("#autoAdd").click(function(){
        if(game.points < game.idlePointsPrice){
            return
        }else{
            game.points -= game.idlePointsPrice;
            game.idlePoints += 2.5*game.death.deathBoost;
            game.idlePointsPrice *= 1.333;
            changeInventory();
            changeMarket();}
    });

    $("#incAdd").click(function(){
        if(game.points < game.pointsPerClickPrice){
            return
        }else{
            game.points -= game.pointsPerClickPrice;
            game.pointsPerClick += 1*game.death.deathBoost;
            game.pointsPerClickPrice *= 1.25;
            changeInventory();
            changeMarket();
        }
    });

    $("#die").click(function(){
        if (game.idlePoints >= game.death.deathCriteria && game.pointsPerClick >= game.death.deathCriteria){
            deathPrestige();
        }else{
            return
        }
    });

    $("#addToPoints").click(function(){
        game.points += game.pointsPerClick;
        changeInventory();
        changeMarket();
    });

    $("#gotoShop").click(function(){
        menu = switchMenu("shop");
    });

    $("#return").click(function(){
        menu = switchMenu("main");
    });

    function changeInventory(){
        $("#pointsValue").html(format(game.points));

        if(game.points == 1){
            $("#pointsPlural").html("point");
        }else{
            $("#pointsPlural").html("points");
        }

        $("#idleValue").html(format(game.idlePoints));

        if(game.idlePoints == 1){
            $("#idlePlural").html("point");
        }else{
            $("#idlePlural").html("points");
        }

        $("#ppcValue").html(format(game.pointsPerClick));

        if(game.pointsPerClick == 1){
            $("#ppcPlural").html("point");
        }else{
            $("#ppcPlural").html("points");
        }

        $("#deathAmountValue").html(game.death.deathAmount);
        $("#deathBoostValue").html(format(game.death.deathBoost));

        if(game.death.deathAmount == 1){
            $("#deathPlural").html("death is");
        }else{
            $("#deathPlural").html("deaths are");
        }
    }

    function changeMarket(){
        $("#incAddPrc").html(format(game.pointsPerClickPrice));
        $("#autoAddPrc").html(format(game.idlePointsPrice));
        $("#deathCrit").html(game.death.deathCriteria);
    }

    function switchMenu(menu){
        $(".menus").children().css("display", "none");
        $("." + menu).css("display", "block");
        return menu;
    }
    
    var saveItemName = "choshi";

    function save(){
        localStorage.setItem(saveItemName, btoa(JSON.stringify(game)));
        console.log("Saved!" + JSON.stringify(game) + "Saved!");
    }

    $("#saveBtn").click(function(){
        save();
    });

    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.which == 83) { // ctrl + s
            event.preventDefault();
               save();
        }
    }, false);
});

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) { // ctrl + s
        event.preventDefault();
           save();
    }
}, false);

var saveItemName = "choshi";

function save(){
    localStorage.setItem(saveItemName, btoa(JSON.stringify(game)));
    console.log("Saved!" + JSON.stringify(game) + "Saved!");
}

function load() {
    var loadedSave = localStorage.getItem(saveItemName);
    if (loadedSave===null) return;
    game = JSON.parse(atob(loadedSave));
    changeInventory();
    changeMarket();
}

function changeInventory(){
    $("#pointsValue").html(format(game.points));

    if(game.points == 1){
        $("#pointsPlural").html("point");
    }else{
        $("#pointsPlural").html("points");
    }

    $("#idleValue").html(format(game.idlePoints));

    if(game.idlePoints == 1){
        $("#idlePlural").html("point");
    }else{
        $("#idlePlural").html("points");
    }

    $("#ppcValue").html(format(game.pointsPerClick));

    if(game.pointsPerClick == 1){
        $("#ppcPlural").html("point");
    }else{
        $("#ppcPlural").html("points");
    }

    $("#deathAmountValue").html(game.death.deathAmount);
    $("#deathBoostValue").html(format(game.death.deathBoost));

    if(game.death.deathAmount == 1){
        $("#deathPlural").html("death is");
    }else{
        $("#deathPlural").html("deaths are");
    }
}

function changeMarket(){
    $("#incAddPrc").html(format(game.pointsPerClickPrice));
    $("#autoAddPrc").html(format(game.idlePointsPrice));
    $("#deathCrit").html(game.death.deathCriteria);
}

$("#saveBtn").click(function(){
    save();
});

window.onload=function () {
    load();
}

setInterval(function(){ // auto save
    save();
}, 30000);

var game ={
    points: 0,

    pointsPerClick: 1, // previously pointPlus
    idlePoints: 0, // previously autoPointPlus
    pointsPerClickPrice: 100, // previously increasePointPrice
    idlePointsPrice: 500, // previously autoPointPlusPrice
    death:{
        deathAmount: 0,
        deathBase: 1,
        deathExponent: 1.2,
        deathBoost: 1,
        deathCriteria: 10
    }
}
