const { Command } = require("commander");
const readline = require("readline");
const { importWalletFromMnemonic } = require("../logics/api/importWallet");
const { saveWalletToFile } = require("../logics/saveWallet");

const importWalletCommand = new Command()
  .command("import-wallet")
  .option(
    "-m, --mnemonic <mnemonic>",
    "BIP39 mnemonic for importing the wallet"
  )
  .option("-n, --name <name>", "Name of the wallet being imported")
  .description("Import a wallet using a BIP39 mnemonic")
  .action(({ mnemonic, name }) => {
    if (!mnemonic) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        "Enter the name of the wallet being imported: ",
        (inputName) => {
          name = inputName;

          rl.question(
            "Enter the BIP39 mnemonic to import the wallet: ",
            (inputMnemonic) => {
              rl.close();

              try {
                const wallet = importWalletFromMnemonic(inputMnemonic, name);
                saveWalletToFile(wallet, "wallet.json");
              } catch (error) {
                throw new Error(error.message);
              }
            }
          );
        }
      );
    } else {
      try {
        const wallet = importWalletFromMnemonic(mnemonic, name);
        saveWalletToFile(wallet, "wallet.json");
      } catch (error) {
        throw new Error(error.message);
      }
    }
  });

module.exports = importWalletCommand;
