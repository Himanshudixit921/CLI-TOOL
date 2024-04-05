const axios = require("axios");
const generateBitcoinAddress = require("./generateAddress");
async function listTransactionsForWallet(mnemonic) {
  const walletAddress = generateBitcoinAddress(mnemonic);
  try {
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/full`
    );

    const transactions = response.data.txs.map((tx) => {
      const inputsTotal = tx.inputs.reduce(
        (total, input) => total + input.output_value,
        0
      );
      const outputsTotal = tx.outputs.reduce(
        (total, output) => total + output.value,
        0
      );
      const spent = inputsTotal - outputsTotal;

      return {
        timestamp: new Date(tx.received).toLocaleString(),
        type: spent > 0 ? "Withdraw" : "Deposit", // Determine transaction type based on spent amount
        amount: Math.abs(spent) + " Satoshi", // Absolute value of spent amount (either spent or gained)
        senderAddress: tx.inputs[0].addresses[0], // Assuming only one input address
        recipientAddress: tx.outputs[0].addresses[0], // Assuming only one output address
        status: tx.confirmations > 0 ? "Confirmed" : "Unconfirmed", // Determine transaction status based on confirmations
        txID: tx.hash, // Transaction ID
      };
    });

    // Return the list of transactions with relevant details
    return transactions;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = {
  listTransactionsForWallet,
};
