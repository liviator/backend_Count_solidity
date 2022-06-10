# backend_Count_solidity

## Instalation

To use this backend, you will need to redeploy the smart contract ([here](https://github.com/liviator/backend_Count_solidity/tree/master/smart_contract) )

Clone this repo and `yarn`, you can now launch the backend with `yarn start`

In order to use this contract you will need to initialize a .env with as PRIVATE_KEY the key you generated earlier during contract's deployment

An online version is deployed on [heroku](https://back-count-liviator.herokuapp.com/)


## Usage

This contract has two open routes: 

### create_token

route : /token/create/:address with address the address you want to whitelist

Effect: Will encrypt the address, sign it and store it as an access token to the smart contract


### get_token

route: /token/get with address as your address

Effect: Will check the database and return a token if your address is whitelisted
