"use strict"

var core = require('web3-core')
var Method = require('web3-core-method')

var Zsl = function Zsl() {
  var _this = this

  // sets _requestmanager
  core.packageInit(this, arguments);

  [
    new Method({
      name: 'loadTracker',
      call: 'zsl_loadTracker',
      params: 1,
      inputFormatter: [null],
    }),
    new Method({
      name: 'saveTracker',
      call: 'zsl_saveTracker',
      params: 2,
    }),
    new Method({
      name: 'generateZKeypair',
      call: 'zsl_generateZKeypair',
      params: 0,
    }),
    new Method({
      name: 'getRandomness',
      call: 'zsl_getRandomness',
      params: 0,
    }),
    new Method({
      name: 'getCommitment',
      call: 'zsl_getCommitment',
      params: 3,
    }),
    new Method({
      name: 'getSendNullifier',
      call: 'zsl_getSendNullifier',
      params: 1,
    }),
    new Method({
      name: 'getSpendNullifier',
      call: 'zsl_getSpendNullifier',
      params: 2,
    }),
    new Method({
      name: 'createShielding',
      call: 'zsl_createShielding',
      params: 3,
    }),
    new Method({
      name: 'createUnshielding',
      call: 'zsl_createUnshielding',
      params: 5,
    }),
    new Method({
      name: 'createShieldedTransfer',
      call: 'zsl_createShieldedTransfer',
      params: 16,
    }),
    new Method({
      name: 'verifyShieldedTransfer',
      call: 'zsl_verifyShieldedTransfer',
      params: 8,
    }),
    new Method({
      name: 'verifyShielding',
      call: 'zsl_verifyShielding',
      params: 4,
    }),
    new Method({
      name: 'verifyUnshielding',
      call: 'zsl_verifyUnshielding',
      params: 4,
    }),
    new Method({
      name: 'noteDecrypt',
      call: 'zsl_noteDecrypt',
      params: 2,
    }),
  ].forEach(function (method) {
    method.attachToObject(_this)
    method.setRequestManager(_this._requestManager)
  })
}

core.addProviders(Zsl)

module.exports = Zsl
