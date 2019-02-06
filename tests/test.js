const Web3 = require('./dist/index')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8546'))

web3.zsl.getRandomness().then(function (rho) {
  console.log({rho: rho})

  web3.zsl.getCommitment(rho, '0x1234567801234567801234567801234567801234567801234567801234567890', 10)
    .then(function (cm) {
      console.log({cm: cm})
    })
})

web3.zsl.generateZKeypair().then(console.log)
