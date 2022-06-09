# Smart contract


## Goals

The goal of this smart contract is to increment or decrement a counter. Each address calling the contract must be whitelisted by the backend as it will sign the key using ECDSA and a newly formed private key. The contract will retrieve the public key from the signature and compare it to the one precised during contract's deployment

### Deploy contract

run <Language> yarn 
