import {AbstractMethod, AbstractMethodFactory, GetGasPriceMethod, GetTransactionCountMethod, VersionMethod} from 'web3-core-method'

class AbstractCallMethod extends AbstractMethod {
  constructor (rpcMethod, parametersAmount, utils, formatters$$1) {
    super(rpcMethod, parametersAmount, utils, formatters$$1)
  }

  static get Type () {
    return 'CALL'
  }

  async execute (moduleInstance) {
    this.beforeExecution(moduleInstance)
    if (this.parameters.length !== this.parametersAmount) {
      throw new Error(`Invalid Arguments length: expected: ${this.parametersAmount}, given: ${this.parameters.length}`)
    }
    try {
      const response = await moduleInstance.currentProvider.send(this.rpcMethod, this.parameters)
      const mappedResponse = this.afterExecution(response)
      if (this.callback) {
        this.callback(false, mappedResponse)
      }
      return mappedResponse
    } catch (error) {
      if (this.callback) {
        this.callback(error, null)
      }
      throw error
    }
  }
}

class LoadTracker extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_loadTracker', 1, utils, formatters)
  }
}

class SaveTracker extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_saveTracker', 2, utils, formatters)
  }
}

class GenerateZKeypair extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_generateZKeypair', 0, utils, formatters)
  }
}

class GetRandomness extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_getRandomness', 0, utils, formatters)
  }
}

class GetCommitment extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_getCommitment', 3, utils, formatters)
  }
}

class GetSendNullifier extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_getSendNullifier', 1, utils, formatters)
  }
}

class GetSpendNullifier extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_getSpendNullifier', 2, utils, formatters)
  }
}

class CreateShielding extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_createShielding', 3, utils, formatters)
  }
}

class CreateUnshielding extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_createUnshielding', 6, utils, formatters)
  }
}

class CreateShieldedTransfer extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_createShieldedTransfer', 16, utils, formatters)
  }
}

class VerifyShieldedTransfer extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_verifyShieldedTransfer', 8, utils, formatters)
  }
}

class VerifyShielding extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_verifyShielding', 4, utils, formatters)
  }
}

class VerifyUnshielding extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_verifyUnshielding', 5, utils, formatters)
  }
}

class NoteDecrypt extends AbstractCallMethod {
  constructor (utils, formatters) {
    super('zsl_noteDecrypt', 2, utils, formatters)
  }
}

export default class MethodFactory extends AbstractMethodFactory {
  /**
   * @param {MethodModuleFactory} methodModuleFactory
   * @param {Utils} utils
   * @param {Object} formatters
   *
   * @constructor
   */
  constructor (methodModuleFactory, utils, formatters) {
    super(methodModuleFactory, utils, formatters)

    this.methods = {
      loadTracker: LoadTracker,
      saveTracker: SaveTracker,
      generateZKeypair: GenerateZKeypair,
      getRandomness: GetRandomness,
      getCommitment: GetCommitment,
      getSendNullifier: GetSendNullifier,
      getSpendNullifier: GetSpendNullifier,
      createShielding: CreateShielding,
      createUnshielding: CreateUnshielding,
      createShieldedTransfer: CreateShieldedTransfer,
      verifyShieldedTransfer: VerifyShieldedTransfer,
      verifyShielding: VerifyShielding,
      verifyUnshielding: VerifyUnshielding,
      noteDecrypt: NoteDecrypt,
    }
  }
}
