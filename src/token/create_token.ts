import 'dotenv/config'
import * as sqlite3 from 'sqlite3';
import { keccak256, toBuffer, ecsign, bufferToHex, ecrecover, pubToAddress} from 'ethereumjs-util'
import { ethers } from 'ethers'


const db = new sqlite3.Database('./database.sqlite');
db.run("CREATE TABLE IF NOT EXISTS token (address TEXT PRIMARY KEY, token STRING)");

const pk = process.env.PRIVATE_KEY || ""
const Buffer_pk = Buffer.from(pk, 'hex')



/**
 * It takes an address and the express response , and then it inserts the address and a signed
 * token into the database
 * @param {string} address - the address of the new token
 * @param {any} res - express response 
 */

export const create_token = async function main(address:string, res:any) {
    try {
        const new_token_address = ethers.utils.getAddress(address);
        const hashBuffer = await generateHashBuffer(["address"],[new_token_address]);
        const signed_token = await ecsign(hashBuffer, Buffer_pk);
        const hex_token = {
            r:bufferToHex(signed_token.r),
            s:bufferToHex(signed_token.s),
            v:signed_token.v
        };
        db.run("INSERT INTO token VALUES (?,?)",address, JSON.stringify(hex_token), function(err:any,response:any){
            if(err) {
                res.status(400).send({error:"Address already whitelisted"})
                console.log("already whitelisted")
            }
            else {
                res.status(200).send({message:"address is now whitelisted"})
            }
        });
    } catch (e:any) {
        throw Error(e);
    }
}

/**
 * Bufferize then hash any input with its type, here an address (type: address)
 * @param {string[]} types - the type of the input you want to hash
 * @param {any[]} values - its value
 */
async function generateHashBuffer(types:string[], values:any[])  {
    const buffer = await keccak256(toBuffer(ethers.utils.defaultAbiCoder.encode(types,values)));
    return buffer;
}