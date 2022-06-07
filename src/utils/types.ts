import BN from "bn.js";
export type BigNumberish = string | number | BN;

export interface Uint256 {
  low: BigNumberish;
  high: BigNumberish;
}

export interface tokenData {
  totalSupply: Uint256;
  last_rewards_index_update: Uint256;
  current_rewards_index: Uint256;
}

export interface userInfo {
  balance: Uint256;
  pending_rewards: Uint256;
  user_snapshot: Uint256;
}
