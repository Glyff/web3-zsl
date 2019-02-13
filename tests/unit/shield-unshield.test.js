import Web3 from '../../'
import co from 'co'
import config from '../config'
import BN from 'bn.js'

const debug = require('debug')('test')
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://' + config.host + ':' + config.port))

describe('shield unshield', () => {
  let tokenContract
  let note
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

  it('should have test address with sufficient balances', async () => {
    return co(function *() {
      debug('Balance is: ' + (yield web3.eth.getBalance(config.address)))
      const glyBalance = new BN(yield web3.eth.getBalance(config.address))
      const glxBalance = new BN(yield tokenContract.methods.balanceOf(config.address).call())

      expect(glyBalance.gt(web3.utils.toWei('1', 'ether'))).toBe(true)
      expect(glxBalance.gt(web3.utils.toWei('1', 'szabo'))).toBe(true)
    })
  })

  it('should shield successfully', async (done) => {
    co(function *() {
      yield web3.eth.personal.unlockAccount(config.address, config.password, 9999)

      const value = new BN(web3.utils.toWei('1', 'szabo'))
      const rho = yield web3.zsl.getRandomness()

      debug('Generating proof for shielding - value: ' + value.toNumber())
      const result = yield web3.zsl.createShielding(rho, tracker.a_pk, value.toNumber())
      debug('Generating finished')

      const txHash = yield new Promise((resolve, reject) => {
        tokenContract.methods.shield(result.proof, result.send_nf, result.cm, value)
          .send({from: config.address, gas: 200000}, (err, hash) => {
            debug('Transaction sent', {err, hash})
            if (err) reject(err)
            resolve(hash)
          })
      })

      note = {
        txHash,
        rho,
        value,
        uuid: web3.utils.toHex(web3.utils.sha3(result.cm, {encoding: 'hex'})),
        contract: tokenContract.options.address,
        address: config.address,
        confirmed: false,
      }

      debug('Shielded note', note)

      debug('Waiting for comfirmation')
      tokenContract.events.LogShielding({}, (err, event) => {
        debug('Recieved LogShielding event', event.returnValues)
        expect(err).toBeFalsy()
        expect(event.returnValues.from).toBe(config.address)
        expect(event.returnValues.uuid).toBe(note.uuid)
        note.confirmed = true
        done()
      })

      expect.assertions(3)
    })
  }, 300000)

  it('should unshield successfully', async (done) => {
    co(function *() {
      debug('Generating proof for unshielding')
      const cm = yield web3.zsl.getCommitment(note.rho, tracker.a_pk, note.value.toNumber())
      const witnesses = yield tokenContract.methods.getWitness(cm).call()
      const treeIndex = parseInt(witnesses[0])
      const authPath = witnesses[1]
      const root = yield tokenContract.methods.root().call()
      debug('CreateUnshielding', {rho: note.rho, a_sk: tracker.a_sk, value: note.value.toNumber(), treeIndex, authPath})
      const unsh = yield web3.zsl.createUnshielding(note.rho, tracker.a_sk, note.value.toNumber(), treeIndex, authPath)
      debug('Generating proof finished')

      yield new Promise((resolve, reject) => {
        tokenContract.methods.unshield(unsh.proof, unsh.send_nf, cm, root, note.value)
          .send({from: config.address, gas: appConfig.unshieldGas.toNumber()}, (err, hash) => {
            debug('Unshielding transaction sent', {err, hash})
            if (err) reject(err)
            resolve(hash)
          })
      })

      debug('Waiting for comfirmation')
      tokenContract.events.LogUnshielding({}, (err, event) => {
        debug('Recieved LogUnshielding event')
        debug({err, event})

        expect(err).toBeFalsy()
        expect(event.returnValues.from).toBe(config.address)
        expect(event.returnValues['2']).toBe(note.uuid)
        done()
      })

      expect.assertions(3)
    })
  }, 600000)

})
