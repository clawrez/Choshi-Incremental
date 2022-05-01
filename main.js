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
});