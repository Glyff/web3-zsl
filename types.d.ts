interface ZKeypair {
  a_sk: string,
  a_pk: string,
  viewingKey_skenc: string,
  publicKey_pkenc: string,
  zaddr: string,
}

interface Shielding {
  proof: string,
  cm: string,
  send_nf: string,
}

interface Unshielding {
  proof: string,
  send_nf: string,
  spend_nf: string,
}

interface ShieldedTransfer {
  proof: string,
  out_send_nf_1: string,
  out_send_nf_2: string,
  in_spend_nf_1: string,
  in_spend_nf_2: string,
  out_cm_1: string,
  out_cm_2: string,
  out_pk_1: string,
  out_pkenc_1: string,
  message: string,
  ciphertext: string,
  epk: string,
  blob: string,
}

interface DecrytpedNote {
  cleartext: string,
  out_rho_1: string,
  value: string,
}

export declare class Zsl {
  // TODO add methods params and appropriate promise returns
  loadTracker(filename: string): Promise<string>
  saveTracker(filename: string, data: string): Promise<void>
  generateZKeypair(): Promise<ZKeypair>
  getRandomness(): Promise<string>
  getCommitment(rho: string, pk: string, value: Number): Promise<string>
  getSendNullifier(rho: string): Promise<string>
  getSpendNullifier(rho: string, sk: string): Promise<string>
  createShielding(rho: string, pk: string, value: Number): Promise<Shielding>
  createUnshielding(rho: string, sk: string, value: Number, treeIndex: string, authPath: string): Promise<Unshielding>
  createShieldedTransfer(
    hro_1: string, sk_1: string, value_1: Number, treeIndex_1: Number, authPath_1: string,
    hro_2: string, sk_2: string, value_2: Number, treeIndex_2: Number, authPath_2: string,
    out_rho_1: string, zaddr: string, out_value_1: Number,
    out_rho_2: string, out_pk_2: string, out_value_2: Number
  ): Promise<ShieldedTransfer>
  verifyShieldedTransfer(
    proof: string, anchor: string, spend_nf_1: string, spend_nf_2: string,
    send_nf_1: string, send_nf_2: string, cm_1: string, cm_2: string
  ): Promise<boolean>
  verifyShielding(proof: string, send_nf: string, cm: string, value: Number): Promise<boolean>
  verifyUnshielding(proof: string, spend_nf: string, rt: string, value: Number): Promise<boolean>
  noteDecrypt(a_sk: string, blob: string): Promise<DecrytpedNote>
}
