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
  const abi: Abi = <Abi>bridge_abi.abi;
  const bridgeContract: bridge = loadContract(
    abi,
    starknetBridgeContractAddress,
    provider
  );

  return bridgeContract;
}

export function getStaticATokenContract(
  address: string,
  provider: Provider
): staticAToken {
  const abi: Abi = <Abi>staticAToken_abi.abi;
  const staticATokenContract: staticAToken = loadContract(
    abi,
    address,
    provider
  );

  return staticATokenContract;
}
