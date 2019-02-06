const Web3 = require('../')
const BN = require('bn.js')

const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))

web3.zsl.getRandomness().then(function (rho) {
  console.log({rho: rho})

  web3.zsl.getCommitment(rho, '0x1234567801234567801234567801234567801234567801234567801234567890', 10)
    .then(function (cm) {
      console.log({cm: cm})
    }).catch(console.log)
})

web3.zsl.generateZKeypair().then(console.log).catch(console.log)
