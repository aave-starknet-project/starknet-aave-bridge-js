import { getStaticATokenContract } from ".";
import { tokenData } from "./utils/types";

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
  } catch (err: any) {
    throw new Error(err.message);
  }
}
