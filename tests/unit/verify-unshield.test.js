import Web3 from '../../'
import co from 'co'
import config from '../config'
import BN from 'bn.js'

const debug = require('debug')('test')
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://' + config.host + ':' + config.port))

describe('verify unshield', () => {
  let tokenContract
  let tracker

  beforeAll(() => {
    return co(function* () {
      debug('Connecting to node...')
      yield web3.eth.net.isListening()
      debug('Connected to node')
      tokenContract = new web3.eth.Contract(config.abi, config.contract)

      const keyPair = yield web3.zsl.generateZKeypair()
      tracker = Object.assign({}, keyPair)
    })
  })

  it('should verify that unshieling is correct', () => {
    return co(function *() {
      debug('Balance: ' + (yield web3.eth.getBalance(config.address)))

      const rho = yield web3.zsl.getRandomness()
      const value = new BN(web3.utils.toWei('1', 'szabo'))
      const cm = yield web3.zsl.getCommitment(rho, tracker.a_pk, value.toNumber())
      debug({cm})

      const witnesses = yield tokenContract.methods.getWitness(cm).call()
      debug({witnesses})
      const treeIndex = parseInt(witnesses[0])
      const authPath = witnesses[1]

      debug({rho, sk: tracker.a_sk, value: value.toNumber(), treeIndex, authPath})

      const unsh = yield web3.zsl.createUnshielding(rho, tracker.a_sk, value.toNumber(), treeIndex, authPath)

      debug(unsh)
    })
  })
})
