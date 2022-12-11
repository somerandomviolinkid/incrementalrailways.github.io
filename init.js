//checks if player has created first route and then hides/shows stuff

if (routeNames.length == 1) {
    document.getElementById("route1Button").style.display = "none";
    document.getElementById("routeInfo").style.display = "block";
    updateRoutePage();
}