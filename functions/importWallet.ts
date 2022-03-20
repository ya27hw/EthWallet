import { ethers } from "ethers";
import e from "../ethers";

module.exports = {
  data: {
    name: "importWallet",
    description: "Import an existing wallet",
  },
  execute(body: any) {
    const mnemonic = body["mnemonic"];
    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    return {
      address: mnemonicWallet.address,
      privateKey: mnemonicWallet.privateKey,
    };
  },
};
