const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'mouse leisure dry run meat universe ten bronze soccer glove panel tourist',
  'https://rinkeby.infura.io/bM4Q2FGvjvWdtcqaRnpo'
);

const web3 = new Web3(provider);

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  // it is working on truffle-hdwallet-provider@0.0.3
  // need to add 0x before bytecode
  // bytecode is being treated as a single number rather than a series of bytes.
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['Hi there!']})
    .send({ gas: '1000000', from: accounts[0]});

  // result.setProvider(provider);

  console.log('Contract deployed to', result.options.address);
}

deploy();
