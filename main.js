function updateResources() {
    //update resource counts
    document.getElementById("moneyCount").innerHTML = "Money: " + data.resources.money.toFixed(0);
    document.getElementById("fuelCount").innerHTML = "Fuel: " + data.resources.fuel.toFixed(2);

    //update locomotive counts
    document.getElementById("d1000TotalCount").innerHTML = "Total D1000's: " + data.rollingStock.locomotives.d1000.total;
    document.getElementById("d1000AvailableCount").innerHTML = "Available D1000's: " + data.rollingStock.locomotives.d1000.available;

    //update freight car counts
    document.getElementById("hopperCarTotalCount").innerHTML = "Total hopper cars: " + data.rollingStock.freightCars.hopperCar.total;
    document.getElementById("hopperCarAvailableCount").innerHTML = "Available hopper cars: " + data.rollingStock.freightCars.hopperCar.available;
}

updateResources();

//buy locomotive of your choice
function buyLocomotive(locomotiveName) {
    if (data.resources.money >= rollingStockStats.locomotiveStats[locomotiveName].cost) {
        data.resources.money -= rollingStockStats.locomotiveStats[locomotiveName].cost;
        data.rollingStock.locomotives[locomotiveName].total++;
        data.rollingStock.locomotives[locomotiveName].available++;
        updateResources();
    }
}

//buy freight car of your choice
function buyFreightCar(freightCarName) {
    if (data.resources.money >= rollingStockStats.freightCarStats[freightCarName].cost) {
        data.resources.money -= rollingStockStats.freightCarStats[freightCarName].cost;
        data.rollingStock.freightCars[freightCarName].total++;
        data.rollingStock.freightCars[freightCarName].available++;
        updateResources();
    }
}

//buy fuel
function buyFuel(amount) {
    if (data.resources.money >= amount * 10) {
        data.resources.money -= amount * 10;
        data.resources.fuel += amount;
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
    document.getElementById("allocatedFuelCount").innerHTML = "Allocated fuel: " + routes[routeNames[routeNumber]].allocatedFuel.toFixed(2);
}

//creates new routes
function createRoute(name, displayedName, distance, carType, buttonName) {
    if (data.resources.money >= distance * 2000) {
        //purchase tracks
        data.resources.money -= distance * 2000;

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
        if (routes[routeNames[routeNumber]].locomotives >= 1 && routes[routeNames[routeNumber]].freightCars >= 1 && routes[routeNames[routeNumber]].allocatedFuel >= 100) {
            document.getElementById("routeControlDiv").style.display = "block";
            document.getElementById("routeStep1").style.display = "inline";
        }
        updateResources();
        updateRoutePage();
    }
}

function removeLocomotive(type) {
    if (routes[routeNames[routeNumber]].locomotives >= 1) {
        data.rollingStock.locomotives[type].available++;
        routes[routeNames[routeNumber]].locomotives--;
        if (routes[routeNames[routeNumber]].locomotives === 0) {
            document.getElementById("routeControlDiv").style.display = "none";
        }
        updateResources();
        updateRoutePage();
    }
}


function addFreightCar(type) {
    if (data.rollingStock.freightCars[type].available >= 1) {
        data.rollingStock.freightCars[type].available--;
        routes[routeNames[routeNumber]].freightCars++;
        if (routes[routeNames[routeNumber]].locomotives >= 1 && routes[routeNames[routeNumber]].freightCars >= 1 && routes[routeNames[routeNumber]].allocatedFuel >= 100) {
            document.getElementById("routeControlDiv").style.display = "block";
            document.getElementById("routeStep1").style.display = "inline";
        }
        updateResources();
        updateRoutePage();
    }
}

function removeFreightCar(type) {
    if (routes[routeNames[routeNumber]].freightCars >= 1) {
        data.rollingStock.freightCars[type].available++;
        routes[routeNames[routeNumber]].freightCars--;
        if (routes[routeNames[routeNumber]].freightCars === 0) {
            document.getElementById("routeControlDiv").style.display = "none";
        }
        updateResources();
        updateRoutePage();
    }
}

function allocateFuel(amount) {
    if (data.resources.fuel >= amount && routes[routeNames[routeNumber]].allocatedFuel + amount <= rollingStockStats.locomotiveStats.d1000.fuelCapacity * routes[routeNames[routeNumber]].locomotives) {
        data.resources.fuel -= amount;
        routes[routeNames[routeNumber]].allocatedFuel += amount;
        if (routes[routeNames[routeNumber]].locomotives >= 1 && routes[routeNames[routeNumber]].freightCars >= 1 && routes[routeNames[routeNumber]].allocatedFuel >= 100) {
            document.getElementById("routeControlDiv").style.display = "block";
            document.getElementById("routeStep1").style.display = "inline";
        }
        updateResources();
        updateRoutePage();
    }
}


