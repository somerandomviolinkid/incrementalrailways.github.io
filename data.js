let data = {
    resources: {
        money: 0,
        fuel: 0,
        totalEmployees: 0,
        availableEmployees: 0
    },
    rollingStock: {
        locomotives: {
            totalLocomotives: 0,
            d1000: {
                total: 0,
                available: 0
            },
            d1010: {
                total: 0,
                available: 0
            },
            d1020: {
                total: 0,
                available: 0
            }
        },
        freightCars: {
            hopperCar: {
                total: 0,
                available: 0
            }
        }
    },
    buildingStats: {
        freightDepot: {
            built: false,
            size: 1,
            speed: 1,
            tracks: 1,
            upgrades: {
                speed1: false,
                speed2: false,
                speed3: false,
                speed4: false,
                size1: false,
                size2: false,
                size3: false,
                size4: false,
                track1: false,
                track2: false,
                track3: false,
                track4: false
            }
        },
        passengerStation: {
            tracks: 1,
            size: 1,
            researched: false,
            built: false
        },
        railyard: {
            lanes: 1,
            space: 10,
            researched: false,
            built: false
        },
        engineShed: {
            space: 1,
            researched: false,
            built: false
        },
        maintenenceCenter: {
            space: 3,
            repairTime: 120,
            researched: false,
            built: false
        },
        headquarters: {
            dispatchingTime: 10,
            maxEmployees: 5,
            researched: false,
            built: false
        }
    }
}
