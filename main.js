$(document).ready(function(){
    var points = 0;
    var pointPlus = 1;
    var autoPointPlus = 0;
    var increasePointPrice = 100;
    var autoPointPrice = 500;
    var deathAmount = 0;
    var deathBase = 1;
    var deathExponent = 1.2;
    var deathBoost = 1;
    var deathCriteria = 10;
    var menu;

    function format(amount) {
        let power = Math.floor(Math.log10(amount));
        let mantissa = amount / Math.pow(10, power);
        if (power < 6) return amount.toFixed(2);
        return mantissa.toFixed(2) + "e" + power;
    }

    setInterval(function(){
        points += autoPointPlus;
        changeInventory();
        changeMarket();
    }, 1000);

    function deathPrestige(){
        deathAmount++;
        deathBase = Math.pow(2, deathAmount);
        deathBoost = Math.pow(deathBase, deathExponent);
        points = 0;
        pointPlus = 1 * deathBoost;
        autoPointPlus = 0;
        deathCriteria *= 2;
    }

    function deathBooster(amount){
        
    }

    function loadGame() {
        var savedGame = JSON.parse(localStorage.getItem("gameSave"));
        if (typeof savedGame.points !== "undefined") points = savedGame.points;
        if (typeof savedGame.pointPlus !== "undefined") pointPlus = savedGame.pointPlus;
        if (typeof savedGame.autoPointPlus !== "undefined") autoPointPlus = savedGame.autoPointPlus;
        if (typeof savedGame.increasePointPrice !== "undefined") increasePointPrice = savedGame.increasePointPrice;
        if (typeof savedGame.autoPointPrice !== "undefined") autoPointPrice = savedGame.autoPointPrice;
        if (typeof savedGame.deathAmount !== "undefined") deathAmount = savedGame.deathAmount;
        if (typeof savedGame.deathBase !== "undefined") deathBase = savedGame.deathBase;
        if (typeof savedGame.deathExponent !== "undefined") deathExponent = savedGame.deathExponent;
        if (typeof savedGame.deathBoost !== "undefined") deathBoost = savedGame.deathBoost;
        if (typeof savedGame.deathCriteria !== "undefined") deathCriteria = savedGame.deathCriteria;
    }

    function saveGame() {
        var gameSave = {
            points: points,
            pointPlus: pointPlus,
            autoPointPlus: autoPointPlus,
            increasePointPrice: increasePointPrice,
            autoPointPrice: autoPointPrice,
            deathAmount: deathAmount,
            deathBase: deathBase,
            deathExponent: deathExponent,
            deathBoost: deathBoost,
            deathCriteria: deathCriteria
        };
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
    }

    window.onload = function() {
        loadGame();
        if(points == 1){
            $("#points").html("You have " + format(gameSave.points) + " point.");
        }else{
            $("#points").html("You have " + format(gameSave.points) + " points.");
        }

        if(autoPointPlus == 1){
            $("#idlePoints").html("You gain " + format(gameSave.autoPointPlus) + " point per second.");
        }else{
            $("#idlePoints").html("You gain " + format(gameSave.autoPointPlus) + " points per second.");
        }

        if(pointPlus == 1){
            $("#pointsPerClick").html("You gain " + format(gameSave.pointPlus) + " point per click.");
        }else{
            $("#pointsPerClick").html("You gain " + format(gameSave.pointPlus) + " points per click.");
        }

        if(deathAmount == 1){
            $("#deathBoost").html("Your " + gameSave.deathAmount + " death is boosting your progress by " + format(gameSave.deathBoost) + "x.");
        }else{
            $("#deathBoost").html("Your " + deathAmount + " deaths are boosting your progress by " + format(gameSave.deathBoost) + "x.");
        }
        $("#incAdd").html("Points/Click (" + format(gameSave.increasePointPrice) + ")");
        $("#autoAdd").html("Auto Click (" + format(gameSave.autoPointPrice) + ")");
        $("#die").html("Die<br>(" + gameSave.deathCriteria + " PPC/AC)");
    };

    setInterval(function(){
        saveGame();
    }, 30000);



    $("#autoAdd").click(function(){
        if(points < autoPointPrice){
            return
        }else{
        points -= autoPointPrice;
        autoPointPlus += 2.5*deathBoost;
        autoPointPrice *= 1.333;
        changeInventory();
        changeMarket();}
    });

    $("#incAdd").click(function(){
        if(points < increasePointPrice){
            return
        }else{
            points -= increasePointPrice;
            pointPlus += 1*deathBoost;
            increasePointPrice *= 1.25;
            changeInventory();
            changeMarket();
        }
    });

    $("#die").click(function(){
        if (autoPointPlus >= deathCriteria && pointPlus >= deathCriteria){
            deathPrestige();
        }else{
            return
        }
    });

    $("#addToPoints").click(function(){
        points += pointPlus;
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

        if(points == 1){
            $("#points").html("You have " + format(points) + " point.");
        }else{
            $("#points").html("You have " + format(points) + " points.");
        }

        if(autoPointPlus == 1){
            $("#idlePoints").html("You gain " + format(autoPointPlus) + " point per second.");
        }else{
            $("#idlePoints").html("You gain " + format(autoPointPlus) + " points per second.");
        }

        if(pointPlus == 1){
            $("#pointsPerClick").html("You gain " + format(pointPlus) + " point per click.");
        }else{
            $("#pointsPerClick").html("You gain " + format(pointPlus) + " points per click.");
        }

        if(deathAmount == 1){
            $("#deathBoost").html("Your " + deathAmount + " death is boosting your progress by " + format(deathBoost) + "x.");
        }else{
            $("#deathBoost").html("Your " + deathAmount + " deaths are boosting your progress by " + format(deathBoost) + "x.");
        }
    }

    function changeMarket(){
        $("#incAdd").html("Points/Click (" + format(increasePointPrice) + ")");
        $("#autoAdd").html("Auto Click (" + format(autoPointPrice) + ")");
        $("#die").html("Die<br>(" + deathCriteria + " PPC/AC)");
    }

    function switchMenu(menu){
        $(".menus").children().css("display", "none");
        $("." + menu).css("display", "block");
        return menu;
    }
    
    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.which == 83) { // ctrl + s
            event.preventDefault();
            saveGame();
        }
    }, false);
});
