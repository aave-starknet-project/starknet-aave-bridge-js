import { starknetBridgeContractAddress } from "./addresses";
import { Abi, Provider, Contract } from "starknet";
import { bridge, staticAToken } from "../generated/contracts";
import bridge_abi from "../abis/bridge_abi.json";
import staticAToken_abi from "../abis/staticAToken_abi.json";

function loadContract<C extends Contract>(
  abi: Abi,
  address: string,
  provider: Provider
): C {
  return new Contract(abi, address, provider) as C;
}

export function getBridgeContract(provider: Provider): bridge {
  const bridgeContract: bridge = loadContract(
    <Abi>bridge_abi.abi,
    starknetBridgeContractAddress,
    provider
  );

  return bridgeContract;
}

export function getStaticATokenContract(
  address: string,
  provider: Provider
): staticAToken {
  const staticATokenContract: staticAToken = loadContract(
    <Abi>staticAToken_abi.abi,
    address,
    provider
  );

  return staticATokenContract;
}
