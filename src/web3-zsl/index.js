import {MethodModuleFactory} from 'web3-core-method'
import {Network} from 'web3-net'
import {ProvidersModuleFactory} from 'web3-providers'
import * as Utils from 'web3-utils'
import {formatters} from 'web3-core-helpers'
import ZslModuleFactory from './factories/ZslModuleFactory'

/**
 * Returns the Personal object
 *
 * @method Personal
 *
 * @param {EthereumProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Accounts} accounts
 * @param {Object} options
 *
 * @returns {Zsl}
 */
export const Zsl = (provider, accounts, options) => {
  return new ZslModuleFactory(Utils, formatters).createZslModule(
    provider,
    new ProvidersModuleFactory(),
    new MethodModuleFactory(accounts),
    new Network(provider, options),
    options,
  )
}
