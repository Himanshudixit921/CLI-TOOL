const axios = require("axios");
const generateBitcoinAddress = require("./generateAddress");

async function getTestnetBalance(mnemonic) {
  const address = generateBitcoinAddress(mnemonic);

  try {
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`
    );

    return {
      address: address,
      balance: response.data.final_balance,
    };
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = {
  getTestnetBalance,
};
