import { tokenData, userInfo } from "../utils/types";
import { IStarknetWindowObject } from "get-starknet";
import {
  GetTransactionStatusResponse,
  shortString,
  number,
  uint256,
  Provider,
} from "starknet";
import { getTransactionStatus, waitForTransaction } from "../utils/tx";
import { getStaticATokenContract } from "../utils/contracts";

/**
 * @param l2_token the staticAToken address on Starknet
 * @param provider (if no provider was provided will default to Aplha)
 */
export async function getStaticATokenData(
  l2_token: string,
  provider: Provider
): Promise<tokenData> {
  const staticAToken = getStaticATokenContract(l2_token, provider);
  const data = await Promise.all([
    staticAToken.totalSupply(),
    staticAToken.get_last_update(),
    staticAToken.get_rewards_index(),
    staticAToken.name(),
    staticAToken.symbol(),
    staticAToken.decimals(),
  ]);
  return {
    totalSupply: uint256.uint256ToBN(data[0].totalSupply),
    last_rewards_index_update: uint256.uint256ToBN(data[1].block_number),
    current_rewards_index: uint256.uint256ToBN(data[2].rewards_index.wad), //returns index in wad
    name: shortString.decodeShortString(number.toHex(data[3].name)),
    symbol: shortString.decodeShortString(number.toHex(data[4].symbol)),
    decimals: data[5].decimals,
  };
}

/**
 * @param l2_token the staticAToken address on Starknet
 * @param user address
 * @param provider
 */
export async function getUserInfo(
  l2_token: string,
  user: string,
  provider: Provider
): Promise<userInfo> {
  const staticAToken = getStaticATokenContract(l2_token, provider);

  const data = await Promise.all([
    staticAToken.balanceOf(user),
    staticAToken.get_user_rewards_index(user),
    staticAToken.get_user_claimable_rewards(user),
  ]);
  return {
    balance: uint256.uint256ToBN(data[0].balance),
    user_snapshot: uint256.uint256ToBN(data[1].user_rewards_index),
    pending_rewards: uint256.uint256ToBN(data[2].user_claimable_rewards),
  };
}

/**
 * @dev this function withdraws staticATokens on l2 and bridges them back to their corresponding l1 aTokens
 * @param StarknetWallet the connected starknet wallet provided by the get-starknet package
 * @param l2_token the staticAToken address on Starknet
 * @param recipient of rewards tokens
 * @param amount to withdraw
 */
export async function claimRewards(
  StarknetWallet: IStarknetWindowObject,
  l2_token: string,
  recipient: string
): Promise<GetTransactionStatusResponse> {
  const staticAToken = getStaticATokenContract(
    l2_token,
    StarknetWallet.provider
  );
  staticAToken.connect(StarknetWallet.account);

  const { transaction_hash: claimTxHash } = await staticAToken.claim_rewards(
    number.toBN(recipient)
  );

  await waitForTransaction(claimTxHash, StarknetWallet);
  return getTransactionStatus(claimTxHash, StarknetWallet);
}

/**
 * @dev this function allows anyone to push
 * @param StarknetWallet the connected starknet wallet provided by the get-starknet package
 * @param rewards index
 */
export async function updateRewardsIndex(
  StarknetWallet: IStarknetWindowObject,
  l2_token: string,
  blockNumber: string,
  index: string
): Promise<GetTransactionStatusResponse> {
  const staticAToken = getStaticATokenContract(
    l2_token,
    StarknetWallet.provider
  );

  staticAToken.connect(StarknetWallet.account);

  const {
    transaction_hash: pushRewardsIndexTxHash,
  } = await staticAToken.push_rewards_index(uint256.bnToUint256(blockNumber), {
    wad: uint256.bnToUint256(index),
  });

  await waitForTransaction(pushRewardsIndexTxHash, StarknetWallet);
  return getTransactionStatus(pushRewardsIndexTxHash, StarknetWallet);
}
