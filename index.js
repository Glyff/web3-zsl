"use strict"

var version = require('web3/package.json').version
var core = require('web3-core')
var Eth = require('web3-eth')
var Net = require('web3-net')
var Personal = require('web3-eth-personal')
var Shh = require('web3-shh')
var Bzz = require('web3-bzz')
var utils = require('web3-utils')
var Zsl = require('./lib/zsl')

var Web3 = function Web3 () {
  var _this = this

  // sets _requestmanager etc
  core.packageInit(this, arguments)

  this.version = version
  this.utils = utils

  this.eth = new Eth(this)
  this.shh = new Shh(this)
  this.bzz = new Bzz(this)
  this.zsl = new Zsl(this)

  // overwrite package setProvider
  var setProvider = this.setProvider
  this.setProvider = function (provider, net) {
    setProvider.apply(_this, arguments)

    this.eth.setProvider(provider, net)
    this.shh.setProvider(provider, net)
    this.bzz.setProvider(provider)
    this.zsl.setProvider(provider, net)

    return true
  }
}

Web3.version = version
Web3.utils = utils
Web3.modules = {
  Eth: Eth,
  Net: Net,
  Personal: Personal,
  Shh: Shh,
  Bzz: Bzz,
  Zsl: Zsl,
}

core.addProviders(Web3)

module.exports = Web3
