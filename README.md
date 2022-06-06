# starknet-aave-bridge.js


The starknet-aave-bridge.js package gives developers access to methods for interacting with the AAVE bridge & staticATokens on Starknet.

Install starknet-aave-bridge-js with `npm`

```bash
$ npm install starknet-aave-bridge-js
```


Withdrawing staticATokens on l2:


```javascript
import {getStarknet} from "@argent/get-starknet";
import {withdraw} from "@starknet-aave-bridge-js";

export const handleWithdraw=async (
  l2_token: bigint,
  l1_recipient: string,
  amount: string
): Promise<any> => {

    const starknet=getStarknet();
    await starknet.enable();

    return withdraw(starknet, l2_token, l1_recipient, amount);
  
}
```