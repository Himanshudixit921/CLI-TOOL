const bip39 = require("bip39");
const generateBitcoinAddress = require("./generateAddress");
function importWalletFromMnemonic(mnemonic, name = "ImportedWallet") {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error(
      "Invalid BIP39 mnemonic ! Try entering mnemonic in string inside double quotes"
    );
  }

  const address = generateBitcoinAddress(mnemonic);
  return {
    name: name || "fakeWallet",
    mnemonic: mnemonic,
    address: address,
  };
}

module.exports = { importWalletFromMnemonic };
