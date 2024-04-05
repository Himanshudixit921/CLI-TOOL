const { Command } = require("commander");
const { getTestnetBalance } = require("../logics/api/getBalance");
const bip39 = require("bip39");
const checkBalanceCommand = new Command()
  .command("check-balance")
  .argument("<mnemonic>")
  .description(
    "Check the balance of a Bitcoin testnet address generated from a mnemonic."
  )
  .action(async (mnemonic) => {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error("Invalid Mnemonic ! try wrapping string in quotes");
    }
    try {
      const result = await getTestnetBalance(mnemonic);

      console.log("Address:", result.address);
      console.log("Balance:", result.balance);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  });

module.exports = checkBalanceCommand;
