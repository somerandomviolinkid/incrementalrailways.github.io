function updateResources() {
    //update resource counts
    document.getElementById("moneyCount").innerHTML = "Money: " + data.resources.money.toFixed(0);
    document.getElementById("fuelCount").innerHTML = "Fuel: " + data.resources.fuel.toFixed(2);
    document.getElementById("totalEmployeeCount").innerHTML = "Total employees: " + data.resources.totalEmployees.toFixed(0) + " / " + data.buildingStats.headquarters.maxEmployees;
    document.getElementById("availableEmployeeCount").innerHTML = "Available employees: " + data.resources.availableEmployees.toFixed(0);

    //update locomotive counts
    document.getElementById("d1000TotalCount").innerHTML = "Total D1000's: " + data.rollingStock.locomotives.d1000.total + " / " + data.buildingStats.engineShed.space;
    document.getElementById("d1000AvailableCount").innerHTML = "Available D1000's: " + data.rollingStock.locomotives.d1000.available;

    //update freight car counts
    document.getElementById("hopperCarTotalCount").innerHTML = "Total hopper cars: " + data.rollingStock.freightCars.hopperCar.total + " / " + data.buildingStats.railyard.space;
    document.getElementById("hopperCarAvailableCount").innerHTML = "Available hopper cars: " + data.rollingStock.freightCars.hopperCar.available;

    //update railyard stats
    document.getElementById("railyardLanesCount").innerHTML = "Railyard lanes: " + data.buildingStats.railyard.lanes;
    document.getElementById("railyardStorageCount").innerHTML = "Railyard lane storage: " + data.buildingStats.railyard.space;

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
    constructor(name, legnth, carType, locomotives, freightCars, allocatedFuel, currentStep) {
        this.name = name;
        this.legnth = legnth;
        this.carType = carType;
        this.locomotives = locomotives;
        this.freightCars = freightCars;
        this.allocatedFuel = allocatedFuel;
        this.currentStep = currentStep;
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
        routes[name] = new newRoute(displayedName, distance, carType, 0, 0, 0, 0);

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

//adds locomotives to selected routes (adding locomotives grants diminishing returns to maximum car amount and fuel efficiency)
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

//remove locomotive
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

//add freight car
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

//remove freight car
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

//allocate fuel to route
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

//freight depot stuff
function updateFreightDepotInfo() {
    document.getElementById("freightDepotSpeed").innerHTML = "Speed: " + data.buildingStats.freightDepot.speed;
    document.getElementById("freightDepotSize").innerHTML = "Size: " + data.buildingStats.freightDepot.size;
    document.getElementById("freightDepotTracks").innerHTML = "Tracks: " + data.buildingStats.freightDepot.tracks;
}

function freightFees() {
    moveFreightProgressBar();
    data.resources.money += 100 * data.buildingStats.freightDepot.speed * data.buildingStats.freightDepot.size;
    updateResources();
}

function stopFreightTimer() {
    clearInterval(progress1ID);
    progress1 = 0;
    document.getElementById("collectFeesButton").style.display = "block";
}

let freightFeesID;

function buildFreightDepot() {
    document.getElementById("buildFreightDepot").style.display = "none";

    document.getElementById("freightProgress").style.display = "block";
    document.getElementById("collectFeesButton").style.display = "block";
    document.getElementById("freightDepotUpgradesDiv").style.display = "block";
    document.getElementById("upgradeFreightDepotSpeed1").style.display = "block";

    moveFreightProgressBar();

    data.buildingStats.freightDepot.built = true;

    updateFreightDepotInfo();
}

function upgradeFreightDepot(buttonName, target, cost, unlock) {
    if (data.resources.money >= cost) {
        data.resources.money -= cost;
        data.buildingStats.freightDepot[target]++;

        if (target == 'tracks') {
            highlightTab('headquartersTabButton');
        }

        clearInterval(progress1ID);
        progress1 = 0;
        moveFreightProgressBar();

        document.getElementById(buttonName).style.display = "none";
        if (unlock) {
            document.getElementById(unlock).style.display = "block";
        }

        updateResources();
        updateFreightDepotInfo();
    }
}
