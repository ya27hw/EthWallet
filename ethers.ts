import { ethers, Wallet } from "ethers";
import { provider_url } from "./db.json";

class Ethers {
  provider: ethers.providers.BaseProvider;
  constructor() {
    this.provider = ethers.getDefaultProvider(provider_url);
  }
}

async () => {
  let myWallet = new ethers.Wallet(
    "0xb871a15331b7f49933852e9b3c7c1b349d314ece9231c260cad6cb049733534f"
  );
  let provider = ethers.getDefaultProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  );
  let walletWithProvider = new ethers.Wallet(myWallet.privateKey, provider);

  let balance = await walletWithProvider.getBalance();

  console.log(ethers.utils.formatEther(balance));

  // Send ether
  let tx = {
    nonce: await provider.getTransactionCount(walletWithProvider.address),
    gasLimit: 21000,
    gasPrice: ethers.utils.parseUnits("10", "gwei"),
    to: "0x53eEC87549a7cD51378fa8e33B2c3fb146cDb135",
    value: ethers.utils.parseEther("0.01"),
    data: "0x",
    chainId: 97,
  };

  let signedTx = await walletWithProvider.signTransaction(tx);
  await provider.sendTransaction(signedTx);
};

export default new Ethers();
