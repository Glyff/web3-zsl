import Zsl from '../Zsl'
import MethodFactory from './MethodFactory'

export default class ZslModuleFactory {
  /**
   * @param {Utils} utils
   * @param {Object} formatters
   *
   * @constructor
   */
  constructor (utils, formatters) {
    this.utils = utils
    this.formatters = formatters
  }

  /**
   * Returns an object of type Zsl
   *
   * @method createPersonal
   *
   * @param {EthereumProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
   * @param {ProvidersModuleFactory} providersModuleFactory
   * @param {MethodModuleFactory} methodModuleFactory
   * @param {Network} net
   * @param {Object} options
   *
   * @returns {Zsl}
   */
  createZslModule (provider, providersModuleFactory, methodModuleFactory, net, options) {
    return new Zsl(
      provider,
      providersModuleFactory,
      methodModuleFactory,
      this.createMethodFactory(methodModuleFactory),
      options,
    )
  }

  /**
   * Returns an object of type MethodFactory
   *
   * @method createMethodFactory
   *
   * @param {MethodModuleFactory} methodModuleFactory
   *
   * @returns {MethodFactory}
   */
  createMethodFactory (methodModuleFactory) {
    return new MethodFactory(methodModuleFactory, this.utils, this.formatters)
  }
}
