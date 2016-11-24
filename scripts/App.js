import React, { Component } from 'react';
import { showBalance, updateBalance, chargeOnEntry, calculateOnExit } from './Tube';
import { stations, prices, passenger } from './data/data.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>Starting balance: {showBalance(passenger)}</div>
        <div>Updated balance: {updateBalance(30, passenger)}</div>
        <div>{chargeOnEntry(stations.holborn, passenger)}</div>
        <div>{calculateOnExit(stations.earlsCourt, passenger)}</div>
        <div>{chargeOnEntry(stations.bus, passenger)}</div>
        <div>{chargeOnEntry(stations.earlsCourt, passenger)}</div>
        <div>{calculateOnExit(stations.hammersmith, passenger)}</div>
        <div>Final balance: {showBalance(passenger)}</div>
      </div>
    );
  }
}
