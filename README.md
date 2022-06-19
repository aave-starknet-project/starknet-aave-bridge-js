# starknet-aave-bridge.js


The starknet-aave-bridge.js package gives developers access to methods for interacting with the AAVE bridge & staticATokens on Starknet using StarkNet wallets & [Starknet.js](https://github.com/0xs34n/starknet.js).

Install starknet-aave-bridge-js with `npm`

```bash
$ npm install starknet-aave-bridge-js
```
## Sample usage


```javascript
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
```javascript
const contract = getBridgeContract();
```

### withdraw
Withdraws staticATokens from l2 and bridges them back to their corresponding l1 aTokens
 * @param `StarnetWallet` the connected starknet wallet 
 * @param `l2_token` the staticAToken address on Starknet
 * @param `l1_recipient` the l1 recipient address
 * @param  `amount` to withdraw
```javascript
import {withdraw} from "@starknet-aave-bridge-js";
...
const tx= await withdraw(starknet, l2_token, l1_recipient, amount);
```
### bridgeRewards

Allows users to bridge their `rewAave` tokens and receive rewards on l1.
 * @param `StarnetWallet` the connected starknet wallet provided by the get-starknet package
 * @param `l1_recipient` the l1 recipient address
 * @param `amount` to be bridged

```javascript
import {bridgeRewards} from "@starknet-aave-bridge-js";
...
const tx= await bridgeRewards(wallet, l1_recipient, amount);
```

## StaticATokens


### getStaticATokenContract

Returns a staticAToken contract instance

```javascript


 const contract = getStaticATokenContract(aDai.address);
```

### claim rewards (rewAave):
Claims user pending rewards on a given `staticAToken.
 * @param `StarnetWallet` the connected Starknet wallet 
 * @param `l2_token` the staticAToken address on Starknet
 * @param `recipient` of rewards tokens
```javascript
import {claimRewards} from "@starknet-aave-bridge-js";
...

const tx=await claimRewards(starknet, l2_token, recipient);
```

### getStaticATokenData

Gets token totalSupply, last rewards index update & current_rewards_index.
 * @param `l2_token` the staticAToken address on Starknet
 * @param `provider`  ( defaulted to Alpha testnet if not provided)

```javascript
import {getStaticATokenData} from "@starknet-aave-bridge-js";
...
const data=await getStaticATokenData(aDAI.address, provider);// returns totalSupply, last_rewards_index_blocknumber & current_rewards_index
 ```

### getUserInfo
Gets users data related to a specific `staticAToken`

 * @param `l2_token` the staticAToken address on Starknet
 * @param `user` address
 * @param `provider` ( defaulted to Alpha testnet if not provided)

```javascript
import {getUserInfo} from "@starknet-aave-bridge-js";
...
const data=await getUserInfo(aDAI.address, l2_user_address, provider);// returns balance, user's pending rewards & latest claimed rewards index (snapshot)
```

