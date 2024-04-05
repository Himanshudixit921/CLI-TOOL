const { Command } = require("commander");
const {
  generateMnemonic,
  createWalletFromMnemonic,
} = require("../logics/api/createWallet");
const { saveWalletToFile } = require("../logics/saveWallet");
const createWalletCommand = new Command()
  .command("create-wallet")
  .argument("<name>", "name of the wallet ")
  .description("Generate a BIP39 wallet")
  .action((name) => {
    const mnemonic = generateMnemonic();
    const wallet = createWalletFromMnemonic(mnemonic, name);
    try {
      saveWalletToFile(wallet, "wallet.json");
    } catch (error) {
      throw new Error(error.message);
    }
  });
module.exports = createWalletCommand;
