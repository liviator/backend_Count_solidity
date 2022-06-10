import { privateToAddress } from 'ethereumjs-util';
import { ethers } from 'ethers';
import * as crypto from 'crypto';


/**
 * It creates a private key used to sign token which can prove that you are whitelisted on the smart contract  .
 */
async function main() {
    
    const wallet = ethers.Wallet.createRandom()
    const private_key = crypto.randomBytes(32);
    const signer = await ethers.utils.getAddress(privateToAddress(private_key).toString("hex"));
    console.log("signer address", signer)
    console.log("private_key", private_key.toString("hex"));

}



main().catch(console.log)