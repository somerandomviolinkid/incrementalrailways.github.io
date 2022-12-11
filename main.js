function updateResources() {
    //update resource counts
    document.getElementById("moneyCount").innerHTML = "Money: " + data.resources.money;
    document.getElementById("fuelCount").innerHTML = "Fuel: " + data.resources.fuel;

    //update locomotive counts
    document.getElementById("d1000TotalCount").innerHTML = "Total D1000's: " + data.rollingStock.locomotives.d1000.total;
    document.getElementById("d1000AvailableCount").innerHTML = "Available D1000's: " + data.rollingStock.locomotives.d1000.available;
}

updateResources();

function buyLocomotive(locomotiveName) {
    if (data.resources.money >= rollingStockStats.locomotiveStats[locomotiveName].cost) {
        data.resources.money -= rollingStockStats.locomotiveStats[locomotiveName].cost;
        data.rollingStock.locomotives[locomotiveName].total++;
        data.rollingStock.locomotives[locomotiveName].available++;
        updateResources();
    }
}

let routeNumber = 0;

//switches between routes
function switchRoute(amount) {
    routeNumber += amount;
    updateRoutePage();
}

//class for making a new route
class newRoute {
    constructor(name, legnth, carType, locomotives, freightCars, allocatedFuel) {
        this.name = name;
        this.legnth = legnth;
        this.carType = carType;
        this.locomotives = locomotives;
        this.freightCars = freightCars;
        this.allocatedFuel = allocatedFuel;
    }
}

//updates route info
function updateRoutePage() {
    document.getElementById("routeTitle").innerHTML = routes[routeNames[routeNumber]].name;
    document.getElementById("locomotiveCount").innerHTML = "Locomotives: " + routes[routeNames[routeNumber]].locomotives;
    document.getElementById("freightCarCount").innerHTML = "Freight cars: " + routes[routeNames[routeNumber]].freightCars;
    document.getElementById("allocatedFuelCount").innerHTML = "Allocated fuel: " + routes[routeNames[routeNumber]].allocatedFuel;
}

//creates new routes
function createRoute(name, displayedName, distance, carType, buttonName) {
    if (data.resources.money >= distance * 1000) {
        //purchase tracks
        data.resources.money -= distance * 1000;

        //update routes index
        routeNames[routeNames.length] = name;
        routes[name] = new newRoute(displayedName, distance, carType, 0, 0, 0);

        //hide button
        document.getElementById(buttonName).style.display = "none";
        //show routeinfo screen
        document.getElementById("routeInfo").style.display = "block";

        //update stuff
        console.log(routes);
        console.log(routeNames);
        updateResources();
        updateRoutePage();
    }
}

//adds locomotives to selected routes (adding locomotives grants diminishing returns to maximum car amount and top speed)
function addLocomotive(type) {
    if (data.rollingStock.locomotives[type].available >= 1) {
        data.rollingStock.locomotives[type].available--;
        routes[routeNames[routeNumber]].locomotives++;
        updateResources();
        updateRoutePage();
    }
}

function removeLocomotive(type) {
    if (routes[routeNames[routeNumber]].locomotives >= 1) {
        data.rollingStock.locomotives[type].available++;
        routes[routeNames[routeNumber]].locomotives--;
        updateResources();
        updateRoutePage();
    }
}

function depleteFuel(routeName) {

}


