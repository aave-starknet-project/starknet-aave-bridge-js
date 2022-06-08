import { starknetBridgeContractAddress } from "./addresses";
import { AccountInterface, Provider } from "starknet";
import { Contract, json } from "starknet";
import fs from "fs";

export function getBridgeContract(
  wallet?: Provider | AccountInterface
): Contract {
  const bridgeContract = json.parse(
    fs.readFileSync("./abis/bridge.json").toString("ascii")
  );
  const bridge = wallet
    ? new Contract(bridgeContract.abi, starknetBridgeContractAddress, wallet)
    : new Contract(bridgeContract.abi, starknetBridgeContractAddress);
  return bridge;
}

export function getStaticATokenContract(
  address: string,
  provider?: Provider
): Contract {
  const staticATokenContract = json.parse(
    fs.readFileSync("./abis/static_a_token.json").toString("ascii")
  );

  const token = provider
    ? new Contract(staticATokenContract.abi, address, provider)
    : new Contract(staticATokenContract.abi, address);
  return token;
}
