import { starknetBridgeContractAddress } from "./addresses";
import { IStarknetWindowObject } from "get-starknet";
import fs from "fs";

import { Contract, json } from "starknet";

export function getBridgeContract(wallet: IStarknetWindowObject): Contract {
  try {
    const bridgeContract = json.parse(
      fs.readFileSync("./contracts/bridge.json").toString("ascii")
    );

    return new Contract(
      bridgeContract.abi,
      starknetBridgeContractAddress,
      wallet.account
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function getStaticATokenContract(address: bigint): Contract {
  try {
    const staticATokenContract = json.parse(
      fs.readFileSync("./contracts/static_a_token.json").toString("ascii")
    );

    return new Contract(
      staticATokenContract.abi,
      starknetBridgeContractAddress
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}
