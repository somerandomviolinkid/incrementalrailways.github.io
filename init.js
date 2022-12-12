//checks if player has created first route and then hides/shows stuff

if (routeNames.length == 1) {
    document.getElementById("route1Button").style.display = "none";
    document.getElementById("routeInfo").style.display = "block";

    if (routes[routeNames[routeNumber]].locomotives >= 1 && routes[routeNames[routeNumber]].freightCars >= 1 && routes[routeNames[routeNumber]].allocatedFuel >= 100) {
        document.getElementById("routeControlDiv").style.display = "block";
        document.getElementById("routeStep1").style.display = "inline";
    } else {
        document.getElementById("routeControlDiv").style.display = "none"; 
    }

    updateRoutePage();
}
