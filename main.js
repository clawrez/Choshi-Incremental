$(document).ready(function(){

    var data = {
    points: 0,

    pointPlus: 1,
    autoPointPlus: 0,
    increasePointPrice: 100,
    autoPointPrice: 500,

    deathAmount: 0,
    deathBase: 1,
    deathExponent: 1.2,
    deathBoost: 1,
    deathCriteria: 10

    }
    var menu;

    function format(amount) {
        let power = Math.floor(Math.log10(amount));
        let mantissa = amount / Math.pow(10, power);
        if (power < 6) return amount.toFixed(2);
        return mantissa.toFixed(2) + "e" + power;
    }

    setInterval(function(){ //auto clicker
        points += autoPointPlus;
        changeInventory();
        changeMarket();
    }, 1000);

    function saveTheGame(){
        localStorage["data"] = JSON.stringify(data);
    }

    function loadTheGame (){
        data = JSON.parse(localStorage["data"]);
    }

    function deathPrestige(){ //death (prestige class 1)
        deathAmount++;
        deathBase = Math.pow(2, deathAmount);
        deathBoost = Math.pow(deathBase, deathExponent);
        points = 0;
        pointPlus = 1 * deathBoost;
        autoPointPlus = 0;
        deathCriteria *= 2;
    }



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
        $("#pointsValue").html(format(points));

        if(points == 1){
            $("#pointsPlural").html("point");
        }else{
            $("#pointsPlural").html("points");
        }

        $("#idleValue").html(format(autoPointPlus));

        if(autoPointPlus == 1){
            $("#idlePlural").html("point");
        }else{
            $("#idlePlural").html("points");
        }

        $("#ppcValue").html(format(pointPlus));

        if(pointPlus == 1){
            $("#ppcPlural").html("point");
        }else{
            $("#ppcPlural").html("points");
        }

        $("#deathAmountValue").html(deathAmount);
        $("#deathBoostValue").html(format(deathBoost));

        if(deathAmount == 1){
            $("#deathPlural").html("death is");
        }else{
            $("#deathPlural").html("deaths are");
        }
    }

    function changeMarket(){
        $("#incAddPrc").html(format(increasePointPrice));
        $("#autoAddPrc").html(format(autoPointPrice));
        $("#deathCrit").html(deathCriteria);
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
