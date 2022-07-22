import { IStarknetWindowObject } from "get-starknet";
import { AddTransactionResponse } from "starknet";

export async function waitForTransaction(
  transaction: AddTransactionResponse,
  starknetWallet: IStarknetWindowObject
) {
  return await starknetWallet.provider.waitForTransaction(
    transaction.transaction_hash
  );
}

export function getTransactionStatus(
  transaction: AddTransactionResponse,
  starknetWallet: IStarknetWindowObject
) {
  return starknetWallet.provider.getTransactionStatus(
    transaction.transaction_hash
  );
}
