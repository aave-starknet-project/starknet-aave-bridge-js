import { toHex } from "starknet/dist/utils/number";
import { Provider } from "starknet";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { getStaticATokenContract } from ".";
import { tokenData, userInfo } from "./utils/types";
import { IStarknetWindowObject } from "get-starknet";
import { GetTransactionStatusResponse } from "starknet";
import { decodeShortString } from "starknet/dist/utils/shortString";

/**
 * @param l2_token the staticAToken address on Starknet
 * @param provider (if no provider was provided will default to Aplha)
 */
export async function getStaticATokenData(
  l2_token: string,
  provider?: Provider
): Promise<tokenData> {
  const staticAToken = getStaticATokenContract(l2_token, provider);

  const { totalSupply } = await staticAToken.totalSupply();
  const { blocknumber } = await staticAToken.get_last_update();
  const { rewards_index } = await staticAToken.get_rewards_index();
  const { name } = await staticAToken.name();
  const { symbol } = await staticAToken.symbol();
  const { decimals } = await staticAToken.decimals();

  return {
    name: decodeShortString(toHex(name)),
    symbol: decodeShortString(toHex(symbol)),
    decimals: decimals,
    totalSupply: uint256ToBN(totalSupply),
    last_rewards_index_update: uint256ToBN(blocknumber),
    current_rewards_index: uint256ToBN(rewards_index),
  };
}

/**
 * @param l2_token the staticAToken address on Starknet
 * @param user address
 * @param provider (if no provider was provided will default to Aplha)
 */
export async function getUserInfo(
  l2_token: string,
  user: bigint,
  provider?: Provider
): Promise<userInfo> {
  const staticAToken = getStaticATokenContract(l2_token, provider);

  const { balance } = await staticAToken.balanceOf(user);
  const { user_rewards_index } = await staticAToken.get_user_rewards_index(
    user
  );
  const {
    user_claimable_rewards,
  } = await staticAToken.get_user_claimable_rewards(user);

  return {
    balance: uint256ToBN(balance),
    pending_rewards: uint256ToBN(user_claimable_rewards),
    user_snapshot: uint256ToBN(user_rewards_index),
  };
}

/**
 * @dev this function withdraws staticATokens on l2 and bridges them back to their corresponding l1 aTokens
 * @param StarnetWallet the connected starknet wallet provided by the @argent/get-starknet package
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
    StarknetWallet.account
  );

  const { transaction_hash: claimTxHash } = await staticAToken.claim_rewards(
    BigInt(recipient)
  );

  await StarknetWallet.provider.waitForTransaction(claimTxHash);
  return StarknetWallet.provider.getTransactionStatus(claimTxHash);
}

/**
 * @dev this function allows anyone to push
 * @param StarnetWallet the connected starknet wallet provided by the @argent/get-starknet package
 * @param rewards index
 */
export async function updateRewardsIndex(
  StarknetWallet: IStarknetWindowObject,
  l2_token: string,
  recipient: string
): Promise<GetTransactionStatusResponse> {
  const staticAToken = getStaticATokenContract(
    l2_token,
    StarknetWallet.account
  );

  const { transaction_hash: claimTxHash } = await staticAToken.claim_rewards(
    BigInt(recipient)
  );

  await StarknetWallet.provider.waitForTransaction(claimTxHash);
  return StarknetWallet.provider.getTransactionStatus(claimTxHash);
}
