import { starknetBridgeContractAddress } from "./addresses";
import { AccountInterface, Provider } from "starknet";
import { Contract, json } from "starknet";
import fs from "fs";

/**
 * @dev returns bridge contract
 * @param Starknet wallet (supports ArgentX)
 */

export function getBridgeContract(
  wallet?: Provider | AccountInterface
): Contract {
  const bridgeContract = json.parse(
    fs.readFileSync("./src/abis/bridge.json").toString("ascii")
  );
  const bridge = wallet
    ? new Contract(bridgeContract.abi, starknetBridgeContractAddress, wallet)
    : new Contract(bridgeContract.abi, starknetBridgeContractAddress);
  return bridge;
}

/**
 * @dev returns bridge contract
 * @param starknet wallet (provides signer+provider)
 */
export function getStaticATokenContract(
  address: string,
  wallet?: Provider | AccountInterface
): Contract {
  const staticATokenContract = json.parse(
    fs.readFileSync("./src/abis/static_a_token.json").toString("ascii")
  );

  const token = wallet
    ? new Contract(staticATokenContract.abi, address, wallet)
    : new Contract(staticATokenContract.abi, address);
  return token;
}
