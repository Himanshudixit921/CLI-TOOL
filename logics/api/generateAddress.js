const bip39 = require("bip39");
const HDKey = require("hdkey");
const bitcoin = require("bitcoinjs-lib");

function generateBitcoinAddress(mnemonic) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = HDKey.fromMasterSeed(seed);

  const network = bitcoin.networks.testnet;
  const child = root.derive("m/44'/1'/0'/0/0");
  const { address } = bitcoin.payments.p2pkh({
    pubkey: child.publicKey,
    network,
  });

  return address;
}

module.exports = generateBitcoinAddress;
