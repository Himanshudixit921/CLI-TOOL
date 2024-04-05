const { Command } = require("commander");

const createWalletCommand = require("./commands/createWallet");
const importWalletCommand = require("./commands/importWallet");
const listWalletsCommand = require("./commands/listWallet");
const checkBalanceCommand = require("./commands/checkBalanceCommand");
const listTransaction = require("./commands/listTransactionCommand");
const generateAddressCommand = require("./commands/generateAddressCommand");
const program = new Command();
function errorColor(str) {
  return `\x1b[31m${str}\x1b[0m`;
}

program.addCommand(createWalletCommand);
program.addCommand(importWalletCommand);
program.addCommand(listWalletsCommand);
program.addCommand(checkBalanceCommand);
program.addCommand(listTransaction);
program.addCommand(generateAddressCommand);
program.exitOverride();
try {
  program.parse(process.argv);
} catch (err) {
  console.log(errorColor(err.message));
}
