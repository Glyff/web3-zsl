export declare class Zsl {
  // TODO add methods params and appropriate promise returns
  loadTracker(): Promise<any>
  saveTracker(): Promise<any>
  generateZKeypair(): Promise<any>
  getRandomness(): Promise<string>
  getCommitment(): Promise<string>
  getSendNullifier(): Promise<any>
  getSpendNullifier(): Promise<any>
  createShielding(): Promise<any>
  createUnshielding(): Promise<any>
  createShieldedTransfer(): Promise<any>
  verifyShieldedTransfer(): Promise<any>
  verifyShielding(): Promise<any>
  verifyUnshielding(): Promise<any>
  noteDecrypt(): Promise<any>
}
