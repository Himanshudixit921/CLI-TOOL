const { Command } = require("commander");
const generateBitcoinAddress = require("../logics/api/generateAddress");

const generateAddressCommand = new Command()
  .command("generate-address")
  .argument("<mnemonic>", "BIP39 mnemonic of the wallet")
  .description("Generate an unused Bitcoin address for a wallet")
  .action((mnemonic) => {
    try {
      const bitcoinAddress = generateBitcoinAddress(mnemonic);
      console.log("Unused Bitcoin Address:", bitcoinAddress);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = generateAddressCommand;
