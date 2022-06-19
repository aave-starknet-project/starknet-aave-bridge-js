import { getBridgeContract } from "./utils/contracts";
import { toBN } from "starknet/utils/number";
import { bnToUint256 } from "starknet/utils/uint256";
import { IStarknetWindowObject } from "get-starknet";
import { GetTransactionStatusResponse } from "starknet";

/**
 * @dev this function withdraws staticATokens on l2 and bridges them back to l1
 * @param StarnetWallet the connected starknet wallet provided by the get-starknet package
 * @param l2_token the staticAToken address on Starknet
 * @param l1_recipient the l1 recipient address
 * @param amount to withdraw
 */
export async function withdraw(
  StarknetWallet: IStarknetWindowObject,
  l2_token: bigint,
  l1_recipient: string,
  amount: string
): Promise<GetTransactionStatusResponse> {
  const bridge = getBridgeContract(StarknetWallet.account);

  const { transaction_hash: withdrawTxHash } = await bridge.initiate_withdraw(
    l2_token,
    l1_recipient,
    bnToUint256(toBN(amount))
  );

  await StarknetWallet.provider.waitForTransaction(withdrawTxHash);
  return StarknetWallet.provider.getTransactionStatus(withdrawTxHash);
}

/**
 * @dev allows users to bridge their rewAave tokens to l1
 * @param StarnetWallet the connected starknet wallet provided by the get-starknet package
 * @param l1_recipient the l1 recipient address
 * @param amount to be bridged
 */
export async function bridgeRewards(
  StarknetWallet: IStarknetWindowObject,
  l1_recipient: string,
  amount: string
): Promise<GetTransactionStatusResponse> {
  const bridge = getBridgeContract(StarknetWallet.account);

  const { transaction_hash: bridgeRewardsTxHash } = await bridge.bridge_rewards(
    l1_recipient,
    bnToUint256(toBN(amount))
  );

  await StarknetWallet.provider.waitForTransaction(bridgeRewardsTxHash);

  return StarknetWallet.provider.getTransactionStatus(bridgeRewardsTxHash);
}
