const fs = require("fs");
function saveWalletToFile(walletData, filePath) {
  try {
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      existingData = JSON.parse(fileContent);
      if (!Array.isArray(existingData)) {
        throw new Error("Existing data is not an array");
      }
    }

    const existingWallet = existingData.find(
      (wallet) => wallet.name === walletData.name
    );
    if (existingWallet) {
      throw new Error(
        `A wallet with the name "${walletData.name}" already exists. Create wallet with a unique name.`
      );
    }

    existingData.push(walletData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log(`Wallet data saved to ${filePath}`);
  } catch (error) {
    throw new Error(`Wallet of name ${walletData.name} already exists`);
  }
}
module.exports = {
  saveWalletToFile,
};
