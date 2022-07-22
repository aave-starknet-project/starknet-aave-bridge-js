import { IStarknetWindowObject } from "get-starknet";
import { GetTransactionStatusResponse, uint256 } from "starknet";
import { bridge } from "../generated/contracts";
import { getBridgeContract } from "../utils/contracts";
import { getTransactionStatus, waitForTransaction } from "../utils/tx";

/**
 * @dev this function withdraws staticATokens on l2 and bridges them back to their corresponding aTokens on l1
 * @param Starknet the window object provided by the installed wallet extension
 * @param l2_token the staticAToken address
 * @param l1_recipient the recipient of aTokens on L1
 * @param amount to withdraw
 */
export async function withdraw(
  Starknet: IStarknetWindowObject,
  l2_token: string,
  l1_recipient: string,
  amount: string
): Promise<GetTransactionStatusResponse> {
  const bridgeContract: bridge = getBridgeContract(Starknet.provider);

  const tx = await bridgeContract.initiate_withdraw(
    l2_token,
    l1_recipient,
    uint256.bnToUint256(amount)
  );

  await waitForTransaction(tx, Starknet);
  return getTransactionStatus(tx, Starknet);
}

/**
 * @dev allows users to bridge their rewAave tokens to l1
 * @param Starknet the window object provided by the installed wallet extension
 * @param l1_recipient the l1 recipient address
 * @param amount to be bridged
 */
export async function bridgeRewards(
  Starknet: IStarknetWindowObject,
  l1_recipient: string,
  amount: string
): Promise<GetTransactionStatusResponse> {
  const bridge = getBridgeContract(Starknet.provider);

  const tx = await bridge.bridge_rewards(
    l1_recipient,
    uint256.bnToUint256(amount)
  );

  await waitForTransaction(tx, Starknet);

  return getTransactionStatus(tx, Starknet);
}
