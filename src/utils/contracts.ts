import bridge from "../abis/bridge.json";
import staticAToken from "../abis/staticAToken.json";
import { starknetBridgeContractAddress } from "./addresses";
import { Abi, AccountInterface, Provider, Contract } from "starknet";

/**
 * @dev returns bridge contract
 * @param Starknet wallet
 */

export function getBridgeContract(
  wallet?: Provider | AccountInterface
): Contract {
  return new Contract(<Abi>bridge.abi, starknetBridgeContractAddress, wallet);
}

/**
 * @param address token address
 * @param wallet The starknet wallet (optional)
 */
export function getStaticATokenContract(
  address: string,
  wallet?: Provider | AccountInterface
): Contract {
  return new Contract(<Abi>staticAToken.abi, address, wallet);
}
