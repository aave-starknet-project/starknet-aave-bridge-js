import type {
  Contract,
  Overrides,
  AddTransactionResponse,
  Invocation,
  EstimateFeeResponse,
} from "starknet";
import type { BigNumberish } from "starknet/utils/number";
import type BN from "bn.js";
import type { BlockIdentifier } from "starknet/provider/utils";

export type Uint256 = { low: BigNumberish; high: BigNumberish };
export type Uint256Output = { low: BN; high: BN };

export interface bridge extends Contract {
  get_governor(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BN] & { res: BN }>;
  get_l1_bridge(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BN] & { res: BN }>;
  initialize_bridge(
    governor_address: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  set_l1_bridge(
    l1_bridge_address: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  set_reward_token(
    reward_token: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  approve_bridge(
    l1_token: BigNumberish,
    l2_token: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  initiate_withdraw(
    l2_token: BigNumberish,
    l1_recipient: BigNumberish,
    amount: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  bridge_rewards(
    l1_recipient: BigNumberish,
    amount: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  mint_rewards(
    recipient: BigNumberish,
    amount: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  functions: {
    get_governor(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BN] & { res: BN }>;
    get_l1_bridge(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BN] & { res: BN }>;
    initialize_bridge(
      governor_address: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    set_l1_bridge(
      l1_bridge_address: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    set_reward_token(
      reward_token: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    approve_bridge(
      l1_token: BigNumberish,
      l2_token: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    initiate_withdraw(
      l2_token: BigNumberish,
      l1_recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    bridge_rewards(
      l1_recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    mint_rewards(
      recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
  };
  callStatic: {
    get_governor(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BN] & { res: BN }>;
    get_l1_bridge(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BN] & { res: BN }>;
    initialize_bridge(
      governor_address: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    set_l1_bridge(
      l1_bridge_address: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    set_reward_token(
      reward_token: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    approve_bridge(
      l1_token: BigNumberish,
      l2_token: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    initiate_withdraw(
      l2_token: BigNumberish,
      l1_recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    bridge_rewards(
      l1_recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    mint_rewards(
      recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
  };
  populateTransaction: {
    get_governor(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    get_l1_bridge(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    initialize_bridge(
      governor_address: BigNumberish,
      options?: Overrides
    ): Invocation;
    set_l1_bridge(
      l1_bridge_address: BigNumberish,
      options?: Overrides
    ): Invocation;
    set_reward_token(
      reward_token: BigNumberish,
      options?: Overrides
    ): Invocation;
    approve_bridge(
      l1_token: BigNumberish,
      l2_token: BigNumberish,
      options?: Overrides
    ): Invocation;
    initiate_withdraw(
      l2_token: BigNumberish,
      l1_recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Invocation;
    bridge_rewards(
      l1_recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Invocation;
    mint_rewards(
      recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Invocation;
  };
  estimateFee: {
    get_governor(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    get_l1_bridge(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    initialize_bridge(
      governor_address: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    set_l1_bridge(
      l1_bridge_address: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    set_reward_token(
      reward_token: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    approve_bridge(
      l1_token: BigNumberish,
      l2_token: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    initiate_withdraw(
      l2_token: BigNumberish,
      l1_recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    bridge_rewards(
      l1_recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    mint_rewards(
      recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
  };
}
