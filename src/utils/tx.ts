import { IStarknetWindowObject } from "get-starknet";

export async function waitForTransaction(
  transactionHash: string,
  starknetWallet: IStarknetWindowObject
) {
  return await starknetWallet.provider.waitForTransaction(transactionHash);
}

export function getTransactionStatus(
  transactionHash: string,
  starknetWallet: IStarknetWindowObject
) {
  return starknetWallet.provider.getTransactionStatus(transactionHash);
}
