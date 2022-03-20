import axios from "axios";

(async () => {
  const data = await axios
    .post("http://localhost:3000/", {operation : "importWallet", mnemonic: "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"})
    .then((res) => res.data);
    console.log(data);
})();
