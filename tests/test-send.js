const Web3 = require('../')

const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))

web3.eth.personal.unlockAccount('0x12fb805833E14568f429386a3934247cb76b5F60', '123123', 9999)
  .then(() => {
    console.log('Account unlocked')
    console.log('Sending transaction')
    web3.eth.sendTransaction({
      from: '0x12fb805833E14568f429386a3934247cb76b5F60',
      to: '0xBa72c5C93947aa8A27383950aeAF08EE47ac520A',
      value: '1000000',
      gasPrice: 18000000000,
      gasLimit: 21000,
    }).then(console.log)
      .catch(console.log)

  }).catch(console.log)
