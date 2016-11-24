import { expect, assert } from 'chai';
import { showBalance, updateBalance, chargeOnEntry, calculateOnExit }
  from '../scripts/Tube';
import { stations } from '../scripts/data/data';

describe('Tube Application', () => {
  describe('when calling show balance', () => {
    const passenger = {
      balance: 20
    }

    it('should return the current balance', () => {
      expect(showBalance(passenger)).to.equal(20)
    })
  });

  describe('when updating balance', () => {
    const passenger = {
      balance: 20
    }

    it('should update and return the current balance', () => {
      expect(updateBalance(20, passenger)).to.equal(40)
    })
  });

  describe('when passing through gate, entering station', () => {
    context('with enough credit', () => {
      const passenger = {
        balance: 20,
        tripStart: null,
        zones: []
      }

      chargeOnEntry(stations.hammersmith, passenger);

      it('should charge the card with the maximum fare', () => {
        expect(passenger.balance).to.equal(16.8)
      })
    })
    
    context('without enough credit', () => {
      const passenger = {
        balance: 0,
        tripStart: null,
        zones: []
      }

      it('should reject the card if balance is lower than minimum fare', () => {
        expect(chargeOnEntry(stations.hammersmith, passenger)).to.equal('error');
      });
    });
  });

  describe('when passing through gate, leaving station', () => {
    context('without swiping in', () => {
      const passenger = {
        balance: 10,
        tripStart: null,
        zones: []
      }

      calculateOnExit(stations.hammersmith, passenger);

      it('should take full fare', () => {
        expect(passenger.balance).to.equal(6.8)
      });
    });

    context('when swiped in', () => {
      const passenger = {
          balance: 10,
          tripStart: null,
          zones: []
        }
        
      context('travelled in zone 1 only', () => {
        const passenger = {
          balance: 10,
          tripStart: null,
          zones: []
        }

        chargeOnEntry(stations.holborn, passenger)
        calculateOnExit(stations.holborn, passenger)

        expect(passenger.balance).to.equal(7.5);
      });

      context('travelled in 1 zone only, outside of zone 1', () => {
        const passenger = {
          balance: 10,
          tripStart: null,
          zones: []
        }

        chargeOnEntry(stations.hammersmith, passenger)
        calculateOnExit(stations.hammersmith, passenger)

        expect(passenger.balance).to.equal(8);
      });

      context('travelled in zone 1 + 1 other zone', () => {
        chargeOnEntry(stations.holborn, passenger)
        calculateOnExit(stations.hammersmith, passenger)

        expect(passenger.balance).to.equal(7);
      });

      context('travelled in 2 zones not including zone 1', () => {
        const passenger = {
          balance: 10,
          tripStart: null,
          zones: []
        }

        chargeOnEntry(stations.wimbledon, passenger)
        calculateOnExit(stations.hammersmith, passenger)

        expect(passenger.balance).to.equal(7.75);
      });

      context('travelled in 3', () => {
        const passenger = {
          balance: 10,
          tripStart: null,
          zones: []
        }

        chargeOnEntry(stations.wimbledon, passenger)
        calculateOnExit(stations.holborn, passenger)

        expect(passenger.balance).to.equal(6.8);
      });

      context('travelled on bus', () => {
        const passenger = {
          balance: 10,
          tripStart: null,
          zones: []
        }

        chargeOnEntry(stations.bus, passenger)

        expect(passenger.balance).to.equal(8.2);
      });
    });
  });
})