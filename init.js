if (routeNames.length == 1) {
    document.getElementById("route1Button").style.display = "none";
    document.getElementById("routeInfo").style.display = "block";

    if (routes[routeNames[routeNumber]].locomotives >= 1 && routes[routeNames[routeNumber]].freightCars >= 1 && routes[routeNames[routeNumber]].allocatedFuel >= 100) {
        document.getElementById("routeControlDiv").style.display = "block";
        nextCurrentButton();
        document.getElementById(currentButtonString).style.display = "inline";
        if (routes[routeNames[routeNumber]].currentStep !== 0) {
            hideRollingStockButtons();
        }
    } else {
        document.getElementById("routeControlDiv").style.display = "none"; 
    }

    updateRoutePage();
}

document.getElementById("trainTabButton").click();

if (data.buildingStats.freightDepot.built == true) {
    document.getElementById("buildFreightDepot").style.display = "none";
    document.getElementById("freightProgress").style.display = "block";
    moveFreightProgressBar();
    updateFreightDepotInfo();
} else {
    document.getElementById("collectFeesButton").style.display = "none";
    document.getElementById("freightDepotUpgradesDiv").style.display = "none";
}

//op code
if (data.buildingStats.freightDepot.upgrades.speed1 == true) {
    document.getElementById("upgradeFreightDepotSpeed1").style.display = "none";
    document.getElementById("upgradeFreightDepotSize1").style.display = "block";
} else {
    document.getElementById("upgradeFreightDepotSize1").style.display = "none";
}

if (data.buildingStats.freightDepot.upgrades.size1 == true) {
    document.getElementById("upgradeFreightDepotSize1").style.display = "none";
    document.getElementById("upgradeFreightDepotTrack1").style.display = "block";
} else {
    document.getElementById("upgradeFreightDepotTrack1").style.display = "none";
}

if (data.buildingStats.freightDepot.upgrades.track1 == true) {
    document.getElementById("upgradeFreightDepotTrack1").style.display = "none";
}

if (research.freightDepot1.researched == false) {
    document.getElementById("upgradeFreightDepotSpeed2").style.display = "none";
    document.getElementById("upgradeFreightDepotSpeed3").style.display = "none";
    document.getElementById("upgradeFreightDepotSpeed4").style.display = "none";
    document.getElementById("upgradeFreightDepotSize2").style.display = "none";
    document.getElementById("upgradeFreightDepotSize3").style.display = "none";
    document.getElementById("upgradeFreightDepotSize4").style.display = "none";
    document.getElementById("upgradeFreightDepotTrack2").style.display = "none";
    document.getElementById("upgradeFreightDepotTrack3").style.display = "none";
    document.getElementById("upgradeFreightDepotTrack4").style.display = "none";
}
