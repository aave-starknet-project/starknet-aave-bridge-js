import { IStarknetWindowObject } from "get-starknet";
import { GetTransactionStatusResponse, number, uint256 } from "starknet";
import { bridge } from "../generated/contracts";
import { getBridgeContract } from "../utils/contracts";
import { getTransactionStatus, waitForTransaction } from "../utils/tx";

/**
 * @dev this function withdraws staticATokens on l2 and bridges them back to their corresponding aTokens on l1
 * @param Starknet the window object provided by the installed wallet extension
 * @param l2Token the staticAToken address
 * @param l1Recipient the recipient of aTokens on L1
 * @param amount to withdraw
 */
export async function withdraw(
  Starknet: IStarknetWindowObject,
  l2Token: string,
  l1Recipient: string,
  amount: string,
  to_underlying_asset: string
): Promise<GetTransactionStatusResponse> {
  const bridgeContract: bridge = getBridgeContract(Starknet.provider);

  const tx = await bridgeContract.initiate_withdraw(
    l2Token,
    l1Recipient,
    uint256.bnToUint256(amount),
    to_underlying_asset
  );

  await waitForTransaction(tx, Starknet);
  return getTransactionStatus(tx, Starknet);
}

/**
 * @dev allows users to bridge their rewAave tokens to l1
 * @param Starknet the window object provided by the installed wallet extension
 * @param l1Recipient the l1 recipient address
 * @param amount to be bridged
 */
export async function bridgeRewards(
  Starknet: IStarknetWindowObject,
  l1Recipient: string,
  amount: string
): Promise<GetTransactionStatusResponse> {
  const bridge = getBridgeContract(Starknet.provider);

  const tx = await bridge.bridge_rewards(
    l1Recipient,
    uint256.bnToUint256(amount)
  );

  await waitForTransaction(tx, Starknet);

  return getTransactionStatus(tx, Starknet);
}
