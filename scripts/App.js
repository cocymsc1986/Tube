import React, { Component } from 'react';
import { showBalance, updateBalance, enterStation, leaveStation } from 'Tube';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>{this.updateBalance()}</div>
        <div>{this.enterStation()}</div>
        <div>{this.leaveStation()}</div>
        <div>{this.showBalance()}</div>
      </div>
    );
  }
}
