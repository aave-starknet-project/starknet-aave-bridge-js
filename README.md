# starknet-aave-bridge.js


The starknet-aave-bridge.js package gives developers access to methods for interacting with the AAVE bridge & staticATokens on Starknet using StarkNet wallets & [Starknet.js](https://github.com/0xs34n/starknet.js).

Install starknet-aave-bridge-js with `npm`

```bash
$ npm install starknet-aave-bridge-js
```
## Sample usage


```typescript
import {getStarknet} from "get-starknet";
import {withdraw} from "@starknet-aave-bridge-js";

export const handleWithdraw=async (
  l2_token: bigint,
  l1_recipient: string,
  amount: string
): Promise<any> => {

    const starknet=getStarknet();
    //connect wallet
    await starknet.enable();

    const tx= await withdraw(starknet, l2_token, l1_recipient, amount);
  
  
}
```

## Starknet Bridge

Returns the bridge contract instance.
 * @param `account` the connected starknet account (optional)
```typescript
const contract = getBridgeContract();
```

### withdraw
Withdraws staticATokens from l2 and bridges them back to their corresponding l1 aTokens
 * @param `StarknetWallet` the connected starknet wallet provided by the get-starknet package
 * @param `l2_token` the staticAToken address on Starknet
 * @param `l1_recipient` the l1 recipient address
 * @param  `amount` to withdraw
```typescript
import {withdraw} from "@starknet-aave-bridge-js";
...
const tx= await withdraw(starknet, l2_token, l1_recipient, amount);
```
### bridgeRewards

Allows users to bridge their `rewAave` tokens and receive rewards on l1.
 * @param `StarknetWallet` 
 * @param `l1_recipient` the l1 recipient address
 * @param `amount` to be bridged

```typescript
import {bridgeRewards} from "@starknet-aave-bridge-js";
...
const tx= await bridgeRewards(wallet, l1_recipient, amount);
```

## StaticATokens


### getStaticATokenContract

Returns a staticAToken contract instance

```typescript


 const contract = getStaticATokenContract(aDai.address);
```

### claim rewards (rewAave):
Claims user pending rewards on a given `staticAToken.
 * @param `StarknetWallet` the connected Starknet wallet 
 * @param `l2_token` the staticAToken address on Starknet
 * @param `recipient` of rewards tokens
```typescript
import {claimRewards} from "@starknet-aave-bridge-js";
...

const tx=await claimRewards(starknet, l2_token, recipient);
```

### getStaticATokenData

Gets token totalSupply, last rewards index update & current_rewards_index.
 * @param `l2_token` the staticAToken address on Starknet
 * @param `provider`  ( defaulted to Alpha testnet if not provided)

```typescript
import {getStaticATokenData} from "@starknet-aave-bridge-js";
...
const data=await getStaticATokenData(aDAI.address, provider);// returns totalSupply, last_rewards_index_blocknumber & current_rewards_index
 ```

### getUserInfo
Gets user data related to a specific `staticAToken`

 * @param `l2_token` the staticAToken address on Starknet
 * @param `user` address
 * @param `provider` ( defaulted to Alpha testnet if not provided)

```typescript
import {getUserInfo} from "@starknet-aave-bridge-js";
...
const data=await getUserInfo(aDAI.address, l2_user_address, provider);// returns balance, user's pending rewards & latest claimed rewards index (snapshot)
```

