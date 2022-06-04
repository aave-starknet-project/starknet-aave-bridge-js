import { starknetBridgeContractAddress } from "./addresses";
const fs = require("fs");

import { Contract, json } from "starknet";

export function getBridgeContract(wallet: any): Contract {
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
