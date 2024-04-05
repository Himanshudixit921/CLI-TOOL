const { Command } = require("commander");
const { getAllWallets } = require("../logics/api/getAllWallet");

const listWalletsCommand = new Command()
  .command("list-wallets")
  .description("List all wallets")
  .action(() => {
    try {
      const wallets = getAllWallets();
      if (wallets.length === 0) {
        throw new Error("No wallets Found");
      } else {
        console.log("List of wallets:");
        wallets.forEach((wallet, index) => {
          console.log(
            `${index + 1}. Name: ${wallet.name}  Address: ${wallet.address}`
          );
        });
      }
    } catch (error) {
      throw new Error("Error listing wallets");
    }
  });

module.exports = listWalletsCommand;
