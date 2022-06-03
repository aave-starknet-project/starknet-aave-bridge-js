const fs = require("fs");
const starknet = require("starknet");

const getBridgeContract = async function getContract(wallet) {
  try {
    const bridgeContract = starknet.json.parse(
      fs.readFileSync("./contracts/bridge.json").toString("ascii")
    );

    return new starknet.Contract(
      bridgeContract.abi,
      bridgeContract.address,
      wallet.account
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getBridgeContract };
