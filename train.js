//hides rolling stock add buttons
function hideRollingStockButtons() {
    const rollingStockButtons = document.getElementsByClassName("addRollingStockButton");
    for (let i = 0; i < rollingStockButtons.length; i++) {
        rollingStockButtons[i].style.display = "none";
    }
}

//shows rolling stock add buttons
function showRollingStockButtons() {
    const rollingStockButtons = document.getElementsByClassName("addRollingStockButton");
    for (let i = 0; i < rollingStockButtons.length; i++) {
        rollingStockButtons[i].style.display = "inline";
    }
}

//puts page back in original state
function returnTrain() {
    showRollingStockButtons();
    currentStep = 0;
    document.getElementById("routeStep1").style.display = "inline";
}

let currentStep = 0;

//cycles through steps
function nextTask() {
    const routeControlButtons = document.getElementsByClassName("routeControlButton");
    routeControlButtons[currentStep].style.display = "none";
    currentStep++;

    routeControlButtons[currentStep].style.display = "inline";
}

let countdownID;
let depleteFuelID;
let countdowns = 0;
let countdownNumberTime = 0;
document.getElementById("countdownTimer").style.display = "none";

//countdown function
function countdown(time) {

    if (countdowns == 0) {
        countdowns = 1;
        countdownNumberTime = time;
    }

    document.getElementById("countdownTimer").style.display = "inline";
    document.getElementById("countdownTimer").innerHTML = "Time remaining in current task: " + countdownNumberTime;
    countdownNumberTime--;

    if (countdownNumberTime == -1) {
        clearInterval(countdownID);
        countdownID = undefined;
        clearInterval(depleteFuelID);
        depleteFuelID = undefined;
        countdownNumberTime = 0;
        countdowns = 0;
        document.getElementById("countdownTimer").style.display = "none";
    }
}

//depletes train fuel
function depleteFuel() {
    routes[routeNames[routeNumber]].allocatedFuel -= (1 / (rollingStockStats.locomotiveStats.d1000.fuelEfficiency * (Math.log(routes[routeNames[routeNumber]].locomotives) + 1))) * ((rollingStockStats.locomotiveStats.d1000.weight * routes[routeNames[routeNumber]].locomotives) + (rollingStockStats.freightCarStats[routes[routeNames[routeNumber]].carType].weight * routes[routeNames[routeNumber]].freightCars));
    updateRoutePage();
}

function gainProfit() {
    //profits!!
    data.resources.money += 5000 * routes[routeNames[routeNumber]].freightCars;
    updateResources();
}

//load train
function loadTrain() {
    hideRollingStockButtons();
    document.getElementById("routeStep1").style.display = "none";

    if (!countdownID) {
        countdown(rollingStockStats.freightCarStats[routes[routeNames[routeNumber]].carType].loadingTime);
        countdownID = setInterval(countdown, 1000, (rollingStockStats.freightCarStats[routes[routeNames[routeNumber]].carType].loadingTime));
    }

    setTimeout(nextTask, (rollingStockStats.freightCarStats[routes[routeNames[routeNumber]].carType].loadingTime * 1000));
}

//dispatch train first time
function dispatchTrain1() {
    document.getElementById("routeStep2").style.display = "none";

    if (!countdownID) {
        countdown(data.buildingStats.headquarters.dispatchingTime);
        countdownID = setInterval(countdown, 1000, (data.buildingStats.headquarters.dispatchingTime));
    }

    setTimeout(nextTask, data.buildingStats.headquarters.dispatchingTime * 1000);
}

//drive train first time
function trainTravel1() {
    document.getElementById("routeStep3").style.display = "none";

    if (!countdownID) {
        countdown((routes[routeNames[routeNumber]].legnth * 60) / rollingStockStats.locomotiveStats.d1000.topSpeed);
        countdownID = setInterval(countdown, 1000, ((routes[routeNames[routeNumber]].legnth * 60) / rollingStockStats.locomotiveStats.d1000.topSpeed));
        depleteFuel();
        depleteFuelID = setInterval(depleteFuel, 1000);
    }

    setTimeout(nextTask, (((routes[routeNames[routeNumber]].legnth) * 60000) / (rollingStockStats.locomotiveStats.d1000.topSpeed)));
}

//unload train
function unloadTrain() {
    document.getElementById("routeStep4").style.display = "none";

    if (!countdownID) {
        countdown(rollingStockStats.freightCarStats[routes[routeNames[routeNumber]].carType].unloadingTime);
        countdownID = setInterval(countdown, 1000, (rollingStockStats.freightCarStats[routes[routeNames[routeNumber]].carType].unloadingTime));
    }

    setTimeout(nextTask, rollingStockStats.freightCarStats[routes[routeNames[routeNumber]].carType].unloadingTime * 1000);
    setTimeout(gainProfit, rollingStockStats.freightCarStats[routes[routeNames[routeNumber]].carType].unloadingTime * 1000);
}

//dispatch train back home
function dispatchTrain2() {
    document.getElementById("routeStep5").style.display = "none";

    if (!countdownID) {
        countdown(data.buildingStats.headquarters.dispatchingTime);
        countdownID = setInterval(countdown, 1000, (data.buildingStats.headquarters.dispatchingTime));
    }

    setTimeout(nextTask, data.buildingStats.headquarters.dispatchingTime * 1000);
}

//drive train home
function trainTravel2() {
    document.getElementById("routeStep6").style.display = "none";

    if (!countdownID) {
        countdown((routes[routeNames[routeNumber]].legnth * 60) / rollingStockStats.locomotiveStats.d1000.topSpeed);
        countdownID = setInterval(countdown, 1000, ((routes[routeNames[routeNumber]].legnth * 60) / rollingStockStats.locomotiveStats.d1000.topSpeed));
        depleteFuel();
        depleteFuelID = setInterval(depleteFuel, 1000);
    }

    setTimeout(returnTrain, (((routes[routeNames[routeNumber]].legnth) * 60000) / (rollingStockStats.locomotiveStats.d1000.topSpeed)));
}

//load train -> dispatch train -> go to destination -> unload train -> dispatch train -> return to starting place
//deplete fuel and do countdowns every second while train is going to destinations
