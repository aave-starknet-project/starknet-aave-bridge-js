const { bnToUint256 } = require("starknet/utils/uint256");
const { toBN } = require("starknet/utils/number");
const { getBridgeContract } = require("./utils/contract");

/**
 * @dev this function withdraws staticATokens on l2 and bridges them back to their corresponding l1 aTokens
 * @param StarnetWallet the connected starknet wallet provided by the @argent/get-starknet package
 * @param l2_token the staticAToken address on Starknet
 * @param l1_recipient the l1 recipient address
 * @param amount to withdraw
 */
module.exports = async function withdraw(
  StarknetWallet,
  l2_token,
  l1_recipient,
  amount
) {
  try {
    const bridge = getBridgeContract(StarknetWallet);

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

/**
 * @dev function called to redeem the rewards Aave token on l2 against the rewards tokens on l1
 * @param StarnetWallet the connected starknet wallet provided by the @argent/get-starknet package
 * @param l1_recipient the l1 recipient address
 * @param amount to bridge
 */
module.exports = async function bridgeRewards(
  StarknetWallet,
  l1_recipient,
  amount
) {
  try {
    const bridge = getBridgeContract(StarknetWallet);

    const { transaction_hash: bridgeRewardsTxHash } =
      await bridge.bridge_rewards(l1_recipient, bnToUint256(toBN(amount)));

    return await defaultProvider.waitForTransaction(bridgeRewardsTxHash);
  } catch (err) {
    throw new Error(err.message);
  }
};
