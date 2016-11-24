const passenger = {
    balance: 0,
    tripStart: null,
    zones: []
};

const stations = {
    holborn: {
        zone: [1],
        name: 'Holborn',
        borderStation: false
    },
    earlsCourt: {
        zone: [1,2],
        name: 'Earls Court',
        borderStation: true
    },
    wimbledon: {
        zone: [3],
        name: 'Wimbledon',
        borderStation: false
    },
    hammersmith: {
        zone: [2],
        name: 'Hammersmith',
        borderStation: false
    },
    bus: {
        zone: ['bus'],
        name: 'Bus',
        borderStation: false
    }
};

const prices = {
    zoneOne: {
        cost: 2.50
    },
    outsideZoneOne: {
        cost: 2.00
    },
    zoneOnePlusOne: {
        cost: 3.00
    },
    twoZonesNotOne: {
        cost: 2.25
    },
    threeZones: {
        cost: 3.20
    },
    bus: {
        cost: 1.80
    }
}

export {
    passenger,
    stations,
    prices
}