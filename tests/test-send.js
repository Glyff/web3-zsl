const Web3 = require('./index')

const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://10.10.4.20:8545'))

web3.eth.personal.unlockAccount('0x82D058df078b4B524b485f109AE474B515B1C021', '123456').then(() => {

  console.log('Account unlocked')
  console.log('Sending transaction')
  web3.eth.sendTransaction({
    from: '0x82D058df078b4B524b485f109AE474B515B1C021',
    to: '0xBa72c5C93947aa8A27383950aeAF08EE47ac520A',
    value: '1000000000000000000',
    gasPrice: 18000000000,
    gasLimit: 21000,
  }).then(console.log)

})
