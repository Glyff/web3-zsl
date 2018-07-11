import Web3Orig from 'web3'
import * as t from './types'

declare class Web3 extends Web3Orig {
  zsl: t.Zsl
}

export default Web3
