const fs = require("fs");
const starknet = require("starknet");
const { bnToUint256 } = require("starknet/utils/uint256");
const { toBN } = require("starknet/utils/number");

/**
 * @StarnetWallet the connected starknet wallet provided by the @argent/get-starknet package
 * @l2_token the staticAToken address on Starknet
 * @l1_recipient the l1 recipient address
 */

module.exports = async function withdraw(
  StarknetWallet,
  l2_token,
  l1_recipient,
  amount
) {
  try {
    const bridgeContract = starknet.json.parse(
      fs.readFileSync("./contracts/bridge.json").toString("ascii")
    );

    const bridge = new starknet.Contract(
      bridgeContract.abi,
      bridgeContract.address,
      StarknetWallet.account
    );

    const { transaction_hash: withdrawTxHash } = await bridge.initiate_withdraw(
      l2_token,
      l1_recipient,
      bnToUint256(toBN(amount))
    );

    return await defaultProvider.waitForTransaction(withdrawTxHash);
  } catch (err) {
    throw new Error(err.message);
  }
};
