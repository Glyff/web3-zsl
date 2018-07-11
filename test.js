const Web3 = require('./index')
const BN = require('bn.js')

const web3 = new Web3(new Web3.providers.HttpProvider("http://10.10.4.20:18545"))

web3.zsl.getRandomness().then(function (rho) {
  console.log({rho: rho})

  web3.zsl.getCommitment(rho, '0x1234567801234567801234567801234567801234567801234567801234567890', 10)
    .then(function (cm) {
      console.log({cm: cm})
    })
})
