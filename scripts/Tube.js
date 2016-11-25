import { prices } from './data/data'

const showBalance = (passenger) => {
  const balance = passenger.balance;
  console.log('Current balance ' + balance + '.');
  return balance;
}

const updateBalance = (amount, passenger) => {
  const newBalance = passenger.balance + amount;
  passenger.balance = newBalance;
  console.log('Increased balance by ' + amount + '. New balance is ' + passenger.balance + '.');
  return newBalance;
}

const chargeOnEntry = (station, passenger) => {
  passenger.tripStart = station;
  const maxCharge = getMaxCost(station);
  const minCharge = getMinCost(station);

  if (minCharge > passenger.balance) {
    console.log('Not enough credit.');
    return 'error';
  }

  passenger.zones = passenger.zones.concat(station.zone);
  console.log('Passenger entered ' + station.name + ' in zone ' + station.zone + '.')
  const newBalance = passenger.balance - maxCharge;

  passenger.balance = newBalance;
  console.log('Passenger charged max fare of ' + maxCharge + '.');

  if (passenger.zones[0] === 'bus') {
    passenger.zones = [];
  }

  return 'Passenger entered ' + station.name + ' in zone ' + station.zone + '. Passenger charged max fare of ' + maxCharge + '.'
}

const calculateOnExit = (station, passenger) => {
  const zone = station.zone.slice();
  const maxCharge = getMaxCost(station);
  let price = 0;

  // Calculations for border stations
  if (zone.length > 1) {
    if (zone[0] >= passenger.zones[0]) {
      zone.splice(1,1)
    } else {
      zone.splice(0,1)
    }
  }

  if (passenger.zones.length > 1) {
    if (passenger.zones[0] >= zone[0]) {
      passenger.zones.splice(1,1)
    } else {
      passenger.zones.splice(0,1)
    }
  }

  passenger.zones = passenger.zones.concat(zone);
  const journey = passenger.zones;
  const lowestZone = Math.min(...journey);
  const highestZone = Math.max(...journey);
  const numberOfZones = highestZone - lowestZone + 1;

  if (numberOfZones === 1) {
    if (lowestZone === 1) {
      price = prices.zoneOne.cost;
    } else {
      price = prices.outsideZoneOne.cost;
    }
  }

  // 2 zone travel, check if includes zone 1 or not
  if (numberOfZones === 2) {
    if (lowestZone === 1) {
      price = prices.zoneOnePlusOne.cost;
    } else {
      price = prices.twoZonesNotOne.cost;
    }
  }

  // 3 zone travel
  if (numberOfZones > 2) {
    price = prices.threeZones.cost;
  }

  let totalRefund;
  let totalCharge;
  let newBalance;

  if (journey.length !== 1) {
    totalRefund = maxCharge - price;
    newBalance = passenger.balance + totalRefund;
    passenger.balance = newBalance;
  } else {
    // never swiped in so take max fare
    totalCharge = maxCharge;
    newBalance = passenger.balance - totalCharge;
  }

  passenger.balance = newBalance;

  console.log('Passenger left at station ' + station.name + ' in zone ' + zone + '. Charge for this fare is ' + price);
  
  // initialize journey
  passenger.zones = [];

  return 'Passenger left at station ' + station.name + ' in zone ' + zone + '. Charge for this fare is ' + price;
}

const getMaxCost = (station) => {
  let maxPrice = 0;

  if (station.zone[0] === 'bus') {
    maxPrice = prices.bus.cost;
  } else {
    maxPrice = prices.threeZones.cost;
  }

  return maxPrice;
}

const getMinCost = (station) => {
  let minPrice = 0;

  if (station.zone[0] === 'bus') {
    minPrice = prices.bus.cost;
  } else if (station.zone[0] === 1) {
    minPrice = prices.zoneOne.cost;
  } else {
    minPrice = prices.outsideZoneOne.cost
  }

  return minPrice;
}

export {
  showBalance,
  updateBalance,
  chargeOnEntry,
  calculateOnExit
}