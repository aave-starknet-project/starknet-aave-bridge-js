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
 * @param provider Starknet provider
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
 * @dev this function allows Starknet users to claim their rewards token (rewAAVE token) by holding staticAToken on L2
 * @param Starknet the window object provided by the installed wallet extension
 * @param l2_token the staticAToken address
 * @param recipient of rewards tokens
 */
export async function claimRewards(
  Starknet: IStarknetWindowObject,
  l2_token: string,
  recipient: string
): Promise<GetTransactionStatusResponse> {
  const staticAToken = getStaticATokenContract(l2_token, Starknet.provider);
  staticAToken.connect(Starknet.account);

  const tx = await staticAToken.claim_rewards(number.toBN(recipient));

  await waitForTransaction(tx, Starknet);
  return getTransactionStatus(tx, Starknet);
}
