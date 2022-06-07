import { getStaticATokenContract } from ".";
import { tokenData, userInfo } from "./utils/types";

/**
 * @param l2_token the staticAToken address on Starknet
 */
export async function getStaticATokenData(
  l2_token: bigint
): Promise<tokenData> {
  try {
    const staticAToken = getStaticATokenContract(l2_token);

    const { totalSupply } = await staticAToken.totalSupply();
    const { blocknumber } = await staticAToken.get_last_update();
    const { rewards_index } = await staticAToken.get_rewards_index();

    return {
      totalSupply: totalSupply,
      last_rewards_index_update: blocknumber,
      current_rewards_index: rewards_index,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 * @param l2_token the staticAToken address on Starknet
 * @param user address
 */
export async function getUserInfo(
  l2_token: bigint,
  user: bigint
): Promise<userInfo> {
  try {
    const staticAToken = getStaticATokenContract(l2_token);

    const { balance } = await staticAToken.balanceOf(user);
    const { user_rewards_index } = await staticAToken.get_user_rewards_index(
      user
    );
    const {
      user_claimable_rewards,
    } = await staticAToken.get_user_claimable_rewards(user);

    return {
      balance: balance,
      pending_rewards: user_claimable_rewards,
      user_snapshot: user_rewards_index,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}
