const { Command } = require("commander");
const bip39 = require("bip39");
const { listTransactionsForWallet } = require("../logics/api/listTransaction");

const listTransaction = new Command()
  .command("list-transactions")
  .argument("<mnemonic>", "BIP39 mnemonic of the wallet")
  .description("List Bitcoin transactions associated with a wallet")
  .action(async (mnemonic) => {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error("Invalid Mnemonic ! try wrapping string in quotes");
    }
    try {
      const transactions = await listTransactionsForWallet(mnemonic);
      if (transactions.length === 0) {
        console.log("No transactions.");
      } else {
        transactions.forEach((transaction, index) => {
          console.log(`${index + 1}.`);
          console.log("Timestamp:", transaction.timestamp);
          console.log("Type:", transaction.type);
          console.log("Amount:", transaction.amount);
          console.log("Sender Address:", transaction.senderAddress);
          console.log("Recipient Address:", transaction.recipientAddress);
          console.log("Status:", transaction.status);
          console.log("TxID:", transaction.txID);
          console.log("");
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = listTransaction;
