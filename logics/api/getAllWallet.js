const fs = require("fs");
const filePath = "./wallet.json";
function getAllWallets() {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const wallets = JSON.parse(fileContent);
    return wallets;
  } catch (error) {
    console.error(
      `Error reading wallet data from ${filePath}: ${error.message}`
    );
    return [];
  }
}

module.exports = {
  getAllWallets,
};
