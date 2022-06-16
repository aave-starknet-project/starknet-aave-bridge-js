import BN from "bn.js";

export interface tokenData {
  name: string;
  symbol: string;
  decimals: BN;
  totalSupply: BN;
  last_rewards_index_update: BN;
  current_rewards_index: BN;
}

export interface userInfo {
  balance: BN;
  pending_rewards: BN;
  user_snapshot: BN;
}
