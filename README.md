# starknet-aave-bridge.js


The starknet-aave-bridge.js package gives developers access to methods for interacting with the AAVE bridge & staticATokens on Starknet using StarkNet wallets,  [Starknet.js](https://github.com/0xs34n/starknet.js) & [TypeChain](https://github.com/dethcrypto/TypeChain).



Install starknet-aave-bridge-js with `npm`

```bash
$ npm install starknet-aave-bridge-js
```
## Sample usage


```typescript
import {getStarknet} from "get-starknet";
import {withdraw} from "@starknet-aave-bridge-js";

export const handleWithdraw=async (
  l2_token: string,
  l1_recipient: string,
  amount: string,
  to_underlying_asset: string,
): Promise<any> => {

    const starknet=getStarknet();
    //connect wallet
    await starknet.enable();

    const tx= await withdraw(starknet, l2_token, l1_recipient, amount, to_underlying_asset);
  
  
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
 * @param `Starknet` the window object provided by the installed wallet extension
 * @param `l2_token` the staticAToken address on Starknet
 * @param `l1_recipient` the l1 recipient address
 * @param  `amount` to withdraw
 * @param `to_underlying_asset`  if set to `1` will withdraw underlying asset tokens from pool and transfer them to recipient on l1. If set to `0` will withdraw aTokens to l1 recipient.

```typescript
import {withdraw} from "@starknet-aave-bridge-js";

const starknet=getStarknet();
const tx= await withdraw(starknet, l2_token, l1_recipient, amount, to_underlying_asset);
```
### bridgeRewards

Allows users to bridge their `rewAave` tokens and receive rewards on l1.
 * @param `Starknet` the window object provided by the installed wallet extension
 * @param `l1_recipient` the l1 recipient address
 * @param `amount` to be bridged
 * @return transaction status

```typescript
import {getStarknet} from "get-starknet";
import {bridgeRewards} from "@starknet-aave-bridge-js";

const starknet=getStarknet();
const tx= await bridgeRewards(starknet, l1_recipient, amount);
```

## StaticATokens


### getStaticATokenContract

 * @param contract address
 * @param Starknet provider
 * @return a staticAToken contract instance

```typescript
const contract = getStaticATokenContract(aDai.address);
```

### claim rewards (rewAave):
Claim user pending rewards token (rewAAVE - ERC20 representing Aave reward token on L2) by holding a `staticAToken` on L2
 * @param `StarknetWallet` the connected Starknet wallet 
 * @param `l2_token` the staticAToken address on Starknet
 * @param `recipient` of rewards tokens
 * @return transaction status
  
```typescript
import {claimRewards} from "@starknet-aave-bridge-js";
import {getStarknet} from "get-starknet";

const starknet=getStarknet();
const tx=await claimRewards(starknet, l2_token, recipient);
```

### getStaticATokenData

Gets token totalSupply, last rewards index update & current_rewards_index.
 * @param `l2_token` the staticAToken address on Starknet
 * @param `provider`  Starknet provider
 * @return totalSupply, last_rewards_index_blocknumber & current_rewards_index

```typescript
import {getStaticATokenData} from "@starknet-aave-bridge-js";
import {getStarknet} from "get-starknet";

const starknet=getStarknet();
const data=await getStaticATokenData(aDAI.address, straknet.provider);
 ```

### getUserInfo
Gets user data related to a specific `staticAToken`

 * @param `l2_token` the staticAToken address
 * @param `user` l2 user address
 * @param `provider` Starknet provider
 * @return balance, user's pending rewards & latest claimed rewards index (snapshot)

```typescript
import {getUserInfo} from "@starknet-aave-bridge-js";
import {getStarknet} from "get-starknet";

const starknet=getStarknet();
const data=await getUserInfo(aDAI.address, l2_user_address, provider)
```


