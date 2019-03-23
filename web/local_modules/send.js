import { BigNumber } from 'bignumber.js';
import web3 from 'web3js.js';
import abi from 'abi.js';
import Promise from 'bluebird';


const saleClockAuction = web3.eth.contract(abi.saleClockAuction.abi).at(abi.saleClockAuction.address);
const kittyCore = web3.eth.contract(abi.kittyCore.abi).at(abi.kittyCore.address);

export const buyItem = (id, price) => new Promise((resolve, reject) => {
  console.log(234432)
  saleClockAuction.bid(id, {
    value: price,
    gas: 220000,
    gasPrice: 1000000000 * 100,
  },
    (err, result) => (err ? reject(err) : resolve(result)));
});

export const action = (id, startpic, endPic, duration) => new Promise((resolve, reject) => {
  kittyCore.createSaleAuction(id, startpic, endPic, duration, {
    gas: 220000,
    gasPrice: 1000000000 * 100,
  }, (err, result) => (err ? reject(err) : resolve(result)));
})

export const getOwner = () => Promise.promisify(saleClockAuction.owner)()