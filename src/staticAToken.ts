import { uint256ToBN } from "starknet/dist/utils/uint256";
import { getStaticATokenContract } from ".";
import { tokenData, userInfo } from "./utils/types";

/**
 * @param l2_token the staticAToken address on Starknet
 */
export async function getStaticATokenData(
  l2_token: string
): Promise<tokenData> {
  const staticAToken = getStaticATokenContract(l2_token);

  const { totalSupply } = await staticAToken.totalSupply();
  const { blocknumber } = await staticAToken.get_last_update();
  const { rewards_index } = await staticAToken.get_rewards_index();

  return {
    totalSupply: uint256ToBN(totalSupply),
    last_rewards_index_update: uint256ToBN(blocknumber),
    current_rewards_index: uint256ToBN(rewards_index),
  };
}

/**
 * @param l2_token the staticAToken address on Starknet
 * @param user address
 */
export async function getUserInfo(
  l2_token: string,
  user: bigint
): Promise<userInfo> {
  const staticAToken = getStaticATokenContract(l2_token);

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
