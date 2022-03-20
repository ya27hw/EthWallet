import { ethers } from "ethers";
import e from "../ethers";

module.exports = {
  data: {
    name: "createWallet",
    description: "Create a new wallet",
  },
  execute(body : Object) {
    let randomWallet = ethers.Wallet.createRandom();
    let walletWithProvider = new ethers.Wallet(
      randomWallet.privateKey,
      e.provider
    );
    console.log("Address: " + walletWithProvider.address);
    console.log("Private key: " + walletWithProvider.privateKey);
    return {
      address: walletWithProvider.address,
      privateKey: walletWithProvider.privateKey,
    }
  },
};
