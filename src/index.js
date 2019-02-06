import Web3Orig from 'web3'
import {ProvidersModuleFactory} from 'web3-providers'
import {Zsl} from './web3-zsl/index'

export default class Web3 extends Web3Orig {
  constructor (provider, net, options = {}) {
    super(provider, net, options)
    this.zsl = new Zsl(provider, options)
  }

  /**
   * Returns an object with all public web3 modules
   *
   * @returns {Object}
   */
  static get modules () {
    const providerResolver = new ProvidersModuleFactory().createProviderResolver()
    const methods = super.methods

    methods.Zsl = (provider, options, net) => {
      return new Zsl(providerResolver.resolve(provider, net), options)
    }

    return methods
  }
}
