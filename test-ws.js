const Web3 = require('./index')
const BN = require('bn.js')

const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://10.10.4.20:8545'))

// Workaround to check if is connected asyncronously
web3.currentProvider.send({id: 9999999999, jsonrpc: '2.0', method: 'net_listening', params: []}, (err, result) => {
  if (err) {
    return console.log(err)
  }

  console.log('Web3  connected!')

  web3.zsl.getRandomness().then(function (rho) {
    console.log({rho: rho})

    web3.zsl.getCommitment(rho, '0x1234567801234567801234567801234567801234567801234567801234567890', 10)
      .then(function (cm) {
        console.log({cm: cm})
      })
  })

  web3.zsl.generateZKeypair().then(console.log)
})
