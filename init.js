nextCurrentButton();

if (routeNames.length == 1) {
    document.getElementById("route1Button").style.display = "none";
    document.getElementById("routeInfo").style.display = "block";

    if (routes[routeNames[routeNumber]].locomotives >= 1 && routes[routeNames[routeNumber]].freightCars >= 1 && routes[routeNames[routeNumber]].allocatedFuel >= 100) {
        document.getElementById("routeControlDiv").style.display = "block";
        nextCurrentButton();
        document.getElementById(currentButtonString).style.display = "inline";
    } else {
        document.getElementById("routeControlDiv").style.display = "none"; 
    }

    updateRoutePage();
}

