const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

//S2L44 2:48 Cannot destructure property `interface` of 'undefined' or 'null'.
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const TNITIAL_STRING = 'Hi there!'

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // web3.eth.getAccounts()
  //   .then(fetchedAccounts => {
  //     console.log(fetchedAccounts);
  //   })

  //Use one of those accounts to deploy
  //the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({ from: accounts[0], gas: '1000000'});

    inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0], gas: '1000000'});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});

// class Car {
//   park(){
//     return 'stopped';
//   }
//   drive(){
//     return 'vroom';
//   }
// }
//
// let car; //global scope
//
// beforeEach(() => {
//   car = new Car();
// });
//
// describe('Car', () => {
//   it('can park', () => {
//     assert.equal(car.park(), 'stopped');
//   });
//
//   it('can drive', () => {
//     assert.equal(car.drive(), 'vroom');
//   });
//
// });
