const bip39 = require("bip39");
const generateBitcoinAddress = require("./generateAddress");
function generateMnemonic() {
  return bip39.generateMnemonic();
}

function createWalletFromMnemonic(mnemonic, name = "MyWallet") {
  const address = generateBitcoinAddress(mnemonic);
  return {
    name: name,
    mnemonic: mnemonic,
    address: address,
  };
}

module.exports = {
  generateMnemonic,
  createWalletFromMnemonic,
};
