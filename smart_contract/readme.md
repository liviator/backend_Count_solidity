# Smart contract


## Goals

The goal of this smart contract is to increment or decrement a counter. Each address calling the contract must be whitelisted by the backend as it will sign the key using ECDSA and a newly formed private key. The contract will retrieve the public key from the signature and compare it to the one precised during contract's deployment

## Redeploy smart contract

To redeploy the smart contract, clone the backend repo and use `yarn` then `yarn id:create` it will log two elements, a newly formed private key and an address. You can now use an online ide such as [remix](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js) to deploy the smart contract and enter the newly formed addres in its constructor
